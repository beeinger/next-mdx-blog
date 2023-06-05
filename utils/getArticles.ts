import { Article } from "types/article";

const importAll = (r): Promise<Article[]> =>
  Promise.all(
    r.keys().map(async (fileName) => {
      const module = r(fileName);
      const slug = fileName.substr(2).replace(/\/page\.mdx$/, "");

      return {
        slug,
        metadata: module?.metadata,
        component: module?.default,
        readingTime: module?.metadata_readingTime,
      } satisfies Article;
    })
  );

export const getAllArticles = async (): Promise<Article[]> =>
  importAll(
    //@ts-ignore
    require.context("../app/articles/", true, /^\.\/[^\/]+\/page\.mdx$/)
  );

export const getArticleBySlug = async (slug: string): Promise<Article> => {
  const module = require(`../app/articles/${slug}/page.mdx`);

  return {
    slug,
    component: module?.default,
    metadata: module?.metadata,
    readingTime: module?.metadata_readingTime,
  };
};
