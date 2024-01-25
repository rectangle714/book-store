package com.bootProject.web.file.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class FileRepositoryImpl implements FileRepositoryCustom {
    private final JPAQueryFactory queryFactory;


}
