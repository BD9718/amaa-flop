import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/actualites")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/$locale/news", params: { locale: params.locale }, replace: true });
  },
});
