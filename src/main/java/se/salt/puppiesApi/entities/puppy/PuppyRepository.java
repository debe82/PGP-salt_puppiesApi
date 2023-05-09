package se.salt.puppiesApi.entities.puppy;

import se.salt.puppiesApi.model.PuppyDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PuppyRepository {

    @Autowired
    IJpaPuppyRepository jpaRepo;
    public List<Puppy> getAllPuppies() {
        Iterable<Puppy> allPuppies = jpaRepo.findAll();
        List<Puppy> puppiesList = Streamable.of(allPuppies).toList();
        return puppiesList;
    }

    public Puppy getPuppy(int id) {
        return jpaRepo.findById(id).orElse(null);
    }

    public Puppy getPuppyByName(String name) { return jpaRepo.findPuppyByName(name); }

    public Puppy createNewPuppy(PuppyDto puppyDto) {
        Puppy newPuppy = new Puppy(puppyDto.breed(), puppyDto.name());
        return jpaRepo.save(newPuppy);
    }

    public Puppy updatePuppy(Puppy puppyToUpdate) {
        return jpaRepo.save(puppyToUpdate);
    }

    public void deletePuppy(Puppy puppy) {
        jpaRepo.delete(puppy);
    }

    public void deleteAllPuppies() {
        jpaRepo.deleteAll();
    }
}
