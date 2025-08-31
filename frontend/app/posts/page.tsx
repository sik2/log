import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";

// 임시 데이터 - 실제로는 CMS나 마크다운 파일에서 가져올 예정
const allPosts = [
  {
    id: "1",
    title: "새로운 블로그를 시작하며",
    excerpt:
      "개인적인 생각과 일상의 기록을 정리하기 위해 새로운 블로그를 시작하게 되었습니다. 앞으로 이곳에서 다양한 이야기들을 나누고 싶습니다.",
    date: "2024년 1월 15일",
  },
  {
    id: "2",
    title: "Next.js 15와 함께하는 개발 여정",
    excerpt:
      "Next.js 15의 새로운 기능들을 살펴보고, 실제 프로젝트에 적용해본 경험을 공유합니다. 특히 App Router의 개선사항들이 인상적이었습니다.",
    date: "2024년 1월 12일",
  },
  {
    id: "3",
    title: "미니멀한 디자인에 대한 생각",
    excerpt:
      "복잡함 속에서 단순함을 찾는 것의 중요성에 대해 생각해봅니다. 디자인뿐만 아니라 삶의 여러 영역에서 미니멀리즘이 주는 가치를 탐구해봅니다.",
    date: "2024년 1월 10일",
  },
  {
    id: "4",
    title: "TypeScript와 함께하는 안전한 개발",
    excerpt:
      "타입 안정성이 가져다주는 개발 경험의 향상에 대해 이야기합니다. 런타임 에러를 줄이고 더 나은 코드를 작성하는 방법을 공유합니다.",
    date: "2024년 1월 8일",
  },
  {
    id: "5",
    title: "일상 속 작은 발견들",
    excerpt:
      "평범한 하루 속에서 찾은 작은 깨달음들을 기록합니다. 때로는 가장 단순한 것들에서 가장 큰 영감을 얻을 수 있습니다.",
    date: "2024년 1월 5일",
  },
  {
    id: "6",
    title: "효율적인 워크플로우 구축하기",
    excerpt:
      "개발자로서 생산성을 높이기 위한 도구들과 방법론을 소개합니다. 작은 변화가 큰 차이를 만들어내는 경험을 공유합니다.",
    date: "2024년 1월 3일",
  },
];

export default function PostsPage() {
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
            {allPosts.map((post) => (
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
