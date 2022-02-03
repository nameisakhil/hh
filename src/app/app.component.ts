import { Component, OnInit } from '@angular/core';
import { StarWarsService } from './star-wars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public swService:any;

  constructor(swService: StarWarsService){
    this.swService = swService
  }

  ngOnInit(): void {
    this.swService.fetchCharacters()
  }

}
