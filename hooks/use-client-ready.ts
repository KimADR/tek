"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

export function useClientReady() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
