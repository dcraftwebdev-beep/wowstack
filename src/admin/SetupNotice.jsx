import React from "react";
import Seo from "../Components/Seo";
import s from "./admin.module.css";

export default function SetupNotice() {
  return (
    <div className={s.center}>
      <Seo title="Dashboard" description="Admin" path="/dashboard" noindex />
      <div className={s.authCard}>
        <h1 className={s.authTitle}>Connect Supabase</h1>
        <p className={s.authSub}>
          The dashboard needs your Supabase keys. Create a free project at
          supabase.com, then add a <b>.env</b> file at the project root:
        </p>
        <div className={s.codeBlock}>
          VITE_SUPABASE_URL=https://xxxx.supabase.co{"\n"}
          VITE_SUPABASE_ANON_KEY=eyJhbGc...
        </div>
        <p className={s.authSub}>
          Run <b>supabase/schema.sql</b> in the Supabase SQL editor, add an admin
          user under Authentication, then restart the dev server.
        </p>
      </div>
    </div>
  );
}
