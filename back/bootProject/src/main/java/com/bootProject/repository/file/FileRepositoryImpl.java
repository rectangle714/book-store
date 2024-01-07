package com.bootProject.repository.file;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import static com.bootProject.entity.QSaveFile.saveFile;

@RequiredArgsConstructor
public class FileRepositoryImpl implements FileRepositoryCustom {
    private final JPAQueryFactory queryFactory;


}
