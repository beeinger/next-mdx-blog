import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Article, ArticleMetadata } from "types";
import { Metadata } from "next";

export const generateMetadata = ({ params }): Promise<Metadata> => ArticleMetadata.fromSlug(params.slug);

export default async function Page({ params }) {
  const article = await Article.fromSlug(params.slug);

  return (
    <article className="m-8 prose lg:prose-xl">
      <MDXRemote source={article.mdx} />
    </article>
  );
}
