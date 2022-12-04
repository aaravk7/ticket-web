import { useState, useEffect, useContext } from "react";
import { AppDispatchContext } from "../context/AuthContext";

const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const appAction = useContext(AppDispatchContext);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const doFetch = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, { ...options, credentials: "include" });
        const json = await res.json();
        if (res.status >= 400) {
          if (json.error === "No token, authorization denied") {
            appAction({ type: "LOGOUT", payload: null });
          }
          setError(
            new Error(
              json.error
                ? json.error
                : json.errors
                ? json.errors[0]
                : "UNKNOWN_ERROR"
            )
          );
        } else {
          if (!signal.aborted) {
            setData(json);
          }
        }
      } catch (err: any) {
        if (!signal.aborted) {
          setError(err);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };
    doFetch();
    return () => {
      abortController.abort();
    };
  }, []);
  return { data, error, loading };
};
export default useFetch;
