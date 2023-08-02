package com.example.w7pg2_backend.domain;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class VisaUpdateDomain {
    int id;
    int num;
    String comment;
}
