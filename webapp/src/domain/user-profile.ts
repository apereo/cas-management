export class UserProfile {
  static cName = 'org.apereo.cas.mgmt.domains.MgmtUserProfile';

  id: String;
  permissions: String[];
  email: String;
  firstName: String;
  familyName: String;
  username: String;
  phone: String;
  department: String;
  administrator: boolean;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === UserProfile.cName;
  }

  constructor() {
    this['@class'] = UserProfile.cName;
  }
}
