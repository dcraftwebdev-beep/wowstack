import React, { useState } from "react";
import Seo from "../Components/Seo";
import { supabase } from "../lib/supabase";
import s from "./admin.module.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setErr(error.message);
    setBusy(false);
  };

  return (
    <div className={s.center}>
      <Seo title="Dashboard — Sign in" description="Admin" path="/dashboard" noindex />
      <form className={s.authCard} onSubmit={submit}>
        <div className={s.authBrand}><span className={s.logo} style={{ width: 34, height: 34, fontSize: 16 }}>W</span> Wow Stack</div>
        <h1 className={s.authTitle}>Admin sign in</h1>
        <p className={s.authSub}>Sign in to manage projects &amp; case studies.</p>

        <div className={s.field}>
          <label>Email</label>
          <input className={s.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className={s.field}>
          <label>Password</label>
          <input className={s.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        {err && <p className={s.authErr}>{err}</p>}
        <button
          className={`${s.btn} ${s.btnPrimary}`}
          style={{ width: "100%", marginTop: 12, justifyContent: "center" }}
          disabled={busy}
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
