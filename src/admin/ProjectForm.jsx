import React, { useRef, useState } from "react";
import { Plus, X, Upload, Trash2, GripVertical } from "lucide-react";
import { saveProject } from "../data/projectsStore";
import { listCategories, addCategory } from "../data/categoriesStore";
import { slugify } from "./lib/helpers";
import { uploadImage } from "./lib/upload";
import s from "./admin.module.css";

const parseList = (v) => v.split(",").map((x) => x.trim()).filter(Boolean);
const parseLines = (v) => v.split("\n").map((x) => x.trim()).filter(Boolean);

export default function ProjectForm({ initial, isEdit = false, onCancel, onSaved }) {
  const [f, setF] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.slug));

  // Raw text buffers for list fields — edited as free text so spaces/commas
  // type normally, then parsed into arrays only on save. (Transforming on every
  // keystroke was eating spaces/commas.)
  const [rawServices, setRawServices] = useState((initial.services || []).join(", "));
  const [rawTech, setRawTech] = useState((initial.technologies || []).join(", "));
  const [rawDeliv, setRawDeliv] = useState((initial.deliverables || []).join(", "));
  const [rawGallery, setRawGallery] = useState((initial.gallery || []).join("\n"));

  // category dropdown + inline add
  const [cats, setCats] = useState(listCategories());
  const [addingCat, setAddingCat] = useState(false);
  const [newCat, setNewCat] = useState("");

  const heroRef = useRef(null);
  const previewRef = useRef(null);
  const galleryRef = useRef(null);

  const set = (k, v) => setF((prev) => ({ ...prev, [k]: v }));
  const setName = (v) => setF((prev) => ({ ...prev, name: v, slug: slugTouched ? prev.slug : slugify(v) }));

  const confirmAddCat = () => {
    const name = newCat.trim();
    if (!name) { setAddingCat(false); return; }
    setCats(addCategory(name));
    set("category", name);
    setNewCat(""); setAddingCat(false);
  };

  const setMetric = (i, key, v) =>
    setF((prev) => { const m = [...prev.metrics]; m[i] = { ...m[i], [key]: v }; return { ...prev, metrics: m }; });
  const addMetric = () => setF((prev) => ({ ...prev, metrics: [...prev.metrics, { value: "", label: "" }] }));
  const removeMetric = (i) => setF((prev) => ({ ...prev, metrics: prev.metrics.filter((_, x) => x !== i) }));

  // ── image uploads ──
  const [uploading, setUploading] = useState("");
  const doUpload = async (file) => {
    try { return await uploadImage(file); }
    catch (er) { setErr("Upload failed: " + er.message); return null; }
  };
  const onUploadSingle = (key) => async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(key); setErr("");
    const url = await doUpload(file);
    if (url) set(key, url);
    setUploading(""); e.target.value = "";
  };
  const onUploadGallery = async (e) => {
    const files = [...(e.target.files || [])];
    if (!files.length) return;
    setUploading("gallery"); setErr("");
    for (const file of files) {
      const url = await doUpload(file);
      if (url) setRawGallery((prev) => (prev ? prev + "\n" + url : url));
    }
    setUploading(""); e.target.value = "";
  };
  const removeGalleryImage = (url) =>
    setRawGallery((prev) => parseLines(prev).filter((u) => u !== url).join("\n"));

  // drag-and-drop reorder for gallery thumbnails
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);
  const onDrop = (to) => {
    const from = dragIdx;
    setDragIdx(null); setOverIdx(null);
    if (from == null || from === to) return;
    const arr = parseLines(rawGallery);
    const [moved] = arr.splice(from, 1);
    arr.splice(to, 0, moved);
    setRawGallery(arr.join("\n"));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!f.name || !f.slug) { setErr("Name and slug are required."); return; }
    setSaving(true); setErr("");
    try {
      await saveProject({
        ...f,
        services: parseList(rawServices),
        technologies: parseList(rawTech),
        deliverables: parseList(rawDeliv),
        gallery: parseLines(rawGallery),
        metrics: f.metrics.filter((m) => m.value || m.label),
      });
      onSaved();
    } catch (er) { setErr(er.message || "Save failed."); setSaving(false); }
  };

  const galleryImages = parseLines(rawGallery);

  return (
    <form className={s.form} onSubmit={submit}>
      <button type="button" className={s.crumb} onClick={onCancel}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        ← Back to projects
      </button>
      <h1 className={s.pageTitle} style={{ marginBottom: 22 }}>{isEdit ? "Edit project" : "New project"}</h1>

      {/* basic */}
      <div className={s.formGroup}>
        <h3>Basic information</h3>
        <div className={s.grid2}>
          <div className={s.field}><label>Project name *</label><input className={s.input} value={f.name} onChange={(e) => setName(e.target.value)} required /></div>
          <div className={s.field}><label>Slug (URL) *</label><input className={s.input} value={f.slug} onChange={(e) => { setSlugTouched(true); set("slug", slugify(e.target.value)); }} required /><span className={s.hint}>/work/{f.slug || "…"}</span></div>
          <div className={s.field}><label>Client</label><input className={s.input} value={f.client} onChange={(e) => set("client", e.target.value)} /></div>
          <div className={s.field}>
            <label>Category</label>
            {addingCat ? (
              <div className={s.selectRow}>
                <input className={s.input} autoFocus value={newCat} placeholder="New category name"
                  onChange={(e) => setNewCat(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); confirmAddCat(); } }} />
                <button type="button" className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`} onClick={confirmAddCat}>Add</button>
                <button type="button" className={s.linkBtn} onClick={() => { setAddingCat(false); setNewCat(""); }}>Cancel</button>
              </div>
            ) : (
              <div className={s.selectRow}>
                <select className={s.select} value={f.category || ""} onChange={(e) => set("category", e.target.value)}>
                  <option value="">Select a category…</option>
                  {f.category && !cats.includes(f.category) && <option value={f.category}>{f.category}</option>}
                  {cats.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <button type="button" className={s.linkBtn} onClick={() => setAddingCat(true)}>+ New</button>
              </div>
            )}
          </div>
          <div className={s.field}><label>Industry</label><input className={s.input} value={f.industry} onChange={(e) => set("industry", e.target.value)} /></div>
          <div className={s.field}><label>Year</label><input className={s.input} value={f.year} onChange={(e) => set("year", e.target.value)} /></div>
          <div className={s.field}><label>Project URL</label><input className={s.input} value={f.url} onChange={(e) => set("url", e.target.value)} placeholder="https://…" /></div>
          <div className={s.field}><label>Accent colour</label><input className={s.input} type="color" value={f.accent} onChange={(e) => set("accent", e.target.value)} style={{ height: 44, padding: 4 }} /></div>
        </div>
        <div className={s.field}><label>Short description</label><textarea className={s.textarea} value={f.shortDesc} onChange={(e) => set("shortDesc", e.target.value)} /></div>
        <div className={s.field}><label>Positioning line (case-study hero)</label><textarea className={s.textarea} value={f.positioning} onChange={(e) => set("positioning", e.target.value)} /></div>
      </div>

      {/* media — two separate images */}
      <div className={s.formGroup}>
        <h3>Project media</h3>

        <div className={s.grid2}>
          {/* homepage preview image */}
          <div className={s.field}>
            <label>Homepage preview image</label>
            <span className={s.hint}>Shown on the homepage “Selected Work” card.</span>
            <div className={s.uploader} style={{ marginTop: 8 }}>
              {f.previewImage && <img className={s.thumbPreview} src={f.previewImage} alt="" />}
              <input className={s.input} value={f.previewImage || ""} onChange={(e) => set("previewImage", e.target.value)} placeholder="https://…" />
              <input ref={previewRef} type="file" accept="image/*" hidden onChange={onUploadSingle("previewImage")} />
              <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={() => previewRef.current?.click()} disabled={uploading === "previewImage"}>
                <Upload size={15} /> {uploading === "previewImage" ? "Uploading…" : "Upload"}
              </button>
            </div>
          </div>

          {/* case-study hero image */}
          <div className={s.field}>
            <label>Case-study hero image</label>
            <span className={s.hint}>Big image at the top of the case-study page.</span>
            <div className={s.uploader} style={{ marginTop: 8 }}>
              {f.heroImage && <img className={s.thumbPreview} src={f.heroImage} alt="" />}
              <input className={s.input} value={f.heroImage || ""} onChange={(e) => set("heroImage", e.target.value)} placeholder="https://…" />
              <input ref={heroRef} type="file" accept="image/*" hidden onChange={onUploadSingle("heroImage")} />
              <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={() => heroRef.current?.click()} disabled={uploading === "heroImage"}>
                <Upload size={15} /> {uploading === "heroImage" ? "Uploading…" : "Upload"}
              </button>
            </div>
          </div>
        </div>

        {/* gallery with upload */}
        <div className={s.field} style={{ marginTop: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <label style={{ margin: 0 }}>Case-study gallery / screenshots</label>
            <input ref={galleryRef} type="file" accept="image/*" multiple hidden onChange={onUploadGallery} />
            <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => galleryRef.current?.click()} disabled={uploading === "gallery"}>
              <Upload size={14} /> {uploading === "gallery" ? "Uploading…" : "Upload images"}
            </button>
          </div>

          {galleryImages.length > 0 && (
            <>
              <span className={s.hint} style={{ marginTop: 12, display: "block" }}>Drag images to reorder how they appear on the case-study page.</span>
              <div className={s.galleryGrid}>
                {galleryImages.map((url, i) => (
                  <div
                    className={`${s.galleryThumb} ${dragIdx === i ? s.dragging : ""} ${overIdx === i && dragIdx !== i ? s.dragOver : ""}`}
                    key={url}
                    draggable
                    onDragStart={() => setDragIdx(i)}
                    onDragEnter={() => setOverIdx(i)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => onDrop(i)}
                    onDragEnd={() => { setDragIdx(null); setOverIdx(null); }}
                  >
                    <img src={url} alt="" draggable={false} />
                    <span className={s.galleryOrder}>{i + 1}</span>
                    <span className={s.galleryHandle}><GripVertical size={14} /></span>
                    <button type="button" className={s.galleryRemove} onClick={() => removeGalleryImage(url)} title="Remove"><Trash2 size={13} /></button>
                  </div>
                ))}
              </div>
            </>
          )}

          <textarea className={s.textarea} value={rawGallery} onChange={(e) => setRawGallery(e.target.value)} placeholder={"Upload above, or paste image URLs — one per line\nhttps://…\nhttps://…"} style={{ marginTop: 10 }} />
        </div>
      </div>

      {/* case study content */}
      <div className={s.formGroup}>
        <h3>Case study content</h3>
        <div className={s.field}><label>Challenge</label><textarea className={s.textarea} value={f.challenge} onChange={(e) => set("challenge", e.target.value)} /></div>
        <div className={s.field}><label>Approach</label><textarea className={s.textarea} value={f.approach} onChange={(e) => set("approach", e.target.value)} /></div>
        <div className={s.field}><label>Solution</label><textarea className={s.textarea} value={f.solution} onChange={(e) => set("solution", e.target.value)} /></div>
        <div className={s.grid2}>
          <div className={s.field}><label>Services (comma separated)</label><input className={s.input} value={rawServices} onChange={(e) => setRawServices(e.target.value)} placeholder="Product Design, Web Development" /></div>
          <div className={s.field}><label>Technologies (comma separated)</label><input className={s.input} value={rawTech} onChange={(e) => setRawTech(e.target.value)} placeholder="React, Vite, Supabase" /></div>
          <div className={s.field}><label>Deliverables (comma separated)</label><input className={s.input} value={rawDeliv} onChange={(e) => setRawDeliv(e.target.value)} placeholder="Design system, Booking module" /></div>
          <div className={s.field}><label>Timeline</label><input className={s.input} value={f.timeline} onChange={(e) => set("timeline", e.target.value)} placeholder="e.g. 6 weeks" /></div>
        </div>
      </div>

      {/* metrics */}
      <div className={s.formGroup}>
        <h3>Results / metrics</h3>
        {f.metrics.map((m, i) => (
          <div className={s.metricRow} key={i}>
            <input className={s.input} value={m.value} onChange={(e) => setMetric(i, "value", e.target.value)} placeholder="+42%" />
            <input className={s.input} value={m.label} onChange={(e) => setMetric(i, "label", e.target.value)} placeholder="Conversion rate" />
            <button type="button" className={`${s.iconBtn} ${s.iconDanger}`} onClick={() => removeMetric(i)}><X size={15} /></button>
          </div>
        ))}
        <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={addMetric}><Plus size={14} /> Add metric</button>
      </div>

      {/* publishing */}
      <div className={s.formGroup}>
        <h3>Publishing</h3>
        <div className={s.grid2}>
          <div className={s.field}>
            <label>Status</label>
            <select className={s.select} value={f.status} onChange={(e) => set("status", e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div className={s.field}>
            <label>Feature on homepage</label>
            <label style={{ display: "flex", alignItems: "center", gap: 10, color: "#4b5563", fontWeight: 500, cursor: "pointer", marginTop: 6 }}>
              <input type="checkbox" checked={f.featured} onChange={(e) => set("featured", e.target.checked)} /> Show in homepage “Selected Work”
            </label>
          </div>
        </div>
      </div>

      <div className={s.formFoot}>
        {err && <span className={s.authErr}>{err}</span>}
        {!err && <span className={s.saveNote}>{f.status === "published" ? "Will appear on the site immediately." : "Saved as a draft — not visible on the site."}</span>}
        <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={onCancel}>Cancel</button>
        <button className={`${s.btn} ${s.btnPrimary}`} disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Update project" : "Create project"}
        </button>
      </div>
    </form>
  );
}
