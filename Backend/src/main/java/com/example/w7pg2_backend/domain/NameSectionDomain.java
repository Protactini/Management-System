package com.example.w7pg2_backend.domain;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class NameSectionDomain {
    String firstName;
    String lastName;
    String preferredName;
    String avatar;
    String birthDate;
    String gender;
    String ssn;
}
