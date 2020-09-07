import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { EntryService } from '../../shared/entry.service';
import { RoomsService } from '../../shared/rooms.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  constructor(public service: EntryService,
    public roomsService: RoomsService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<EntryComponent>) { }

  ngOnInit() {
    this.service.getEntries();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value)
        this.service.insertEntry(this.service.form.value);
      else
      this.service.updateEntry(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
