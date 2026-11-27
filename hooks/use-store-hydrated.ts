"use client";

import { useSyncExternalStore } from "react";

type PersistApi = {
  hasHydrated: () => boolean;
  onFinishHydration: (listener: () => void) => () => void;
};

/** True once a persisted zustand store has loaded from storage. */
export function useStoreHydrated(store: { persist: PersistApi }): boolean {
  return useSyncExternalStore(
    store.persist.onFinishHydration,
    store.persist.hasHydrated,
    () => false,
  );
}
