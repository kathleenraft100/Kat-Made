/**
 * Robust IndexedDB + Server storage helper for persisting Kat-Made pattern uploads.
 * Uses IndexedDB to store high-res images (up to hundreds of MBs) without localStorage quota limits,
 * and synchronizes with the server storage endpoint.
 */

const DB_NAME = "KatMadeHypnoGarden";
const STORE_NAME = "patterns";
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function savePatternLocally(specimenId: string, dataUrl: string, fileName = ""): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const record = {
        id: specimenId,
        dataUrl,
        fileName,
        savedAt: new Date().toISOString(),
      };
      const req = store.put(record);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("[PatternStorage] IndexedDB write failed, falling back to localStorage", err);
    try {
      localStorage.setItem(`kat_pattern_${specimenId}`, dataUrl);
    } catch (e) {
      console.error("[PatternStorage] LocalStorage quota exceeded", e);
    }
  }
}

export async function getPatternLocally(specimenId: string): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const req = store.get(specimenId);
      req.onsuccess = () => {
        if (req.result && req.result.dataUrl) {
          resolve(req.result.dataUrl);
        } else {
          // Fallback to localStorage
          resolve(localStorage.getItem(`kat_pattern_${specimenId}`));
        }
      };
      req.onerror = () => {
        resolve(localStorage.getItem(`kat_pattern_${specimenId}`));
      };
    });
  } catch (err) {
    return localStorage.getItem(`kat_pattern_${specimenId}`);
  }
}

export async function getAllStoredPatterns(): Promise<Record<string, string>> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        const result: Record<string, string> = {};
        if (Array.isArray(req.result)) {
          for (const item of req.result) {
            if (item && item.id && item.dataUrl) {
              result[item.id] = item.dataUrl;
            }
          }
        }
        resolve(result);
      };
      req.onerror = () => resolve({});
    });
  } catch (err) {
    return {};
  }
}

/**
 * Fetches all saved pattern URLs from the server disk storage
 */
export async function fetchServerPatterns(): Promise<Record<string, string>> {
  try {
    const res = await fetch("/api/patterns");
    if (!res.ok) return {};
    const data = await res.json();
    return data.patterns || {};
  } catch (err) {
    return {};
  }
}

/**
 * Attempts to push the pattern to the server disk storage and returns the public url
 */
export async function syncPatternToServer(specimenId: string, dataUrl: string): Promise<string | null> {
  try {
    const res = await fetch("/api/save-pattern", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ specimenId, dataUrl }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.url || null;
  } catch (err) {
    console.log("[PatternStorage] Server sync note (local fallback active)");
    return null;
  }
}
