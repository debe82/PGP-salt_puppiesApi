package se.salt.puppiesApi.entities.puppy;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IJpaPuppyRepository extends JpaRepository<Puppy, Integer> {
    @Query("select p from Puppy p where p.name = :name")
    Puppy findPuppyByName(@Param("name")String name);
}
