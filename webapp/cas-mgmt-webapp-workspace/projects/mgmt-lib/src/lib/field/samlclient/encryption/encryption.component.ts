import {Component, Input} from '@angular/core';
import {EncryptionForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display/update SAML encryption options.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-encryption',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.css']
})
export class EncryptionComponent {

  @Input()
  form: EncryptionForm;

  encOptions = [
    {value: 'http://www.w3.org/2001/04/xmlenc#aes128-cbc', display: 'AES128-CBC'},
    {value: 'http://www.w3.org/2001/04/xmlenc#aes192-cbc', display: 'AES192-CBC'},
    {value: 'http://www.w3.org/2001/04/xmlenc#aes256-cbc', display: 'AES256-CBC'},
    {value: 'http://www.w3.org/2001/04/xmlenc#tripledes-cbc', display: 'TRIPLEDES-CBC'}
  ];

  encKeyOptions = [
    {value: 'http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p', display: 'RSA-OAEP-MGF1P'},
    {value: 'http://www.w3.org/2001/04/xmlenc#kw-aes128', display: 'KW-AES128'},
    {value: 'http://www.w3.org/2001/04/xmlenc#kw-aes192', display: 'KW-AES192'},
    {value: 'http://www.w3.org/2001/04/xmlenc#kw-aes256', display: 'KW-AES256'},
    {value: 'http://www.w3.org/2001/04/xmlenc#kw-tripledes', display: 'KW-TRIPLEDES'}
  ];

  constructor(public config: AppConfigService) { }

}
