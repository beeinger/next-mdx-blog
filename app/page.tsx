import AllArticles from "components/AllArticles";

export default async function Page() {
  return (
    <div className="m-4 sm:m-8">
      <h1 className="mb-20 text-center text-4xl font-bold">All Articles:</h1>
      <AllArticles />
    </div>
  );
}
