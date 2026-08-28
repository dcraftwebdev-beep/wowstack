import React, { useMemo } from "react";
import { MoreHorizontal, ArrowUpRight, Sparkles, Plus, Eye } from "lucide-react";
import s from "../admin.module.css";

/* ---------- tiny inline charts (no library) ---------- */
function BarChart({ data }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className={s.bars}>
      {data.map((d, i) => (
        <div className={s.barCol} key={i}>
          <div className={s.barTrack}>
            <div
              className={`${s.bar} ${d.hi ? s.barHi : ""}`}
              style={{ height: `${Math.max(8, (d.value / max) * 100)}%` }}
            />
          </div>
          <span className={s.barLbl}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function LineChart({ points }) {
  const W = 320, H = 120, P = 8;
  const max = Math.max(1, ...points);
  const step = points.length > 1 ? (W - P * 2) / (points.length - 1) : 0;
  const xy = points.map((v, i) => [P + i * step, H - P - (v / max) * (H - P * 2)]);
  const line = xy.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${xy[xy.length - 1][0].toFixed(1)} ${H} L${xy[0][0].toFixed(1)} ${H} Z`;
  const last = xy[xy.length - 1];
  return (
    <svg className={s.lineSvg} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16181f" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#16181f" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#lg)" />
      <path d={line} fill="none" stroke="#16181f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="4.5" fill="#16181f" />
    </svg>
  );
}

function Donut({ segments }) {
  const total = Math.max(1, segments.reduce((a, b) => a + b.value, 0));
  const R = 42, C = 2 * Math.PI * R;
  let offset = 0;
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={R} fill="none" stroke="#eef0f4" strokeWidth="16" />
      {segments.map((seg, i) => {
        const len = (seg.value / total) * C;
        const el = (
          <circle key={i} cx="60" cy="60" r={R} fill="none" stroke={seg.color} strokeWidth="16"
            strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset}
            transform="rotate(-90 60 60)" strokeLinecap="round" />
        );
        offset += len;
        return el;
      })}
      <text x="60" y="56" textAnchor="middle" fontSize="22" fontWeight="800" fill="#14161d">{total}</text>
      <text x="60" y="74" textAnchor="middle" fontSize="10" fill="#9aa0ab">projects</text>
    </svg>
  );
}

/* ---------- overview ---------- */
export default function Overview({ projects, onNew, onSeed, onEdit }) {
  const stats = useMemo(() => {
    const total = projects.length;
    const published = projects.filter((p) => p.status === "published").length;
    const drafts = projects.filter((p) => p.status === "draft").length;
    const archived = projects.filter((p) => p.status === "archived").length;
    const views = projects.reduce((sum, p) => sum + (p.views || 0), 0);
    return { total, published, drafts, archived, views };
  }, [projects]);

  const featured = useMemo(
    () => projects.find((p) => p.featured && p.status === "published") || projects.find((p) => p.status === "published") || projects[0],
    [projects]
  );

  const bars = useMemo(() => {
    const byCat = {};
    projects.forEach((p) => { const k = p.category || "Other"; byCat[k] = (byCat[k] || 0) + 1; });
    const entries = Object.entries(byCat).slice(0, 6);
    const maxV = Math.max(0, ...entries.map(([, v]) => v));
    return entries.length
      ? entries.map(([label, value]) => ({ label: label.length > 6 ? label.slice(0, 6) : label, value, hi: value === maxV }))
      : ["Mon", "Tue", "Wed", "Thu", "Fri"].map((label, i) => ({ label, value: [3, 5, 4, 8, 6][i], hi: i === 3 }));
  }, [projects]);

  const growth = useMemo(() => {
    const n = projects.length;
    if (n < 2) return [1, 2, 2, 3, 4, 5, 6];
    return Array.from({ length: n }, (_, i) => i + 1);
  }, [projects]);

  const pubPct = stats.total ? Math.round((stats.published / stats.total) * 100) : 0;
  const draftPct = stats.total ? Math.round((stats.drafts / stats.total) * 100) : 0;

  const recent = useMemo(() => projects.slice(0, 4), [projects]);

  return (
    <div className={s.bento}>
      {/* featured project — Pro-Version style */}
      <div className={s.gFeat}>
        <div className={s.feature}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className={s.featureLabel}>Featured project</span>
            <button className={s.miniIcon} onClick={onNew} title="New project"><Plus size={16} /></button>
          </div>
          <div className={s.featureVisual}>
            {featured?.heroImage && <img src={featured.heroImage} alt="" />}
          </div>
          <div className={s.featureSub}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span className={s.featureSubTitle}>{featured?.name || "No projects yet"}</span>
              {featured?.year && <span className={s.chipDays}>{featured.year}</span>}
            </div>
            <div className={s.featureSubText}>{featured?.shortDesc || "Create your first project to feature it here."}</div>
            {featured
              ? <button className={`${s.btn} ${s.btnDark} ${s.btnSm}`} style={{ marginTop: 14 }} onClick={() => onEdit(featured)}>Edit <ArrowUpRight size={14} /></button>
              : <button className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`} style={{ marginTop: 14 }} onClick={onNew}><Plus size={14} /> New project</button>}
          </div>
        </div>
      </div>

      {/* activity bar chart */}
      <div className={`${s.card} ${s.gAct}`}>
        <div className={s.cardHead}>
          <div><div className={s.cardTitle}>Projects by category</div><div className={s.cardHint}>Across your portfolio</div></div>
          <button className={s.miniIcon} type="button"><MoreHorizontal size={16} /></button>
        </div>
        <BarChart data={bars} />
      </div>

      {/* published + views highlight (green Visa-style) */}
      <div className={`${s.greenCard} ${s.gGreen}`}>
        <div className={s.greenTop}>
          <span style={{ fontWeight: 700, color: "#14161d" }}>Live</span>
          <Eye size={17} color="#3f6b4d" />
        </div>
        <div>
          <div className={s.greenBig}>{stats.views.toLocaleString()}</div>
          <div className={s.greenRow}><span>Total case-study views</span></div>
          <div className={s.greenRow} style={{ marginTop: 8 }}><span>{stats.published} published</span><span>{pubPct}%</span></div>
        </div>
      </div>

      {/* completeness progress */}
      <div className={`${s.card} ${s.gPipe}`}>
        <div className={s.cardHead}>
          <div><div className={s.cardTitle}>Pipeline</div><div className={s.cardHint}>Total {stats.total}</div></div>
        </div>
        <div className={s.progressRow}>
          <span className={s.progressKey}>Published</span>
          <div className={s.progressTrack}><div className={s.progressFill} style={{ width: `${Math.max(pubPct, 8)}%` }}>{pubPct}%</div></div>
        </div>
        <div className={s.progressRow}>
          <span className={s.progressKey}>Drafts</span>
          <div className={s.progressTrack}><div className={`${s.progressFill} ${s.progressFillAlt}`} style={{ width: `${Math.max(draftPct, 8)}%` }}>{draftPct}%</div></div>
        </div>
        {stats.total === 0 && (
          <button className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} style={{ marginTop: 6 }} onClick={onSeed}><Sparkles size={14} /> Load samples</button>
        )}
      </div>

      {/* portfolio growth line */}
      <div className={`${s.card} ${s.gGrow}`}>
        <div className={s.cardHead}>
          <div><div className={s.cardTitle}>Portfolio growth</div><div className={s.cardHint}>Cumulative projects</div></div>
          <span className={s.statBig} style={{ fontSize: "1.5rem" }}>{stats.total}</span>
        </div>
        <div className={s.lineWrap}><LineChart points={growth} /></div>
      </div>

      {/* status donut */}
      <div className={`${s.card} ${s.gDonut}`}>
        <div className={s.cardHead}>
          <div><div className={s.cardTitle}>Status breakdown</div><div className={s.cardHint}>All projects</div></div>
          <button className={s.miniIcon} type="button"><ArrowUpRight size={16} /></button>
        </div>
        <div className={s.donutWrap}>
          <Donut segments={[
            { value: stats.published, color: "#4ba36a" },
            { value: stats.drafts, color: "#d8c24a" },
            { value: stats.archived, color: "#c9ccd4" },
          ]} />
          <div className={s.donutLegend}>
            <div className={s.legendItem}><span className={s.legendDot} style={{ background: "#4ba36a" }} /> Published · {stats.published}</div>
            <div className={s.legendItem}><span className={s.legendDot} style={{ background: "#d8c24a" }} /> Drafts · {stats.drafts}</div>
            <div className={s.legendItem}><span className={s.legendDot} style={{ background: "#c9ccd4" }} /> Archived · {stats.archived}</div>
          </div>
        </div>
      </div>

      {/* recent projects — clickable, opens editor */}
      <div className={`${s.card} ${s.gRecent}`}>
        <div className={s.cardHead}>
          <div><div className={s.cardTitle}>Recent projects</div><div className={s.cardHint}>Click to edit</div></div>
          <button className={s.miniIcon} type="button" onClick={onNew} title="New project"><Plus size={16} /></button>
        </div>
        <div className={s.recentList}>
          {recent.length === 0 && <div className={s.cardHint}>No projects yet.</div>}
          {recent.map((p) => (
            <button className={s.recentItem} key={p.id} onClick={() => onEdit(p)}>
              {p.heroImage ? <img className={s.recentThumb} src={p.heroImage} alt="" /> : <span className={s.recentThumb} />}
              <span style={{ minWidth: 0, flex: 1 }}>
                <span className={s.recentName} style={{ display: "block" }}>{p.name || "Untitled"}</span>
                <span className={s.recentMeta}>{p.category || "—"} · {(p.views ?? 0).toLocaleString()} views</span>
              </span>
              <ArrowUpRight size={15} color="#9aa0ab" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
