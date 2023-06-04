import { promises as fs } from "fs";
import path from "path";
import AllArticles from "./components/AllArticles";
import { Article, ArticleMetadata } from "./types";

const getArticles = async (): Promise<Article[]> => {
  const dir = path.resolve(process.cwd(), "articles");
  const filenames = await fs.readdir(dir);
  const promises = await Promise.allSettled(
    filenames.map((name) =>
      Promise.all(
        ["article.mdx", "metadata.json"].map((file) =>
          fs.readFile(path.join(dir, name, file), "utf8")
        )
      )
    )
  );

  const articles: Article[] = promises.reduce((acc, cur) => {
    if (cur.status === "rejected") return acc;
    const [article, rawMetadata] = cur.value as [string, string];

    let metadata: ArticleMetadata;
    try {
      metadata = JSON.parse(rawMetadata);
    } catch {
      return acc;
    }

    return [...acc, { article, metadata }];
  }, []);

  return articles;
};

export default async function Page() {
  const articles = await getArticles();

  return <AllArticles articles={articles} />;
}
