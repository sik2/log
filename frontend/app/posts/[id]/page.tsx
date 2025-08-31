"use client";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

// API 응답 데이터 타입 정의
interface Post {
  id: number;
  createdDate: string;
  modifiedDate: string;
  title: string;
  content: string;
}

interface PostPageProps {
  params: { id: string };
}

export default function PostPage({ params }: PostPageProps) {
  const { id } = params;
  const [post, setPost] = useState<Post | null>(null);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 특정 포스트 데이터 가져오기
        const postResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/posts/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!postResponse.ok) {
          if (postResponse.status === 404) {
            setError(true);
            return;
          }
          throw new Error(`HTTP error! status: ${postResponse.status}`);
        }

        const postData: Post = await postResponse.json();
        setPost(postData);

        // 모든 포스트 목록 가져오기 (이전/다음 글 네비게이션용)
        const allPostsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/posts`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (allPostsResponse.ok) {
          const allPostsData: Post[] = await allPostsResponse.json();
          setAllPosts(allPostsData);
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (["new", "write", "edit", "update"].includes(id)) {
      setError(true);
      return;
    }

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded mb-4"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    notFound();
  }

  // 이전/다음 글 찾기
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
