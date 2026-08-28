import React from "react";
import { LayoutDashboard, FolderKanban, Plus, Bell, ExternalLink, LogOut } from "lucide-react";
import { supabase } from "../../lib/supabase";
import s from "../admin.module.css";

/** Top bar: logo · pill nav · (spacer) · notifications / view-site / sign-out. */
export default function TopNav({ view, onView, onNew, email, drafts = 0, onNotify }) {
  const tab = (id, icon, label) => (
    <button
      className={`${s.pill} ${view === id ? s.pillActive : ""}`}
      onClick={() => onView(id)}
      type="button"
    >
      {icon} {label}
    </button>
  );

  return (
    <header className={s.topbar}>
      <div className={s.logo}>W</div>

      <nav className={s.pillNav}>
        {tab("overview", <LayoutDashboard size={16} />, "Dashboard")}
        {tab("projects", <FolderKanban size={16} />, "Projects")}
        <button className={s.pill} onClick={onNew} type="button"><Plus size={16} /> New</button>
      </nav>

      <div className={s.topSpacer} />

      <div className={s.topRight}>
        <button className={s.iconCircle} title={drafts ? `${drafts} draft${drafts > 1 ? "s" : ""} pending` : "No pending drafts"} onClick={onNotify} type="button">
          <Bell size={17} />
          {drafts > 0 && <span className={s.notifDot}>{drafts}</span>}
        </button>
        <a className={s.iconCircle} href="/our-works" target="_blank" rel="noreferrer" title="Open live site"><ExternalLink size={17} /></a>
        <button className={s.iconCircle} title={email || "Sign out"} onClick={() => supabase.auth.signOut()} type="button">
          <LogOut size={17} />
        </button>
      </div>
    </header>
  );
}
