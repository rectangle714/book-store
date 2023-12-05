package com.bootProject.repository.item;

import com.bootProject.entity.Item;
import com.bootProject.entity.QItem;
import com.bootProject.entity.QSaveFile;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class ItemRepositoryImpl implements ItemRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Item> findListAll() {
        QItem item = QItem.item;
        QSaveFile file = QSaveFile.saveFile;
        return queryFactory
                .selectFrom(item)
                .leftJoin(item.fileList,file).fetchJoin()
                .fetch();
    }

    @Override
    public Item findItemById(long id) {
        QItem item = QItem.item;
        QSaveFile file = QSaveFile.saveFile;

        return queryFactory
                .selectFrom(item)
                .innerJoin(item.fileList, file).fetchJoin()
                .where(item.id.eq(id))
                .fetchOne();
    }

    @Override
    public List<Item> findRecentRegisteredItem() {
        QItem item = QItem.item;
        QSaveFile file = QSaveFile.saveFile;
        return queryFactory
                .selectFrom(item)
                .leftJoin(item.fileList,file).fetchJoin()
                .orderBy(item.registerDate.desc())
                .limit(14)
                .fetch();

    }
}
