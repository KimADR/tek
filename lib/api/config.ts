export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api",
  endpoints: {
    dashboard: "/dashboard",
    formations: "/formations",
    sessions: "/sessions",
    participants: "/participants",
    attendances: "/attendances",
    certificates: "/certificates",
  },
};

export type ApiConfig = typeof apiConfig;
