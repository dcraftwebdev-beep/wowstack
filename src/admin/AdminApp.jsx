import React, { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import SetupNotice from "./SetupNotice";
import SignIn from "./SignIn";
import DashboardShell from "./DashboardShell";
import s from "./admin.module.css";

/**
 * Admin entry point (route: /dashboard).
 *   no Supabase keys  → <SetupNotice />
 *   not signed in     → <SignIn />        (login page)
 *   signed in         → <DashboardShell /> (projects + editor)
 */
export default function AdminApp() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => mounted && setSession(data.session ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) => setSession(sess ?? null));
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, []);

  if (!isSupabaseConfigured) return <SetupNotice />;
  if (session === undefined) return <div className={s.center}>Loading…</div>;
  if (!session) return <SignIn />;
  return <DashboardShell email={session.user?.email} />;
}
