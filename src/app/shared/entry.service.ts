import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(public firebase: AngularFireDatabase, public datePipe: DatePipe) { }


  residenstList: AngularFireList<any>;
  residentsarray = [];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    fatherName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    cnic: new FormControl('', Validators.required),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    secondarymobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    usertype: new FormControl('1'),
    roomNo: new FormControl('', Validators.required),
    startDate: new FormControl(''),
    feePaid: new FormControl(false)
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      fatherName: '',
      email: '',
      cnic: '',
      mobile: '',
      secondarymobile: '',
      city: '',
      usertype: '1',
      roomNo: '',
      startDate: '',
      feePaid: false
    });
  }


  getEntries() {
    this.residenstList = this.firebase.list('residents');
    this.residenstList.snapshotChanges().subscribe(
      list => {
        this.residentsarray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
    return this.residenstList.snapshotChanges();
  }

  insertEntry(entry) {
    this.residenstList.push({
      fullName: entry.fullName,
      fatherName: entry.fatherName,
      email: entry.email,
      cnic: entry.cnic,
      mobile: entry.mobile,
      secondarymobile: entry.secondarymobile,
      city: entry.city,
      usertype: entry.usertype,
      roomNo: entry.roomNo,
      startDate: entry.startDate == "" ? "" : this.datePipe.transform(entry.startDate, 'yyyy-MM-dd'),
      feePaid: entry.feePaid
    });
  }

  updateEntry(entry) {
    this.residenstList.update(entry.$key,
      {
        fullName: entry.fullName,
        fatherName: entry.fatherName,
        email: entry.email,
        cnic: entry.cnic,
        mobile: entry.mobile,
        secondarymobile: entry.secondarymobile,
        city: entry.city,
        usertype: entry.usertype,
        roomNo: entry.roomNo,
        startDate: entry.startDate == "" ? "" : this.datePipe.transform(entry.startDate, 'yyyy-MM-dd'),
        feePaid: entry.feePaid
      });
  }

  deleteEntry($key: string) {
    this.residenstList.remove($key);
  }

  populateForm(entry) {
    this.form.setValue(_.omit(entry,'departmentName'));
  }
}
