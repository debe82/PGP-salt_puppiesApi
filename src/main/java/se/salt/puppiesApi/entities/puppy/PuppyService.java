package se.salt.puppiesApi.entities.puppy;

import se.salt.puppiesApi.model.PuppyDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PuppyService {

    @Autowired
    PuppyRepository puppyRepo;
    public List<Puppy> getAllPuppies() {
        return puppyRepo.getAllPuppies();
    }

    public Puppy getPuppy(int id) {
        return puppyRepo.getPuppy(id);
    }

    public Puppy createNewPuppy(PuppyDto puppyDto) {
        return puppyRepo.createNewPuppy(puppyDto);
    }

    public Puppy updatePuppy(int id, PuppyDto puppyDto) {
        Puppy puppyToUpdate = getPuppy(id);
        if (puppyToUpdate == null) return null;

        if (puppyDto.breed() != null &&
                puppyDto.breed() != "" &&
                !puppyDto.breed().equals(puppyToUpdate.getBreed()))
            { puppyToUpdate.setBreed(puppyDto.breed()); }

        if (puppyDto.name()!= null
                && puppyDto.name() != ""
                && !puppyDto.name().equals(puppyToUpdate.getName()))
            { puppyToUpdate.setName(puppyDto.name()); }

        if (puppyDto.birthDate() != null
                && puppyDto.birthDate() != puppyToUpdate.getBirthDate())
            { puppyToUpdate.setBirthDate(puppyDto.birthDate()); }

        return puppyRepo.updatePuppy(puppyToUpdate);

    }

    public void deletePuppy(int id) {
        Puppy puppy = getPuppy(id);
        puppyRepo.deletePuppy(puppy);
    }
}
