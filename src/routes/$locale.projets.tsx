import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/projets")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/$locale/projects", params: { locale: params.locale }, replace: true });
  },
});
