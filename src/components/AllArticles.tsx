import React from "react";
import { getAllArticles } from "utils/getArticles";
import Link from "next/link";

export default async function AllArticles() {
  const articles = await getAllArticles();

  return articles.map((article) => {
    const metadata = article.module.metadata;
    const title = String(metadata.title);

    return (
      <Link key={title} href={"/articles/" + article.slug}>
        <h2>{title}</h2>
        <p>Description: {metadata.description}</p>
        <p>Date: {metadata.date}</p>
        <p>Reading time: {metadata.readingTime}</p>
        <p>Preview: {metadata.preview}</p>
      </Link>
    );
  });
}
