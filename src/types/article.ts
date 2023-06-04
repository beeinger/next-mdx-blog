import { Metadata } from "next";

export type ArticleMetadata = {
  slug: string;
  module: {
    metadata: Metadata & {
      slug: string;
      readingTime: string;
      preview: string;
      date?: string;
      image?: string;
    };
  };
};
