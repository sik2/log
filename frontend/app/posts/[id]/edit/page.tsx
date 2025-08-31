"use client";

import { BlogHeader } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Eye, Save, Send } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

const samplePosts = [
  {
    id: "1",
    title: "Next.js 15의 새로운 기능들",
    content: "Next.js 15가 출시되면서 많은 새로운 기능들이 추가되었습니다...",
    date: "2024-01-15",
  },
  {
    id: "2",
    title: "TypeScript와 함께하는 현대적 웹 개발",
    content: "TypeScript는 현대 웹 개발에서 필수적인 도구가 되었습니다...",
    date: "2024-01-10",
  },
];

export default function EditPage({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const post = samplePosts.find((p) => p.id === params.id);

  useEffect(() => {
    if (!post) {
      notFound();
    }

    setTitle(post.title);
    setContent(post.content);
    setIsLoading(false);
  }, [post]);

  const handleSave = () => {
    // TODO: 저장 로직 구현
    console.log("저장:", { id: params.id, title, content });
  };

  const handleUpdate = () => {
    // TODO: 업데이트 로직 구현
    console.log("업데이트:", { id: params.id, title, content });
  };

  const formatContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        로딩 중...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <section className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href={`/posts/${params.id}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  글로 돌아가기
                </Button>
              </Link>
              <h1 className="text-2xl font-semibold text-foreground">
                글 수정
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreview(!isPreview)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {isPreview ? "편집" : "미리보기"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                임시저장
              </Button>
              <Button size="sm" onClick={handleUpdate}>
                <Send className="w-4 h-4 mr-2" />
                업데이트
              </Button>
            </div>
          </div>
        </section>

        {/* Editor Section */}
        <section className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">편집</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="제목을 입력하세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-base"
                />
                <Textarea
                  placeholder="내용을 입력하세요..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[400px] resize-none"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">미리보기</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">
                    {title || "제목을 입력하세요"}
                  </h2>
                  <div className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString("ko-KR")}
                  </div>
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: content
                        ? formatContent(content)
                        : '<p class="text-muted-foreground">내용을 입력하면 여기에 미리보기가 표시됩니다.</p>',
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
