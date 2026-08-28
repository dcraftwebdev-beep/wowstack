import { useCallback, useEffect, useState } from "react";
import { listAll, listPublished, getBySlug } from "./projectsStore";

function useAsync(fetcher, deps) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetcher();
      setProjects(data || []);
      setError(null);
    } catch (e) {
      setError(e);
      setProjects([]);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => { refresh(); }, [refresh]);
  return { projects, loading, error, refresh };
}

export function usePublishedProjects() {
  return useAsync(listPublished, []);
}

export function useAllProjects() {
  return useAsync(listAll, []);
}

export function useProject(slug) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    setLoading(true);
    getBySlug(slug)
      .then((p) => { if (alive) setProject(p); })
      .catch(() => { if (alive) setProject(null); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [slug]);
  return { project, loading };
}
