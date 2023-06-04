import { Metadata } from "next";

export type ArticleMetadata = Metadata & { slug: string; readingTime: string; preview: string };
