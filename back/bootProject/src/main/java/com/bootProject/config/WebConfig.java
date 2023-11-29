package com.bootProject.config;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .exposedHeaders("Authorization")
                .exposedHeaders("RefreshToken")
                .allowCredentials(true)
                .allowedOrigins("http://54.168.229.128:3000/","http://localhost:3000");
    }
}
