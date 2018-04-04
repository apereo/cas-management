import {Injectable} from '@angular/core';
import {Messages} from '../app/messages';
/**
 * Created by tschmidt on 2/10/17.
 */
/* tslint:disable */
@Injectable()
export class RegisterMessages extends Messages {
  services_form_tooltip_serviceId = 'This field needs to be the exact URL that is passed to the CAS Server when your \
                                     application attempts to login into CAS.  In most cases this is the same URL users \
                                     use to access the service';

  services_form_tooltip_name = 'Give your service a meaningful name that corresponds to how users refer \
                                       to your application.';

  services_form_tooltip_description = 'Give your service a meaningful description so admins and other users know what \
                                       your application does and what it requires.'

  services_form_tooltip_logoutUrl = 'Provide a fully qualified logout URL for your service if your CAS client \
                                     does not support CAS SLO, or if you want CAS to call a custom logout URL when the \
                                     user signs out of a CAS.';

  services_form_tooltip_logoutType = 'By default CAS will send a logout request to your CAS client through a back channel \
                                      server to server call.  If your application uses client side storage through cookies \
                                      or local storage to track user sessions, you can set this field to FRONT_CHANNEL and \
                                      cas will send a request through the browser.  You can then set your custom logout URL \
                                      in the field below.  You can also set this field to NONE to opt out participating in \
                                      SLO all together.';

  services_form_tooltip_sas_ssoEnabled = 'Uncheck this field if this service should always prompt for login regardless if \
                                          the user is currently logged into any other CAS protected service.'
}
