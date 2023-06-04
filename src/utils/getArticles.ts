import { ArticleMetadata } from "types";

function importAll(r) {
  return r.keys().map((fileName) => ({
    slug: fileName.substr(2).replace(/\/page\.mdx$/, ""),
    module: r(fileName),
  }));
}

function dateSortDesc(a, b) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export const getAllArticles = async (): Promise<ArticleMetadata[]> => {
  //@ts-ignore
  return importAll(require.context("../app/articles/", true, /^\.\/[^\/]+\/page\.mdx$/))
    .filter((p) => p.module.metadata.private !== true)
    .sort((a, b) => dateSortDesc(a.module.metadata.date, b.module.metadata.date));
};

export const getArticleBySlug = (slug: string): ArticleMetadata => ({
  slug,
  module: require(`../app/articles/${slug}/page.mdx`),
});
