import React from "react";
import { Home, FolderKanban, FileText, Settings, LifeBuoy } from "lucide-react";
import s from "../admin.module.css";

/** Thin vertical icon rail with hover tooltips (matches the reference's left rail). */
export default function IconRail({ view, onView }) {
  const navBtn = (id, icon, tip) => (
    <button
      className={`${s.railBtn} ${view === id ? s.railActive : ""}`}
      onClick={() => onView(id)}
      data-tip={tip}
      type="button"
    >
      {icon}
    </button>
  );

  return (
    <nav className={s.rail}>
      {navBtn("overview", <Home size={18} />, "Dashboard")}
      {navBtn("projects", <FolderKanban size={18} />, "Projects")}
      <a className={s.railBtn} href="/our-works" target="_blank" rel="noreferrer" data-tip="View case studies on site">
        <FileText size={18} />
      </a>
      {navBtn("categories", <Settings size={18} />, "Categories & settings")}
      <div className={s.railFoot}>
        <a className={s.railBtn} href="/contact" target="_blank" rel="noreferrer" data-tip="Help & support">
          <LifeBuoy size={18} />
        </a>
      </div>
    </nav>
  );
}
