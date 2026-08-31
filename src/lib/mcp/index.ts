import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listProjectsTool from "./tools/list-projects";
import getProjectTool from "./tools/get-project";
import listNewsTool from "./tools/list-news";
import listPartnersTool from "./tools/list-partners";
import listContactMessagesTool from "./tools/list-contact-messages";

const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "amaa-foundation-hub",
  title: "AMAA Foundation Hub",
  version: "0.1.0",
  instructions:
    "Outils du site institutionnel de l'AMAA (Association Mauritanienne pour l'Assainissement) : consulter les projets, les actualités, les partenaires et, pour les administrateurs, les messages de contact.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listProjectsTool, getProjectTool, listNewsTool, listPartnersTool, listContactMessagesTool],
});
