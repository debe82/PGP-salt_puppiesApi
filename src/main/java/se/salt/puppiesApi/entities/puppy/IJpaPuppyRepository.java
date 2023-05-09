package se.salt.puppiesApi.entities.puppy;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IJpaPuppyRepository extends JpaRepository<Puppy, Integer> {

}
