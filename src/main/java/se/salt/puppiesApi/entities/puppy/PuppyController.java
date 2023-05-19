package se.salt.puppiesApi.entities.puppy;

import jakarta.servlet.http.HttpServletRequest;
import se.salt.puppiesApi.model.PuppyDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/puppies")
@CrossOrigin(origins = "*")

public class PuppyController {

    @Autowired
    PuppyService puppyService;

    @GetMapping
    ResponseEntity<List<Puppy>> getAllPuppies() {
        List<Puppy> puppyList = puppyService.getAllPuppies();
        return ResponseEntity.ok(puppyList);
    }

    @GetMapping("{id}")
    ResponseEntity<Puppy> getPuppy(@PathVariable int id) {
        if (id < 1) return ResponseEntity.badRequest().build();

        Puppy puppy = puppyService.getPuppy(id);
        if(puppy == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(puppy);
    }

    @PostMapping
    ResponseEntity<Puppy> createNewPuppy(@RequestBody PuppyDto puppyDto, HttpServletRequest req) {
        System.out.println("dto: " + puppyDto);
        Puppy newPuppy = puppyService.createNewPuppy(puppyDto);
        if (newPuppy == null) return ResponseEntity.unprocessableEntity().build();
        URI location = URI.create(req.getRequestURL() + "/" + newPuppy.getId());
        return ResponseEntity.created(location).body(newPuppy);
    }

    @PutMapping("{id}")
    ResponseEntity<Puppy> updatePuppy(@PathVariable int id, @RequestBody PuppyDto puppyDto, HttpServletRequest req) {
        System.out.println("id: " + id);
        System.out.println("dto: " + puppyDto);
        if (id < 1) return ResponseEntity.badRequest().build();
        Puppy puppyToUpdate = puppyService.updatePuppy(id, puppyDto);
        if(puppyToUpdate == null) return ResponseEntity.notFound().build();

        return ResponseEntity.accepted().body(puppyToUpdate);
    }

    @DeleteMapping("{id}")
    ResponseEntity deletePuppy(@PathVariable int id) {
        if (id < 1) return ResponseEntity.badRequest().build();

        Puppy puppyToDelete = puppyService.getPuppy(id);
        if (puppyToDelete == null) return ResponseEntity.notFound().build();

        puppyService.deletePuppy(id);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    ResponseEntity deleteAllPuppies() {
        puppyService.deleteAllPuppies();
        return ResponseEntity.noContent().build();
    }
}
