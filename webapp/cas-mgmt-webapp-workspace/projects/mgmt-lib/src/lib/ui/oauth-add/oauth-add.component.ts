import {Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * Dialog component to allow the user to select OAuth or OIDC.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-add-oauth',
  templateUrl: './oauth-add.component.html',
  styleUrls: ['./oauth-add.component.css']
})
export class OAuthAddComponent {

  constructor(public dialogRef: MatDialogRef<OAuthAddComponent>) {}

  /**
   * Closes the dialog returning 'oidc' as the result.
   */
  oidc() {
    this.dialogRef.close('oidc');
  }

  /**
   * Closes the dialog returning 'oauth' as the result.
   */
  oauth() {
    this.dialogRef.close('oauth');
  }

}
