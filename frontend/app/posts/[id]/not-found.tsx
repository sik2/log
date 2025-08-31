import { BlogHeader } from "@/components/Header";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            글을 찾을 수 없습니다
          </h2>
          <p className="text-muted-foreground mb-8">
            요청하신 글이 존재하지 않거나 삭제되었을 수 있습니다.
          </p>
          <Link
            href="/posts"
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            목록으로
          </Link>
        </div>
      </main>
    </div>
  );
}
