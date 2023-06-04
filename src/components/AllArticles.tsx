import React from "react";
import { getAllArticles } from "utils";
import Link from "next/link";

export default async function AllArticles() {
  const articles = await getAllArticles();

  return articles.map((article) => {
    const title = String(article.title);
    return (
      <Link key={title} href={"/articles/" + article.slug}>
        <h2>{title}</h2>
        <p>Description: {article.description}</p>
        <p>Date: {article.date}</p>
        <p>Reading time: {article.readingTime}</p>
        <p>Preview: {article.preview}</p>
      </Link>
    );
  });
}
