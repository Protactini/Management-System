package com.example.w7pg2_backend.domain;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class UpLoadFileDomain {
    int id;
    String location;
    String title;
    int uploadBy;
}
