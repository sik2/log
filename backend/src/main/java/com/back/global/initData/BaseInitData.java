package com.back.global.initData;

import com.back.domain.post.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class BaseInitData {
    private final PostService postService;

    @Bean
    ApplicationRunner baseInitDataApplicationRunner() {
        return args -> {
            postService.create("새로운 블로그를 시작하며", "개인적인 생각과 일상의 기록을 정리하기 위해 새로운 블로그를 시작하게 되었습니다. 앞으로 이곳에서 다양한 이야기들을 나누고 싶습니다.");
            postService.create("Next.js 15와 함께하는 개발 여정", "Next.js 15의 새로운 기능들을 살펴보고, 실제 프로젝트에 적용해본 경험을 공유합니다. 특히 App Router의 개선사항들이 인상적이었습니다.");
            postService.create("미니멀한 디자인에 대한 생각", "복잡함 속에서 단순함을 찾는 것의 중요성에 대해 생각해봅니다. 디자인뿐만 아니라 삶의 여러 영역에서 미니멀리즘이 주는 가치를 탐구해봅니다.");
            postService.create("TypeScript와 함께하는 안전한 개발", "타입 안정성이 가져다주는 개발 경험의 향상에 대해 이야기합니다. 런타임 에러를 줄이고 더 나은 코드를 작성하는 방법을 공유합니다.");
            postService.create("일상 속 작은 발견들", "평범한 하루 속에서 찾은 작은 깨달음들을 기록합니다. 때로는 가장 단순한 것들에서 가장 큰 영감을 얻을 수 있습니다.");
            postService.create("효율적인 워크플로우 구축하기", "타입 안정성이 가져다주는 개발 경험의 향상에 대해 이야기합니다. 런타임 에러를 줄이고 더 나은 코드를 작성하는 방법을 공유합니다.");
        };
    }
}
