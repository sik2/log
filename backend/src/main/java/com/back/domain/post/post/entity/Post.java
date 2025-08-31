package com.back.domain.post.post.entity;

import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Post extends BaseEntity {
    @Column(nullable=false, length=150)
    private String title;

    @Lob
    @Column(nullable=false)
    private String content;

    public Post(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public void modify(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
