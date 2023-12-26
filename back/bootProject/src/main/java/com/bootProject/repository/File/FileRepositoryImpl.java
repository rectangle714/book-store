package com.bootProject.repository.File;

import com.bootProject.entity.Item;
import com.bootProject.entity.QItem;
import com.bootProject.entity.QSaveFile;
import com.bootProject.entity.SaveFile;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import static com.bootProject.entity.QSaveFile.saveFile;
import java.util.List;

@RequiredArgsConstructor
public class FileRepositoryImpl implements FileRepositoryCoustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public long saveAllFile() {
        return  queryFactory
                    .insert(saveFile)
                    .columns()
                    .values()
                    .execute();
    }
}
