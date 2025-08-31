import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

// 임시 데이터 - 실제로는 CMS나 마크다운 파일에서 가져올 예정
const samplePosts = [
  {
    id: "1",
    title: "새로운 블로그를 시작하며",
    content: `
# 새로운 시작

개인적인 생각과 일상의 기록을 정리하기 위해 새로운 블로그를 시작하게 되었습니다. 

## 블로그를 시작하는 이유

오랫동안 머릿속에만 맴돌던 생각들을 글로 정리하고 싶었습니다. 개발을 하면서 배운 것들, 일상에서 느낀 소소한 감정들, 그리고 미래에 대한 계획들을 이곳에 차근차근 기록해보려고 합니다.

## 앞으로의 계획

- 개발 관련 학습 내용 정리
- 일상의 소소한 이야기들
- 책을 읽고 느낀 점들
- 여행과 새로운 경험들

앞으로 이곳에서 다양한 이야기들을 나누고 싶습니다. 혹시 이 글을 읽고 계신다면, 언제든 편하게 소통해주세요!
    `,
    date: "2024년 1월 15일",
  },
  {
    id: "2",
    title: "Next.js 15와 함께하는 개발 여정",
    content: `
# Next.js 15의 새로운 기능들

Next.js 15가 출시되면서 많은 개선사항들이 추가되었습니다. 실제 프로젝트에 적용해본 경험을 공유해보겠습니다.

## 주요 개선사항

### 1. App Router의 안정화
App Router가 더욱 안정화되었고, 성능도 크게 향상되었습니다. 특히 서버 컴포넌트와 클라이언트 컴포넌트 간의 경계가 더욱 명확해졌습니다.

### 2. 향상된 개발 경험
- 더 빠른 Hot Reload
- 개선된 에러 메시지
- 향상된 TypeScript 지원

## 실제 적용 경험

이번 블로그 프로젝트에서도 Next.js 15를 사용했는데, 개발 경험이 정말 좋았습니다. 특히 새로운 라우팅 시스템이 직관적이고 사용하기 편했습니다.

앞으로도 Next.js의 발전이 기대됩니다!
    `,
    date: "2024년 1월 12일",
  },
  {
    id: "3",
    title: "미니멀한 디자인에 대한 생각",
    content: `
# 단순함의 힘

복잡함 속에서 단순함을 찾는 것의 중요성에 대해 생각해봅니다.

## 미니멀리즘은란?

미니멀리즘은 단순히 '적게 가지는 것'이 아닙니다. 정말 중요한 것에 집중하기 위해 불필요한 것들을 제거하는 철학입니다.

## 디자인에서의 미니멀리즘

- **여백의 활용**: 여백은 비어있는 공간이 아니라 시각적 휴식을 제공하는 중요한 요소
- **색상의 절제**: 너무 많은 색상보다는 조화로운 몇 가지 색상으로 통일감 연출
- **타이포그래피**: 읽기 쉽고 명확한 폰트 선택

## 삶에서의 미니멀리즘

디자인뿐만 아니라 삶의 여러 영역에서도 미니멀리즘의 가치를 느낄 수 있습니다. 정말 필요한 것들에 집중할 때 더 큰 만족감을 얻을 수 있다고 생각합니다.
    `,
    date: "2024년 1월 10일",
  },
];

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  if (["new", "write", "edit", "update"].includes(id)) {
    notFound();
  }

  const post = samplePosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  // 이전/다음 글 찾기
  const currentIndex = samplePosts.findIndex((p) => p.id === id);
  const prevPost = currentIndex > 0 ? samplePosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < samplePosts.length - 1
      ? samplePosts[currentIndex + 1]
      : null;

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
              <time dateTime={post.date}>{post.date}</time>
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
  return samplePosts
    .filter((post) => !["new", "write", "edit", "update"].includes(post.id))
    .map((post) => ({
      id: post.id,
    }));
}
