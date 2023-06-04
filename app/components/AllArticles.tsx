import React from "react";
import { Article } from "../types";
import Link from "next/link";

export default function AllArticles({ articles }: { articles: Article[] }) {
  return articles.map((article) => (
    <Link
      key={article.metadata.title}
      href={"/article/" + article.metadata.name}
    >
      <h2>{article.metadata.title}</h2>
    </Link>
  ));
}
