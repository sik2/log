package com.back.domain.post.post.service;

import com.back.domain.post.post.entity.Post;
import com.back.domain.post.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class PostService {
    private final PostRepository postRepository;

    public Post create(String title, String content) {
        Post post = new Post(title, content);
        return postRepository.save(post);
    }

    public List<Post> getList() {
        return postRepository.findAll();
    }

    @Transactional
    public Post get(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("게시글 없음: " + id));
    }

    @Transactional
    public void delete(Long id) {
        postRepository.deleteById(id);
    }

    @Transactional
    public void update(Long id, String title, String content) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("게시글 없음: " + id));
        post.modify(title, content);
    }
}
