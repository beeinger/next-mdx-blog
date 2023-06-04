import { Metadata } from "next";

export interface ArticleMetadata extends Metadata {
  /**
   * Name of the article that is the same as the folder name
   *
   * e.g. article in articles/hello/article.mdx would have the name "hello"
   */
  name: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export interface Article {
  article: string;
  metadata: ArticleMetadata;
}
