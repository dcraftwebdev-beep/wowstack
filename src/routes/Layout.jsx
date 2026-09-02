import { useEffect, useRef } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Header from "../Components/Sections/Header"
import Footer from "../Components/Sections/footer"

gsap.registerPlugin(ScrollTrigger)

// Smooth "buttery" scrolling (Lenis) wired into GSAP ScrollTrigger so all
// pinned / scrubbed sections stay in sync.
function useLenis() {
  const lenisRef = useRef(null)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    })
    lenisRef.current = lenis

    lenis.on("scroll", ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])
  return lenisRef
}

// Split every section heading (main h1/h2) into per-word spans and reveal them
// with a blur-to-sharp sweep when the heading scrolls into view. Runs per route.
function useHeadingReveal() {
  const location = useLocation()
  useEffect(() => {
    let io
    const t = setTimeout(() => {
      const headings = [...document.querySelectorAll("main h1, main h2")]
        .filter((h) => !h.hasAttribute("data-noreveal") && !h.dataset.rw)
      if (!headings.length) return

      headings.forEach((h) => {
        h.dataset.rw = "1"
        let idx = 0
        const wrap = (node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            if (!node.textContent.trim()) return
            const frag = document.createDocumentFragment()
            node.textContent.split(/(\s+)/).forEach((part) => {
              if (!part) return
              if (/^\s+$/.test(part)) {
                frag.appendChild(document.createTextNode(part))
              } else {
                const sp = document.createElement("span")
                sp.className = "rw"
                sp.style.setProperty("--i", idx++)
                sp.textContent = part
                frag.appendChild(sp)
              }
            })
            node.replaceWith(frag)
          } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== "BR") {
            ;[...node.childNodes].forEach(wrap)
          }
        }
        ;[...h.childNodes].forEach(wrap)
      })

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduce || !("IntersectionObserver" in window)) {
        headings.forEach((h) => h.classList.add("rwIn"))
        return
      }
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) { e.target.classList.add("rwIn"); io.unobserve(e.target) }
          }),
        { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
      )
      headings.forEach((h) => io.observe(h))
    }, 90)
    return () => { clearTimeout(t); io && io.disconnect() }
  }, [location.pathname])
}

// Gentle scroll-parallax for any element marked with data-parallax="<amount>"
// (e.g. 0.15–0.4). Scrubbed to the scroll, re-created per route, and skipped
// for reduced-motion. Never applied to pinned sections, so no conflicts.
function useParallax() {
  const location = useLocation()
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let ctx
    const t = setTimeout(() => {
      ctx = gsap.context(() => {
        gsap.utils.toArray("[data-parallax]").forEach((el) => {
          const amt = parseFloat(el.dataset.parallax) || 0.2
          const shift = 90 * amt // px of travel each way — subtle, no layout gaps
          gsap.fromTo(
            el,
            { y: shift },
            {
              y: -shift,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          )
        })
      })
      // no global ScrollTrigger.refresh() here — it can disturb pinned
      // sections (ScrollPanels). The parallax triggers self-register.
    }, 200)
    return () => { clearTimeout(t); ctx && ctx.revert() }
  }, [location.pathname])
}

// small white dot that trails the mouse across the whole site
function CursorDot() {
  const dotRef = useRef(null)
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return
    const dot = dotRef.current
    if (!dot) return
    let x = window.innerWidth / 2, y = window.innerHeight / 2
    let cx = x, cy = y, raf = 0
    const onMove = (e) => { x = e.clientX; y = e.clientY }
    const loop = () => {
      cx += (x - cx) * 0.2
      cy += (y - cy) * 0.2
      dot.style.transform = `translate(${cx.toFixed(1)}px, ${cy.toFixed(1)}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener("mousemove", onMove)
    raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf) }
  }, [])
  return <div className="cursorDot" ref={dotRef} aria-hidden="true" />
}

export default function Layout() {
  const glowRef = useRef(null)
  const lenisRef = useLenis()
  useHeadingReveal()
  useParallax()

  // jump to top on every route change — Lenis + native, before and after paint
  const { pathname } = useLocation()
  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual"
  }, [])
  useEffect(() => {
    const toTop = () => {
      lenisRef.current?.scrollTo(0, { immediate: true, force: true })
      window.scrollTo(0, 0)
      if (document.scrollingElement) document.scrollingElement.scrollTop = 0
    }
    toTop()
    const id = requestAnimationFrame(() => { toTop(); ScrollTrigger.refresh() })
    return () => cancelAnimationFrame(id)
  }, [pathname, lenisRef])

  // hide the bottom blur bar once the footer is on screen
  useEffect(() => {
    const glow = glowRef.current
    const footer = document.querySelector("footer")
    if (!glow || !footer) return
    let raf = 0
    const update = () => {
      const r = footer.getBoundingClientRect()
      const footerVisible = r.top < (window.innerHeight || 0) - 40
      glow.classList.toggle("hide", footerVisible)
    }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Render the page content here */}
      </main>
      <Footer />
      <div className="screenGlow" aria-hidden="true" ref={glowRef} />
      <CursorDot />
    </>
  )
}
