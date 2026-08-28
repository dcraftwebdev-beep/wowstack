import React, { useEffect, useMemo, useState } from "react";
import { Plus, Sparkles, Search, SlidersHorizontal, Calendar, ChevronRight, Check } from "lucide-react";
import Seo from "../Components/Seo";
import { listAll, saveProject, deleteProject, seedIfEmpty } from "../data/projectsStore";
import { emptyProject } from "./lib/helpers";
import TopNav from "./components/TopNav";
import IconRail from "./components/IconRail";
import Overview from "./components/Overview";
import ProjectRow from "./components/ProjectRow";
import CategoriesManager from "./components/CategoriesManager";
import ProjectForm from "./ProjectForm";
import s from "./admin.module.css";

const STATUSES = ["all", "published", "draft", "archived"];
const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function DashboardShell({ email }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("overview"); // overview | projects | categories | edit
  const [editing, setEditing] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // functional header controls
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try { setProjects(await listAll()); } catch { setProjects([]); }
    setLoading(false);
  };
  useEffect(() => { refresh(); }, []);

  const drafts = useMemo(() => projects.filter((p) => p.status === "draft").length, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (!q) return true;
      return [p.name, p.client, p.category, p.industry].filter(Boolean).join(" ").toLowerCase().includes(q);
    });
  }, [projects, query, status]);

  const openNew = () => { setEditing(emptyProject()); setIsEdit(false); setView("edit"); };
  const openEdit = (p) => { setEditing({ ...p }); setIsEdit(true); setView("edit"); };
  const onSaved = async () => { await refresh(); setView("projects"); setEditing(null); };
  const doSeed = async () => { await seedIfEmpty(); refresh(); };

  const navView = (v) => { setEditing(null); setFilterOpen(false); setView(v); };
  const gotoDrafts = () => { setStatus("draft"); setQuery(""); navView("projects"); };

  const titleFor = { overview: "Client Dashboard", projects: "Projects", categories: "Categories" };
  const crumbFor = { overview: "Dashboard", projects: "Projects", categories: "Settings" };

  return (
    <div className={s.app}>
      <Seo title="Dashboard — Wow Stack" description="Admin" path="/dashboard" noindex />

      <TopNav view={view} onView={navView} onNew={openNew} email={email} drafts={drafts} onNotify={gotoDrafts} />

      <div className={s.body}>
        <IconRail view={view} onView={navView} />

        <main className={s.main}>
          {view === "edit" ? (
            <ProjectForm initial={editing} isEdit={isEdit} onCancel={() => setView("projects")} onSaved={onSaved} />
          ) : (
            <>
              <div className={s.crumb}>Home <ChevronRight size={13} /> {crumbFor[view]}</div>
              <div className={s.headRow}>
                <h1 className={s.pageTitle}>{titleFor[view]}</h1>
                <div className={s.topActions}>
                  {view === "projects" && (
                    <>
                      <div className={s.searchBox}>
                        <Search size={16} color="#9aa0ab" />
                        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects…" />
                      </div>
                      <div className={s.filterWrap}>
                        <button className={`${s.pill2} ${status !== "all" ? s.filterActive : ""}`} onClick={() => setFilterOpen((o) => !o)} type="button">
                          <SlidersHorizontal size={15} /> {status === "all" ? "Filter" : status}
                        </button>
                        {filterOpen && (
                          <div className={s.filterMenu}>
                            {STATUSES.map((st) => (
                              <button key={st} className={status === st ? s.filterActive : ""} onClick={() => { setStatus(st); setFilterOpen(false); }} type="button">
                                {st} {status === st && <Check size={14} />}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  <button className={s.pill2} type="button" title="Today"><Calendar size={15} /> {today}</button>
                  {projects.length === 0 && (
                    <button className={`${s.btn} ${s.btnGhost}`} onClick={doSeed}><Sparkles size={15} /> Load samples</button>
                  )}
                  <button className={`${s.btn} ${s.btnPrimary}`} onClick={openNew}><Plus size={16} /> New project</button>
                </div>
              </div>

              {view === "overview" && (
                loading ? <div className={s.empty}>Loading…</div>
                  : <Overview projects={projects} onNew={openNew} onSeed={doSeed} onEdit={openEdit} />
              )}

              {view === "categories" && <CategoriesManager projects={projects} />}

              {view === "projects" && (
                <div className={s.tableCard}>
                  <div className={s.tableHead}>
                    <span>Project</span><span>Category</span><span>Status</span><span style={{ textAlign: "right" }}>Actions</span>
                  </div>
                  {loading ? (
                    <div className={s.empty}>Loading…</div>
                  ) : filtered.length === 0 ? (
                    <div className={s.empty}>
                      {projects.length === 0 ? "No projects yet. Click “New project” or “Load samples”." : "No projects match your search / filter."}
                    </div>
                  ) : (
                    filtered.map((p) => (
                      <ProjectRow key={p.id} p={p} onEdit={() => openEdit(p)}
                        onFeature={async () => { await saveProject({ ...p, featured: !p.featured }); refresh(); }}
                        onToggle={async () => { await saveProject({ ...p, status: p.status === "published" ? "draft" : "published" }); refresh(); }}
                        onDelete={async () => { if (window.confirm(`Delete “${p.name}”?`)) { await deleteProject(p.id); refresh(); } }} />
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
