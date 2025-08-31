import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

interface Post {
  id: number;
  createdDate: string;
  modifiedDate: string;
  title: string;
  content: string;
}

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  // content를 excerpt로 변환 (100자 제한)
  const excerpt =
    post.content.length > 100
      ? post.content.substring(0, 100) + "..."
      : post.content;

  // 생성일을 한국어 형식으로 변환
  const createdDate = new Date(post.createdDate);
  const formattedCreatedDate = createdDate.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 수정일을 한국어 형식으로 변환
  const modifiedDate = new Date(post.modifiedDate);
  const formattedModifiedDate = modifiedDate.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 생성일과 수정일이 같은지 확인
  const isSameDate = createdDate.getTime() === modifiedDate.getTime();

  return (
    <Card className="hover:shadow-md transition-shadow flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-1 mb-2">
          <span className="text-xs text-muted-foreground">
            작성일: {formattedCreatedDate}
          </span>
          {!isSameDate && (
            <span className="text-xs text-muted-foreground">
              수정일: {formattedModifiedDate}
            </span>
          )}
        </div>
        <Link href={`/posts/${post.id}`}>
          <h3 className="text-lg font-semibold text-card-foreground hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent className="pt-0 flex-1 flex flex-col">
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
          {excerpt}
        </p>
        <div className="flex justify-end">
          <Link
            href={`/posts/${post.id}`}
            className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          >
            더 읽기 →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
