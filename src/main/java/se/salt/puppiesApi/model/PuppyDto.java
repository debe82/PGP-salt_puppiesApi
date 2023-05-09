package se.salt.puppiesApi.model;

import java.util.Date;

public record PuppyDto(
        String breed,
        String name,
        String birthDate
) {
}
