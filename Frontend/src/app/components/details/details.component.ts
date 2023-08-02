import { Component, OnInit } from '@angular/core';
import { PassDataServiceService } from 'src/app/services/pass-data-service.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  index!: number;
  constructor(private passDataService: PassDataServiceService) { }

  ngOnInit(): void {
    this.index = this.passDataService.getIndex();
  }

}
