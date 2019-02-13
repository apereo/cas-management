import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {SamlService} from '../../core/saml.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddComponent>,
              public service: SamlService) { }

  ngOnInit() {
  }

  upload(evt: Event) {
    const input: HTMLInputElement = evt.srcElement as HTMLInputElement;
    const reader = new FileReader();
    reader.onload = (function(fe: AddComponent) {
      return function (e: Event) {
        fe.service.upload(<string> reader.result).subscribe(service => {
          fe.service.uploaded = service;
          fe.dialogRef.close('upload')
        });
      };
    })(this);
    reader.readAsText(input.files[0]);
  }

}
