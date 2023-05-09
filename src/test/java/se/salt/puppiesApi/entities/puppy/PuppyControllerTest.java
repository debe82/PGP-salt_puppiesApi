package se.salt.puppiesApi.entities.puppy;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ActiveProfiles("test")
class PuppyControllerTest {

    @Test
    void getAllPuppies() {
    }

    @Test
    void getPuppy() {
    }

    @Test
    void createNewPuppy() {
    }

    @Test
    void updatePuppy() {
    }

    @Test
    void deletePuppy() {
    }
}