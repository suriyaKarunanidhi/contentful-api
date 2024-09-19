import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <header className="flex justify-between items-center py-6">
        <h1 className="text-4xl font-bold">My Blogs</h1>
        <Link href="/blogpage">BLOG</Link>
      </header>
    </div>
  );
}
