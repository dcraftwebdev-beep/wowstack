import React, { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { listCategories, addCategory, removeCategory } from "../../data/categoriesStore";
import s from "../admin.module.css";

/** Manage the category options offered in the project form's dropdown. */
export default function CategoriesManager({ projects = [] }) {
  const [cats, setCats] = useState(listCategories());
  const [name, setName] = useState("");

  const counts = useMemo(() => {
    const m = {};
    projects.forEach((p) => { if (p.category) m[p.category] = (m[p.category] || 0) + 1; });
    return m;
  }, [projects]);

  const add = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setCats(addCategory(name));
    setName("");
  };
  const remove = (c) => setCats(removeCategory(c));

  return (
    <div className={s.catManager}>
      <div className={s.catCard}>
        <div className={s.formGroup} style={{ background: "none", boxShadow: "none", padding: 0, margin: 0 }}>
          <h3>Add a category</h3>
        </div>
        <form className={s.catAdd} onSubmit={add}>
          <input className={s.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Design System" />
          <button className={`${s.btn} ${s.btnPrimary}`} type="submit"><Plus size={16} /> Add</button>
        </form>

        <div className={s.catList}>
          {cats.map((c) => (
            <div className={s.catItem} key={c}>
              <span>
                <span className={s.catName}>{c}</span>
                <span className={s.catCount}>{counts[c] ? `${counts[c]} project${counts[c] > 1 ? "s" : ""}` : "unused"}</span>
              </span>
              <button
                className={`${s.iconBtn} ${s.iconDanger}`}
                title={counts[c] ? "In use — remove anyway" : "Remove"}
                onClick={() => remove(c)}
                type="button"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
          {cats.length === 0 && <div className={s.empty}>No categories yet — add one above.</div>}
        </div>
      </div>
    </div>
  );
}
