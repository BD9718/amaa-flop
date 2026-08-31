import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { GalleryItem, NewsArticle, Project } from "@/content/data";
import type { KeyFigure, Partner } from "@/lib/public.server";
import { getNewsArticleServer, getProjectServer, listGalleryServer, listKeyFiguresServer, listNewsServer, listPartnersServer, listProjectsServer } from "@/lib/public.server";

export type { KeyFigure, Partner } from "@/lib/public.server";

export const listProjects = createServerFn({ method: "GET" }).handler(async (): Promise<Project[]> => listProjectsServer());

export const getProject = createServerFn({ method: "GET" })
  .validator((slug) => z.string().parse(slug))
  .handler(async ({ data: slug }): Promise<Project | null> => getProjectServer(slug));

export const listNews = createServerFn({ method: "GET" }).handler(async (): Promise<NewsArticle[]> => listNewsServer());

export const getNewsArticle = createServerFn({ method: "GET" })
  .validator((slug) => z.string().parse(slug))
  .handler(async ({ data: slug }): Promise<NewsArticle | null> => getNewsArticleServer(slug));

export const listGallery = createServerFn({ method: "GET" }).handler(async (): Promise<GalleryItem[]> => listGalleryServer());

export const listPartners = createServerFn({ method: "GET" }).handler(async (): Promise<Partner[]> => listPartnersServer());

export const listKeyFigures = createServerFn({ method: "GET" }).handler(async (): Promise<KeyFigure[]> => listKeyFiguresServer());
