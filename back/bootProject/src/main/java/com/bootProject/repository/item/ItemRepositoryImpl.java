package com.bootProject.repository.item;

import com.bootProject.common.code.CategoryType;
import com.bootProject.common.code.EnumMapper;
import com.bootProject.dto.ItemDTO;
import com.bootProject.entity.Item;
import com.bootProject.entity.QItem;
import com.bootProject.entity.QSaveFile;
import com.bootProject.entity.SaveFile;
import com.bootProject.mapper.item.ItemMapper;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.expression.spel.ast.Projection;

import static com.bootProject.entity.QItem.item;
import static com.bootProject.entity.QSaveFile.saveFile;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public ItemDTO findItemById(long id) {
        Item resultItem = queryFactory
                .select(item)
                .from(item)
                .innerJoin(item.fileList, saveFile)
                .where(item.id.eq(id))
                .fetchOne();

        ItemDTO itemDTO = ItemMapper.INSTANCE.toDTO(resultItem);
        if(null != itemDTO.getCategory()) {
            CategoryType categoryType = Arrays.stream(CategoryType.values())
                    .filter(category -> category.getCode().equals(itemDTO.getCategory()))
                    .findAny()
                    .orElseThrow(() -> new IllegalArgumentException("카테고리를 찾을 수 없습니다."));
            itemDTO.setCategory(categoryType != null ? categoryType.getTitle() : "");
        }

        return itemDTO;
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
