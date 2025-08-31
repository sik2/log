"use client";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const handleSave = () => {
    // TODO: 임시 저장 로직 구현
    alert("준비중 입니다.");
    console.log("임시 저장:", { title, content });
  };

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/posts`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
        }),
      });

      if (response.ok) {
        alert("게시글이 성공적으로 등록되었습니다!");
        // 목록 페이지로 이동
        window.location.href = "/posts";
      } else {
        const errorData = await response.json();
        alert(
          `게시글 등록에 실패했습니다: ${
            errorData.message || "알 수 없는 오류"
          }`
        );
      }
    } catch (error) {
      console.error("게시글 등록 오류:", error);
      alert("게시글 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

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
              {/* <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreview(!isPreview)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {isPreview ? "편집" : "미리보기"}
              </Button> */}
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
                  placeholder={`내용을 입력하세요...

# 제목 1
## 제목 2

**굵은 글씨**
*기울임 글씨*
~~취소선~~

- 목록 항목 1
- 목록 항목 2

1. 번호 목록 1
2. 번호 목록 2

\`\`\`코드 블록\`\`\`
\`인라인 코드\`

[링크](https://example.com)

| 테이블 | 헤더 |
|--------|------|
| 셀1    | 셀2  |

> 인용문`}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[400px] resize-none font-mono"
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
                  <div className="markdown">
                    {content ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {content}
                      </ReactMarkdown>
                    ) : (
                      <p className="text-muted-foreground">
                        내용을 입력하면 여기에 미리보기가 표시됩니다.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
