package com.bootProject.repository.File;

import com.bootProject.entity.Item;
import com.bootProject.entity.QItem;
import com.bootProject.entity.SaveFile;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class FileRepositoryImpl implements FileRepositoryCoustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public int saveAllFile(SaveFile saveFile) {
        return 0;
    }

    //    @Override
//    public int saveAllFile(SaveFile saveFile) {
//
////        return queryFactory
////                .insert()
//
////        return queryFactory
////                .selectFrom(item)
////                .fetch();
//    }
}
