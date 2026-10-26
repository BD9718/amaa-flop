// Photographs supplied by AMAA, served from Lovable's image hosting (works on
// amaa-mr.com). Old "/images/..." paths saved in the database are translated
// to these addresses by resolveImage().
import beachWaste from "@/assets/beach-waste.jpg.asset.json";
import cleanWater from "@/assets/clean-water-hands.jpg.asset.json";
import oasis from "@/assets/oasis.jpg.asset.json";
import sludgeTreatment from "@/assets/traitement-boues-vidange.jpg.asset.json";
import vidangeTruck from "@/assets/vidange-truck.jpg.asset.json";

export const media = {
  vidangeTruck: vidangeTruck.url,
  beachWaste: beachWaste.url,
  cleanWater: cleanWater.url,
  oasis: oasis.url,
  sludgeTreatment: sludgeTreatment.url,
} as const;

const legacyPaths: Record<string, string> = {
  "/images/vidange-truck.jpg": media.vidangeTruck,
  "/images/beach-waste.jpg": media.beachWaste,
  "/images/clean-water-hands.jpg": media.cleanWater,
  "/images/oasis.jpg": media.oasis,
  "/images/traitement-boues-vidange.jpg": media.sludgeTreatment,
};

/** Map legacy "/images/x.jpg" paths to their hosted address; pass anything else through. */
export function resolveImage(src: string | null | undefined): string {
  if (!src) return "";
  return legacyPaths[src] ?? src;
}

export const siteOrigin = "https://www.amaa-mr.com";
