import * as t from "io-ts";
import { Metadata } from "next";

import { promises as fs } from "fs";
import path from "path";
import { isLeft } from "fp-ts/lib/Either";

/** metadata.json schema definition */
const ArticleMetadataValidator = t.intersection([
  t.type({
    title: t.string,
  }),
  t.partial({
    tags: t.array(t.string),
    description: t.string,
    date: t.string,
  }),
]);

/** Raw metadata before decoding */
type ArticleMetadataRaw = t.TypeOf<typeof ArticleMetadataValidator> & Metadata;

export class ArticleMetadata {
  title: string;
  tags?: string[];
  description?: string;
  date?: Date;

  constructor(public slug: string, metadata: ArticleMetadataRaw) {
    Object.assign(this, metadata);
    this.date = new Date(metadata.date);
  }

  static async fromSlug(slug: string): Promise<ArticleMetadata> {
    const dir = path.resolve(process.cwd(), "articles");
    const rawMetadata = await fs.readFile(path.join(dir, slug, "metadata.json"), "utf8");
    const validationResult = ArticleMetadataValidator.decode(JSON.parse(rawMetadata));

    if (isLeft(validationResult)) throw new Error(`Invalid metadata for article ${slug}: ${validationResult.left}`);

    return new ArticleMetadata(slug, validationResult.right);
  }

  static async all(): Promise<ArticleMetadata[]> {
    const dir = path.resolve(process.cwd(), "articles");
    const filenames = await fs.readdir(dir);
    const promises = await Promise.allSettled(filenames.map((slug) => ArticleMetadata.fromSlug(slug)));

    const articles: ArticleMetadata[] = promises.reduce((acc, cur) => {
      if (cur.status === "rejected") return acc;
      return [...acc, cur.value];
    }, []);

    return articles;
  }
}

export class Article {
  mdx: string;
  metadata: ArticleMetadata;

  constructor(mdx: string, metadata: ArticleMetadata) {
    this.mdx = mdx;
    this.metadata = metadata;
  }

  static async fromSlug(slug: string): Promise<Article> {
    const dir = path.resolve(process.cwd(), "articles");
    const [mdx, metadata] = await Promise.all([
      fs.readFile(path.join(dir, slug, "article.mdx"), "utf8"),
      ArticleMetadata.fromSlug(slug),
    ]);

    return new Article(mdx, metadata);
  }
}
