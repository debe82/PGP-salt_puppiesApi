package se.salt.puppiesApi.entities.puppy;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import se.salt.puppiesApi.model.PuppyDto;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;
import java.util.List;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ActiveProfiles("test")
class PuppyServiceTest {

    @Autowired
    PuppyService service;

    PuppyDto puppyDto1 = new PuppyDto("breed1", "name1", (new Date()).toString());
    PuppyDto puppyDto2 = new PuppyDto("breed2", "name2", (new Date()).toString());

    @Test
    @Order(1)
    void shouldCreateNewPuppies() {
        Puppy puppy1 = service.createNewPuppy(puppyDto1);
        Puppy puppy2 = service.createNewPuppy(puppyDto2);

        assertThat(puppy1).isNotEqualTo(null);
        assertThat(puppy2).isNotEqualTo(null);
    }

    @Test
    @Order(2)
    void getAllPuppies() {
        List<Puppy> puppyList = service.getAllPuppies();
        assertThat(puppyList).isNotEqualTo(null);
        assertThat(puppyList.size() == 2);
    }

    @Test
    @Order(3)
    void shouldReturn422IfPuppyExist() {
        Puppy puppy = service.createNewPuppy(puppyDto1);
        assertThat(puppy).isEqualTo(null);
    }

    @Test
    @Order(4)
    void getPuppy() {
        Puppy puppy = service.getPuppy(1);

        assertThat(puppy).isNotEqualTo(null);
        assertThat(puppy.getName()).isEqualTo("name1");
        assertThat(puppy.getBreed()).isEqualTo("breed1");
    }

    @Test
    @Order(5)
    void updatePuppy() {
        Puppy puppy = service.getPuppy(1);
        Puppy updatedPuppy = service.updatePuppy(puppy.getId(), new PuppyDto("breedX", "name1", null));

        assertThat(updatedPuppy.getBreed()).isNotEqualTo(puppy.getBreed());
        assertThat(updatedPuppy.getName()).isEqualTo(puppy.getName());
        assertThat(updatedPuppy.getBirthDate()).isEqualTo(puppy.getBirthDate());
    }

    @Test
    @Order(6)
    void deletePuppy() {
        service.deletePuppy(1);
        Puppy puppy = service.getPuppy(1);
        List<Puppy> puppyList = service.getAllPuppies();

        assertThat(puppy).isEqualTo(null);
        assertThat(puppyList.size()).isEqualTo(1);
    }

}