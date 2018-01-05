export class UserProfile {
  static cName = 'org.apereo.cas.mgmt.authentication.CasUserProfile';

  id: String;
  attributes: Map<String, any>;
  isRemembered: boolean;
  roles: String[];
  permissions: String[];
  clientName: String;
  linkedId: String;
  email: String;
  firstName: String;
  familyName: String;
  displayName: String;
  username: String;
  administrator: boolean;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === UserProfile.cName;
  }

  constructor() {
    this['@class'] = UserProfile.cName;
  }
}
