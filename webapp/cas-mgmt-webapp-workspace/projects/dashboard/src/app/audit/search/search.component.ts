import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {SearchForm} from './search.form';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form: SearchForm;

  constructor(public dialogRef: MatDialogRef<SearchComponent>) { }

  ngOnInit() {
    this.form = new SearchForm();
  }

  search(download: boolean = false) {
    let s = null;
    if (this.form.startDate.value) {
      const sd = new Date(this.form.startDate.value);
      s = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate(),
        this.form.startHour.value,
        this.form.startMinute.value,
        this.form.startSecond.value,
        this.form.startMilli.value).getTime();
    }
    let e = null;
    if (this.form.endDate.value) {
      const ed = new Date(this.form.endDate.value);
      e = new Date(ed.getFullYear(), ed.getMonth(), ed.getDate(),
        this.form.endHour.value,
        this.form.endMinute.value,
        this.form.endSecond.value,
        this.form.endMilli.value).getTime();
    }
    const data = {interval: this.form.interval.value,
                  principal: this.form.principal.value,
                  startDate: s ? s : '',
                  endDate: e ? e : '',
                  actionPerformed: this.form.action.value,
                  clientIpAddress: this.form.clientIP.value,
                  resourceOperatedUpon: this.form.resource.value,
                  download};
    this.dialogRef.close(data);
  }

}
