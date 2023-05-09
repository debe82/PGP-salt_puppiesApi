package se.salt.puppiesApi.entities.puppy;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.Date;

@Entity
public class Puppy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int puppyId;

    private String breed;
    private String name;
    private Date birthDate;

    public Puppy(String breed, String name) {
        this.breed = breed;
        this.name = name;
        this.birthDate = new Date();
    }

    public Puppy() {
    }

    public int getPuppyId() {
        return puppyId;
    }

    public void setPuppyId(int puppyId) {
        this.puppyId = puppyId;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    @Override
    public String toString() {
        return "Puppy{" +
                "puppyId=" + puppyId +
                ", breed='" + breed + '\'' +
                ", name='" + name + '\'' +
                ", birthDate=" + birthDate +
                '}';
    }
}
