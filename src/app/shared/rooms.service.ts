import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  roomsList: AngularFireList<any>;
  array = [];

  constructor(private firebase: AngularFireDatabase) {
    this.roomsList = this.firebase.list('rooms');
    this.roomsList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
      console.log("arrr",this.array);
   }


  //  getDepartmentName($key) {
  //   if ($key == "0")
  //     return "";
  //   else{
  //     return _.find(this.array, (obj) => { return obj.$key == $key; })['name'];
  //   }
  // }

   getRoomsCapacity($key) {
    if ($key == "0")
      return "";
    else{
      return _.find(this.array, (obj) => { return obj.$key == $key; })['capacity'];
    }
  }


}
