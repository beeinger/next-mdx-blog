import React from "react";
import { ArticleMetadata } from "types";
import Link from "next/link";

export default async function AllArticles() {
  const articles = await ArticleMetadata.all();

  return articles.map((article) => (
    <Link key={article.title} href={"/article/" + article.slug}>
      <h2>{article.title}</h2>
    </Link>
  ));
}
