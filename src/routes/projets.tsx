import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/projets")({
  beforeLoad: () => {
    throw redirect({ to: "/$locale/projects", params: { locale: "fr" }, replace: true });
  },
});
