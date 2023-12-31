package com.urbanNav.security.Repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.urbanNav.security.Models.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
    @Query("{'name':?0}")
    Optional<Role> getRole(String name);
}
