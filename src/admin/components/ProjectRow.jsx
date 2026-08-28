import React from "react";
import { Pencil, Eye, Trash2, Star } from "lucide-react";
import s from "../admin.module.css";

export default function ProjectRow({ p, onEdit, onToggle, onDelete, onFeature }) {
  const badge =
    p.status === "published" ? s.badgePublished : p.status === "archived" ? s.badgeArchived : s.badgeDraft;

  return (
    <div className={s.row}>
      <div className={s.projCell}>
        {p.heroImage ? <img className={s.projThumb} src={p.heroImage} alt="" /> : <span className={s.projThumb} />}
        <div style={{ minWidth: 0 }}>
          <div className={s.projName}>{p.name || "Untitled"}</div>
          <div className={s.projMeta}>{p.client} · {p.year} · <Eye size={12} style={{ verticalAlign: "-2px" }} /> {(p.views ?? 0).toLocaleString()} views</div>
        </div>
      </div>

      <div className={s.cellMuted}>{p.category || "—"}</div>
      <div><span className={`${s.badge} ${badge}`}>{p.status}</span></div>

      <div className={s.rowActions}>
        {p.status === "published" && (
          <a className={s.iconBtn} href={`/work/${p.slug}`} target="_blank" rel="noreferrer" title="Preview">
            <Eye size={15} />
          </a>
        )}
        <button className={s.iconBtn} onClick={onFeature} title={p.featured ? "Featured on homepage — click to unfeature" : "Feature on homepage"}
          style={p.featured ? { color: "#b45309", borderColor: "#f6d98a", background: "#fdefd4" } : undefined}>
          <Star size={15} fill={p.featured ? "#f59e0b" : "none"} />
        </button>
        <button className={s.iconBtn} onClick={onEdit} title="Edit"><Pencil size={15} /></button>
        <button className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={onToggle}>
          {p.status === "published" ? "Unpublish" : "Publish"}
        </button>
        <button className={`${s.iconBtn} ${s.iconDanger}`} onClick={onDelete} title="Delete"><Trash2 size={15} /></button>
      </div>
    </div>
  );
}
