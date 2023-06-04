import { headers } from "next/headers";
import Image from "next/image";
import { getArticleBySlug } from "utils/getArticles";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const slug = headers().get("x-next-article-slug") as string;
  const article = await getArticleBySlug(slug);
  const metadata = article.module.metadata;
  const image = metadata.image;

  return (
    <article className="m-8 prose lg:prose-xl mx-auto">
      {image && (
        <div className="flex justify-center max-h-[60vh]">
          <Image
            src={image}
            alt={String(metadata.title)}
            width={1200}
            height={630}
            className="rounded-md object-scale-down"
          />
        </div>
      )}
      <div className="mx-auto">
        <span className="mr-2">{metadata.date}</span>·<span className="ml-2">{metadata.readingTime} read</span>
      </div>
      {children}
    </article>
  );
}
