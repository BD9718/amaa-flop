import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/actualites")({
  beforeLoad: () => {
    throw redirect({ to: "/$locale/news", params: { locale: "fr" }, replace: true });
  },
});
