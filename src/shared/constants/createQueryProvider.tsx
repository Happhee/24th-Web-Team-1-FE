import { ReactNode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import queryClient from "@api/query-client";

export function createQueryProviderWrapper() {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
