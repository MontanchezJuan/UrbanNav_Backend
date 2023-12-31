package com.urbanNav.security.Configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.urbanNav.security.Interceptors.SecurityInterceptor;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    // @Autowired
    // private SecurityInterceptor securityInterceptor;

    // @Override
    // public void addInterceptors(InterceptorRegistry registry) {
    //     registry.addInterceptor(securityInterceptor)
    //     .excludePathPatterns("/security/**")
    //     .addPathPatterns("/**");
    // }
}
