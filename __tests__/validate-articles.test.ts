import { Article, ArticleMetadata } from "../src/types";
import { promises as fs } from "fs";
import path from "path";

import { expect, test } from "vitest";

test("example article", async () => {
  const slug = "example_working";
  const article = Article.fromSlug(slug);
  expect(article).resolves.toBeInstanceOf(Article);
  expect(article).resolves.toHaveProperty("metadata");
  expect(article).resolves.toHaveProperty("mdx");
  expect((await article).metadata).toHaveProperty("slug", slug);
  expect((await article).metadata).toHaveProperty("title");
});

test("all articles", async () => {
  const dir = path.resolve(process.cwd(), "articles");
  const filenames = await fs.readdir(dir);
  const articles = await Promise.all(
    filenames.map((slug) =>
      Article.fromSlug(slug).catch((e) => ({
        slug,
        error: e,
      }))
    )
  );

  console.log("\nFound", filenames.length, "articles, loading...\n");
  let loadedArticles = 0;
  for (const article of articles) {
    if ("error" in article)
      console.log("\x1b[31mERROR\x1b[0m    Could not load article \x1b[36m", article.slug, "\x1b[0m");
    else {
      loadedArticles++;
      console.log("\x1b[32mSUCCESS\x1b[0m  Loaded article \x1b[36m", article.metadata.slug, "\x1b[0m");
    }
  }
  console.log("\nLoaded", loadedArticles, "articles\n");
});
