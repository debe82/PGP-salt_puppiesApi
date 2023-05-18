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
    private String birthDate;
    private String imgLink;

    public Puppy(String breed, String name, String imgLink) {
        this.breed = breed;
        this.name = name;
        this.birthDate = (new Date()).toString();
        this.imgLink = imgLink;
    }

    public Puppy(String breed, String name, String birthDate, String imgLink) {
        this.breed = breed;
        this.name = name;
        this.birthDate = birthDate;
        this.imgLink = imgLink;
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

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getImgLink() {
        return imgLink;
    }

    public void setImgLink(String imgLink) {
        this.imgLink = imgLink;
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
