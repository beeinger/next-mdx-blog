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
  console.log(0, await fs.readdir(path.resolve(process.cwd())));
  console.log(1, await fs.readdir(path.resolve(process.cwd(), ".next")));
  console.log(2, await fs.readdir(path.resolve(process.cwd(), ".next", "server")));
  console.log(3, await fs.readdir(path.resolve(process.cwd(), ".next", "server", "app")));
  console.log(4, await fs.readdir(path.resolve(process.cwd(), ".next", "server", "app", "articles")));
  console.log(
    5,
    await fs.readdir(
      path.resolve(
        process.cwd(),
        ".next",
        "server",
        "app",
        "articles",
        "what-are-storage-proofs-and-how-can-they-improve-oracles"
      )
    )
  );

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
