package com.bootProject.repository.File;

import com.bootProject.entity.Item;
import com.bootProject.entity.SaveFile;
import com.bootProject.repository.item.ItemRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<SaveFile, Long>, FileRepositoryCoustom {



}
