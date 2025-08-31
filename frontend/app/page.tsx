"use client";

import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { useEffect, useState } from "react";

// API 응답 데이터 타입 정의
interface Post {
  id: number;
  createdDate: string;
  modifiedDate: string;
  title: string;
  content: string;
}

export default function HomePage() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/posts`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const posts: Post[] = await response.json();
        // 최근 글 순으로 정렬하여 반환
        const sortedPosts = posts.sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
        setRecentPosts(sortedPosts);
      } catch (error) {
        console.error("포스트 데이터를 가져오는 중 오류 발생:", error);
        // 에러 발생 시 기본 데이터 반환
        setRecentPosts([
          {
            id: 1,
            createdDate: "2024-01-15T00:00:00.000000",
            modifiedDate: "2024-01-15T00:00:00.000000",
            title: "새로운 블로그를 시작하며",
            content:
              "개인적인 생각과 일상의 기록을 정리하기 위해 새로운 블로그를 시작하게 되었습니다. 앞으로 이곳에서 다양한 이야기들을 나누고 싶습니다.",
          },
          {
            id: 2,
            createdDate: "2024-01-12T00:00:00.000000",
            modifiedDate: "2024-01-12T00:00:00.000000",
            title: "Next.js 15와 함께하는 개발 여정",
            content:
              "Next.js 15의 새로운 기능들을 살펴보고, 실제 프로젝트에 적용해본 경험을 공유합니다. 특히 App Router의 개선사항들이 인상적이었습니다.",
          },
          {
            id: 3,
            createdDate: "2024-01-10T00:00:00.000000",
            modifiedDate: "2024-01-10T00:00:00.000000",
            title: "미니멀한 디자인에 대한 생각",
            content:
              "복잡함 속에서 단순함을 찾는 것의 중요성에 대해 생각해봅니다. 디자인뿐만 아니라 삶의 여러 영역에서 미니멀리즘이 주는 가치를 탐구해봅니다.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded mb-4"></div>
            <div className="h-6 bg-muted rounded mb-12"></div>
            <div className="h-8 bg-muted rounded mb-8"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 mb-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              일상의 생각과 기록
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              개발, 디자인, 그리고 일상에서 마주하는 다양한 이야기들을 정리하는
              공간입니다.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-semibold text-foreground">최근 글</h2>
            <div className="h-px bg-border flex-1"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* Newsletter Section
        <section className="py-12">
          <div className="max-w-md mx-auto">
            <div className="bg-card border rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                새 글 알림 받기
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                새로운 글이 올라올 때마다 이메일로 알림을 받아보세요.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="이메일 주소"
                  className="flex-1 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                  구독하기
                </button>
              </div>
            </div>
          </div>
        </section> */}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; 2025 기록 블로그.
          </p>
        </div>
      </footer>
    </div>
  );
}
