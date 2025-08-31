import { BlogHeader } from "@/components/Header";
import { BlogPostCard } from "@/components/PostCard";

// 임시 데이터 - 실제로는 CMS나 마크다운 파일에서 가져올 예정
const samplePosts = [
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
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

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
            {samplePosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
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
        </section>
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
