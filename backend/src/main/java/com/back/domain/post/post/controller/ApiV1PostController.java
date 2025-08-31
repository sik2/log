package com.back.domain.post.post.controller;

import com.back.domain.post.post.dto.PostDto;
import com.back.domain.post.post.entity.Post;
import com.back.domain.post.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@RestController
public class ApiV1PostController {
    private final PostService postService;

    @GetMapping
    public List<Post> getPosts() {
        return postService.getList();
    }

    @GetMapping("/{id}")
    public Post getPost(@PathVariable Long id) {
        return postService.get(id);
    }

    @PostMapping
    public Post createPost(@RequestBody PostDto postDto) {
        return postService.create(postDto.getTitle(), postDto.getContent());
    }

    @PutMapping("/{id}")
    public void updatePost(@PathVariable Long id, @RequestBody PostDto postDto) {
        postService.update(id, postDto.getTitle(), postDto.getContent());
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.delete(id);
    }
}
