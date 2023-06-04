import path from "path";
import fs from "node:fs/promises";
import estimateReadingTime from "reading-time";
import { ArticleMetadata } from "types";

const dir = path.resolve(process.cwd(), "src", "app", "articles");

export const getAllArticles = async (): Promise<ArticleMetadata[]> => {
  const filenames = (await fs.readdir(dir)).filter((filename) => filename !== "layout.tsx");
  const promises = await Promise.allSettled(filenames.map((slug) => getArticleMetadata(slug)));

  const articles: ArticleMetadata[] = promises.reduce((acc, cur, idx) => {
    if (cur.status === "rejected") {
      console.log("Error loading article", filenames[idx]);
      return acc;
    }
    console.log("Loaded article", filenames[idx]);
    return [...acc, cur.value];
  }, []);

  return articles;
};

export const getArticleMetadata = async (slug: string) => {
  const rawMdx = (await fs.readFile(path.join(dir, slug, "page.mdx"))).toString();

  //? Get metadata from MDX file
  const metadata = eval("({" + rawMdx.split("export const metadata = {")[1].split("}")[0] + "})");

  //? Get reading time from MDX file
  const readingTime = estimateReadingTime(rawMdx).text;

  //? Get preview from MDX file
  let preview = "";
  if (rawMdx.includes("<!-- preview -->")) preview = rawMdx.split("<!-- preview -->")[1].split("<!-- /preview -->")[0];

  return { ...metadata, slug, readingTime, preview };
};
