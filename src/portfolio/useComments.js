import { useCallback, useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";

// Same Firestore "comments" collection the previous design used. Firebase is
// imported lazily, only once the contact section has been reached, so it
// stays out of the main bundle and never blocks first paint.
export function useComments(enabled) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;
    let unsubscribe = () => {};
    let cancelled = false;

    (async () => {
      try {
        const [{ initializeApp, getApps, getApp }, firestore] = await Promise.all([
          import("firebase/app"),
          import("firebase/firestore"),
        ]);
        if (cancelled) return;
        const { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } = firestore;

        const config = {
          apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
          authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
          projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
          storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
          appId: import.meta.env.VITE_FIREBASE_APP_ID,
        };
        if (!config.apiKey) {
          setLoading(false);
          setError("Notes are unavailable right now.");
          return;
        }

        const app = getApps().length ? getApp() : initializeApp(config);
        const db = getFirestore(app);
        api.current = { db, collection, addDoc, serverTimestamp };

        const q = query(collection(db, "comments"), orderBy("createdAt", "asc"));
        unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            if (cancelled) return;
            setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
            setError(null);
          },
          () => {
            if (cancelled) return;
            setLoading(false);
            setError("Could not load notes. Please try again later.");
          }
        );
      } catch {
        if (!cancelled) {
          setLoading(false);
          setError("Notes are unavailable right now.");
        }
      }
    })();

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [enabled]);

  const addComment = useCallback(async ({ name, message }) => {
    const a = api.current;
    if (!a) throw new Error("Notes are still loading. Try again in a moment.");
    await a.addDoc(a.collection(a.db, "comments"), {
      name: DOMPurify.sanitize(name),
      message: DOMPurify.sanitize(message),
      createdAt: a.serverTimestamp(),
    });
  }, []);

  return { comments, loading, error, addComment };
}
