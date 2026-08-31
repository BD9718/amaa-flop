import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "get_project",
  title: "Détail d'un projet",
  description: "Récupère le détail complet d'un projet de l'AMAA à partir de son slug.",
  inputSchema: { slug: z.string().trim().min(1).describe("Slug du projet, ex. « vaccination-vidangeurs ».") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Non authentifié" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data) return { content: [{ type: "text", text: `Projet introuvable : ${slug}` }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { project: data },
    };
  },
});
