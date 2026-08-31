import { queryOptions } from "@tanstack/react-query";
import {
  getNewsArticle,
  getProject,
  listGallery,
  listKeyFigures,
  listNews,
  listPartners,
  listProjects,
} from "./public.functions";

export const projectsQuery = () =>
  queryOptions({ queryKey: ["public", "projects"], queryFn: () => listProjects(), staleTime: 60_000 });

export const projectQuery = (slug: string) =>
  queryOptions({ queryKey: ["public", "projects", slug], queryFn: () => getProject({ data: slug }), staleTime: 60_000 });

export const newsQuery = () =>
  queryOptions({ queryKey: ["public", "news"], queryFn: () => listNews(), staleTime: 60_000 });

export const newsArticleQuery = (slug: string) =>
  queryOptions({ queryKey: ["public", "news", slug], queryFn: () => getNewsArticle({ data: slug }), staleTime: 60_000 });

export const galleryQuery = () =>
  queryOptions({ queryKey: ["public", "gallery"], queryFn: () => listGallery(), staleTime: 60_000 });

export const partnersQuery = () =>
  queryOptions({ queryKey: ["public", "partners"], queryFn: () => listPartners(), staleTime: 60_000 });

export const keyFiguresQuery = () =>
  queryOptions({ queryKey: ["public", "key-figures"], queryFn: () => listKeyFigures(), staleTime: 60_000 });
