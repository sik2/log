"use client";

import { BlogHeader } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Eye, Save, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const handleSave = () => {
    // TODO: 임시 저장 로직 구현
    console.log("임시 저장:", { title, content });
  };

  const handlePublish = () => {
    // TODO: 발행 로직 구현
    console.log("발행:", { title, content });
  };

  const formatContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>");
  };

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <section className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/posts">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  목록으로
                </Button>
              </Link>
              <h1 className="text-2xl font-semibold text-foreground">
                새 글 작성
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
              <Button size="sm" onClick={handlePublish}>
                <Send className="w-4 h-4 mr-2" />
                발행
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
                  placeholder="내용을 입력하세요...

**굵은 글씨**
*기울임 글씨*
일반 텍스트"
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
