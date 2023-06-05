import path from "path";
import { promises as fs } from "fs";
import { Article } from "types";
import estimateReadTime from "reading-time";

const importAll = (r): Promise<Article[]> =>
  Promise.all(
    r.keys().map(async (fileName) => {
      const module = r(fileName);
      const slug = fileName.substr(2).replace(/\/page\.mdx$/, "");

      return {
        slug,
        metadata: module?.metadata,
        component: module?.default,
        readingTime: await estimateReadingTime(slug),
      } satisfies Article;
    })
  );

export const getAllArticles = async (): Promise<Article[]> =>
  importAll(
    //@ts-ignore
    require.context("../app/articles/", true, /^\.\/[^\/]+\/page\.mdx$/)
  );

const estimateReadingTime = async (slug: string): Promise<string> => {
  const file = path.join(path.resolve(process.cwd(), "src"), "app", "articles", slug, "page.mdx");
  const rawFile = (await fs.readFile(file)).toString();

  return estimateReadTime(rawFile).text;
};

export const getArticleBySlug = async (slug: string): Promise<Article> => {
  const module = require(`../app/articles/${slug}/page.mdx`);

  return {
    slug,
    component: module?.default,
    metadata: module?.metadata,
    readingTime: await estimateReadingTime(slug),
  };
};
