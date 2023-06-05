import { promises as fs } from "fs";
import { Article } from "types";
import estimateReadTime from "reading-time";
import Children from "react-children-utilities";

const importAll = (r): Promise<Article[]> =>
  Promise.all(
    r.keys().map(async (fileName) => {
      const module = r(fileName);
      const slug = fileName.substr(2).replace(/\/page\.mdx$/, "");

      return {
        slug,
        metadata: module?.metadata,
        component: module?.default,
        readingTime: await estimateReadingTime(module),
      } satisfies Article;
    })
  );

export const getAllArticles = async (): Promise<Article[]> =>
  importAll(
    //@ts-ignore
    require.context("../app/articles/", true, /^\.\/[^\/]+\/page\.mdx$/)
  );

const estimateReadingTime = async (module): Promise<string> => {
  const file = Children.onlyText(module.default).split(`fileName: "`).pop().split(`"`).shift();
  const rawFile = (await fs.readFile(file)).toString();

  return estimateReadTime(rawFile).text;
};

export const getArticleBySlug = async (slug: string): Promise<Article> => {
  const module = require(`../app/articles/${slug}/page.mdx`);

  return {
    slug,
    component: module?.default,
    metadata: module?.metadata,
    readingTime: await estimateReadingTime(module),
  };
};
