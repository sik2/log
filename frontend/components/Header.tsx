import Link from "next/link";

export function BlogHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-primary-foreground text-xs font-mono font-bold">
              &lt;/&gt;
            </div>
            <span className="text-xl font-semibold text-foreground">LOG</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              홈
            </Link>
            <Link
              href="/posts"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              글 목록
            </Link>
            <Link
              href="/posts/new"
              className="px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              글쓰기
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
