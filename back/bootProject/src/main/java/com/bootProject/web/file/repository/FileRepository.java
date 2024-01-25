package com.bootProject.web.file.repository;

import com.bootProject.web.file.entity.SaveFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<SaveFile, Long>, FileRepositoryCustom {



}
