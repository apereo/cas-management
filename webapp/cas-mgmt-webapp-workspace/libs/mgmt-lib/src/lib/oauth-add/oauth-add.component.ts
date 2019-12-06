import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'lib-add-oauth',
  templateUrl: './oauth-add.component.html',
  styleUrls: ['./oauth-add.component.css']
})
export class OAuthAddComponent {

  constructor(public dialogRef: MatDialogRef<OAuthAddComponent>) {}

  oidc() {
    this.dialogRef.close('oidc');
  }

  oauth() {
    this.dialogRef.close('oauth');
  }

}
