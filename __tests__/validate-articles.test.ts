import { promises as fs } from "fs";
import path from "path";
import { getAllArticles, getArticleMetadata } from "../src/utils";

import { expect, test } from "vitest";

test("example article", async () => {
  const slug = "example_working";
  const article = getArticleMetadata(slug);
  expect(article).resolves.toHaveProperty("slug", slug);
  expect(article).resolves.toHaveProperty("readingTime");
});

test("all articles", async () => {
  const dir = path.resolve(process.cwd(), "src", "app", "articles");
  const filenames = (await fs.readdir(dir)).filter((filename) => filename !== "layout.tsx");
  console.log("\nFound", filenames.length, "articles\n");

  const allArticles = await getAllArticles();

  console.log("\nLoaded", allArticles.length, "articles\n");
});
