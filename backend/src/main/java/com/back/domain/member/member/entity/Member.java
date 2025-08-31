package com.back.domain.member.member.entity;

import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Getter
@NoArgsConstructor
public class Member extends BaseEntity {
    @Column(nullable=false, length=30, unique=true)
    private String username;
    @Column(nullable=false)
    private String password;
    @Column(nullable=false, length=30, unique=true)
    private String nickname;

    public  Member(String username, String password, String nickname) {
        this.username = username;
        this.password = password;
        this.nickname = nickname;
    }
}
