package org.vdi.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.vdi.model.Users;

public class UserRepository  implements PanacheRepository<Users> {
}
