package com.wsiiz.moviesrepo.repository;

import com.wsiiz.moviesrepo.domain.Role;
import com.wsiiz.moviesrepo.domain.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(RoleName roleName);
}