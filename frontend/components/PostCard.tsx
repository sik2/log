import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
}

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground">{post.date}</span>
        </div>
        <Link href={`/posts/${post.id}`}>
          <h3 className="text-lg font-semibold text-card-foreground hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {post.excerpt}
        </p>
        <Link
          href={`/posts/${post.id}`}
          className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
        >
          더 읽기 →
        </Link>
      </CardContent>
    </Card>
  );
}
