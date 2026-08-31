import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_contact_messages",
  title: "Lister les messages de contact",
  description:
    "Liste les messages reçus via le formulaire de contact. Réservé aux administrateurs de l'AMAA (contrôlé côté base).",
  inputSchema: {
    limit: z.number().int().min(1).max(100).default(20).describe("Nombre maximum de messages."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Non authentifié" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("id,created_at,name,email,subject,message,is_read")
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data?.length) {
      return {
        content: [{ type: "text", text: "Aucun message accessible (accès réservé aux administrateurs)." }],
        structuredContent: { messages: [] },
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { messages: data },
    };
  },
});
