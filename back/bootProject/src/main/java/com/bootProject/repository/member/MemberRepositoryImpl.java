package com.bootProject.repository.member;

import com.bootProject.entity.Member;
import com.bootProject.entity.QMember;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Member> findAllMember() {
        QMember member = QMember.member;
        return queryFactory
                .selectFrom(member)
                .fetch();
    }
}
