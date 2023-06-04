export default function Layout({ children }: { children: React.ReactNode }) {
  return <article className="m-8 prose lg:prose-xl">{children}</article>;
}
