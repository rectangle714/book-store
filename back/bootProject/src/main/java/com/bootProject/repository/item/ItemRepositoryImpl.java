package com.bootProject.repository.item;

import com.bootProject.entity.Item;
import com.bootProject.entity.QItem;
import com.bootProject.entity.QSaveFile;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import static com.bootProject.entity.QItem.item;
import static com.bootProject.entity.QSaveFile.saveFile;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class ItemRepositoryImpl implements ItemRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Item> findListAll() {
        return queryFactory
                .selectFrom(item)
                .leftJoin(item.fileList, saveFile).fetchJoin()
                .orderBy(item.registerDate.desc())
                .fetch();
    }

    @Override
    public Item findItemById(long id) {
        return queryFactory
                .selectFrom(item)
                .innerJoin(item.fileList, saveFile).fetchJoin()
                .where(item.id.eq(id))
                .fetchOne();
    }

    @Override
    public List<Item> findRecentRegisteredItem() {
        List<Long> itemIds = queryFactory
                .select(item.id)
                .from(item)
                .orderBy(item.registerDate.desc())
                .offset(0)
                .limit(14)
                .fetch();

        return queryFactory
                .selectFrom(item)
                .leftJoin(item.fileList,saveFile).fetchJoin()
                .where(item.id.in(itemIds))
                .orderBy(item.registerDate.desc())
                .fetch();
    }
}
