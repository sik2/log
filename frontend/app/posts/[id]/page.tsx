import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

// API 응답 데이터 타입 정의
interface Post {
  id: number;
  createdDate: string;
  modifiedDate: string;
  title: string;
  content: string;
}

// API에서 특정 포스트 데이터를 가져오는 함수
async function fetchPost(id: string): Promise<Post | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/posts/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Next.js에서 캐시를 비활성화 (개발 환경에서)
        cache: "no-store",
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const post: Post = await response.json();
    return post;
  } catch (error) {
    console.error("포스트 데이터를 가져오는 중 오류 발생:", error);
    return null;
  }
}

// 모든 포스트 목록을 가져오는 함수 (이전/다음 글 네비게이션용)
async function fetchAllPosts(): Promise<Post[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/posts`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts: Post[] = await response.json();
    return posts;
  } catch (error) {
    console.error("포스트 목록을 가져오는 중 오류 발생:", error);
    return [];
  }
}

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  if (["new", "write", "edit", "update"].includes(id)) {
    notFound();
  }

  const post = await fetchPost(id);

  if (!post) {
    notFound();
  }

  // 이전/다음 글 찾기
  const allPosts = await fetchAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.id.toString() === id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <article className="max-w-3xl mx-auto">
          {/* Post Header */}
          <header className="mb-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <Link
                href="/posts"
                className="hover:text-foreground transition-colors"
              >
                ← 목록으로
              </Link>
              <Link href={`/posts/${id}/edit`}>
                <Button variant="outline" size="sm">
                  수정하기
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-semibold text-foreground mb-3">
              {post.title}
            </h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <time dateTime={post.createdDate}>
                {formatDate(post.createdDate)}
              </time>
            </div>
          </header>

          {/* Post Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="whitespace-pre-line text-foreground leading-relaxed">
              {post.content.split("\n").map((line, index) => {
                if (line.startsWith("# ")) {
                  return (
                    <h1
                      key={index}
                      className="text-2xl font-semibold text-foreground mt-6 mb-3"
                    >
                      {line.replace("# ", "")}
                    </h1>
                  );
                }
                if (line.startsWith("## ")) {
                  return (
                    <h2
                      key={index}
                      className="text-xl font-semibold text-foreground mt-5 mb-2"
                    >
                      {line.replace("## ", "")}
                    </h2>
                  );
                }
                if (line.startsWith("### ")) {
                  return (
                    <h3
                      key={index}
                      className="text-lg font-semibold text-foreground mt-4 mb-2"
                    >
                      {line.replace("### ", "")}
                    </h3>
                  );
                }
                if (line.startsWith("- ")) {
                  return (
                    <li key={index} className="text-muted-foreground ml-4 mb-1">
                      {line.replace("- ", "")}
                    </li>
                  );
                }
                if (line.trim() === "") {
                  return <br key={index} />;
                }
                return (
                  <p
                    key={index}
                    className="text-muted-foreground mb-3 leading-relaxed"
                  >
                    {line}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Post Navigation */}
          <nav className="mt-8 pt-6 border-t">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                {prevPost && (
                  <Link
                    href={`/posts/${prevPost.id}`}
                    className="group flex flex-col items-start p-3 rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-sm text-muted-foreground mb-1">
                      이전 글
                    </span>
                    <span className="text-foreground group-hover:text-primary transition-colors font-medium">
                      {prevPost.title}
                    </span>
                  </Link>
                )}
              </div>
              <div className="flex-1 text-right">
                {nextPost && (
                  <Link
                    href={`/posts/${nextPost.id}`}
                    className="group flex flex-col items-end p-3 rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-sm text-muted-foreground mb-1">
                      다음 글
                    </span>
                    <span className="text-foreground group-hover:text-primary transition-colors font-medium">
                      {nextPost.title}
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </article>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const response = await fetch("http://localhost:8080/api/v1/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const posts: Post[] = await response.json();
    return posts
      .filter(
        (post) =>
          !["new", "write", "edit", "update"].includes(post.id.toString())
      )
      .map((post) => ({
        id: post.id.toString(),
      }));
  } catch (error) {
    console.error("Static params 생성 중 오류 발생:", error);
    return [];
  }
}
