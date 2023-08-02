package com.example.w7pg2_backend.domain;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ApplicationDomain {
    int id;
    int stageNum;
    String comment;
    List<ShowFileDomain> files;
    String endDate;
}
