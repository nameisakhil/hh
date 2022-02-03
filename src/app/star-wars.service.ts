import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'

import { LogService } from './log.service';

@Injectable()
export class StarWarsService {
  private characters = [
    { name: 'Luke Skywalker', side: '' },
    { name: 'Darth Vader', side: '' }
  ];
  private logService: LogService;
  charactersChanged = new Subject<void>();
  http:HttpClient;

  constructor(logService: LogService, http:HttpClient) {
    this.logService = logService;
    this.http = http
  }

  fetchCharacters(){
    // const myData = {description: 'Data I want to pass, could be any kind of data/ object'}

    this.http.get('https://swapi.dev/api/people/')
      .subscribe(
        (response:any) =>{

          const extraChars = response.results
          const chars = extraChars.map((char) => {
            return {name:char.name, side: ''}
          })
          console.log(response)
          console.log(extraChars)
          this.characters = chars
          this.charactersChanged.next()
        }
      );

    // this.http.post('https://my-api.com/endpoint', myData)
    // .subscribe(
    //         (transformedData: any) => {
    //             // Use your response data here
    //             console.log(transformedData);
    //         }
    //     );
  }

  getCharacters(chosenList) {
    if (chosenList === 'all') {
      return this.characters.slice();
    }
    return this.characters.filter((char) => {
      return char.side === chosenList;
    })
  }

  onSideChosen(charInfo) {
    const pos = this.characters.findIndex((char) => {
      return char.name === charInfo.name;
    })
    this.characters[pos].side = charInfo.side;
    this.charactersChanged.next();
    this.logService.writeLog('Changed side of ' + charInfo.name + ', new side: ' + charInfo.side);
  }

  addCharacter(name, side) {
    const pos = this.characters.findIndex((char) => {
      return char.name === name;
    })
    if (pos !== -1) {
      return;
    }
    const newChar = {name: name, side: side};
    this.characters.push(newChar);
  }
}
