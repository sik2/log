import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";

// API 응답 데이터 타입 정의
interface Post {
  id: number;
  createdDate: string;
  modifiedDate: string;
  title: string;
  content: string;
}

// API에서 포스트 데이터를 가져오는 함수
async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/posts`,
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts: Post[] = await response.json();
    return posts;
  } catch (error) {
    console.error("포스트 데이터를 가져오는 중 오류 발생:", error);
    // 에러 발생 시 기본 데이터 반환
    return [
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
      {
        id: 4,
        createdDate: "2024-01-08T00:00:00.000000",
        modifiedDate: "2024-01-08T00:00:00.000000",
        title: "TypeScript와 함께하는 안전한 개발",
        content:
          "타입 안정성이 가져다주는 개발 경험의 향상에 대해 이야기합니다. 런타임 에러를 줄이고 더 나은 코드를 작성하는 방법을 공유합니다.",
      },
      {
        id: 5,
        createdDate: "2024-01-05T00:00:00.000000",
        modifiedDate: "2024-01-05T00:00:00.000000",
        title: "일상 속 작은 발견들",
        content:
          "평범한 하루 속에서 찾은 작은 깨달음들을 기록합니다. 때로는 가장 단순한 것들에서 가장 큰 영감을 얻을 수 있습니다.",
      },
      {
        id: 6,
        createdDate: "2024-01-03T00:00:00.000000",
        modifiedDate: "2024-01-03T00:00:00.000000",
        title: "효율적인 워크플로우 구축하기",
        content:
          "개발자로서 생산성을 높이기 위한 도구들과 방법론을 소개합니다. 작은 변화가 큰 차이를 만들어내는 경험을 공유합니다.",
      },
    ];
  }
}

export default async function PostsPage() {
  const allPosts = await fetchPosts();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <section className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            모든 글
          </h1>
          <p className="text-muted-foreground text-sm">
            지금까지 작성한 모든 글들을 시간순으로 정리했습니다.
          </p>
        </section>

        {/* Posts Grid */}
        <section>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* Pagination - 추후 구현 예정 */}
        <section className="mt-12 flex justify-center">
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              이전
            </button>
            <span className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded">
              1
            </span>
            <button className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              다음
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
