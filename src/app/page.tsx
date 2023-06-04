import { Metadata } from "next";
import AllArticles from "components/AllArticles";

export default async function Page() {
  return (
    <>
      <h1>All Articles:</h1>
      <AllArticles />
    </>
  );
}
