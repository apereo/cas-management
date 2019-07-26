export class UserProfile {
  static cName = 'org.apereo.cas.mgmt.domains.MgmtUserProfile';

  id: string;
  permissions: string[];
  email: string;
  firstName: string;
  familyName: string;
  username: string;
  phone: string;
  department: string;
  administrator: boolean;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === UserProfile.cName;
  }

  constructor() {
    this['@class'] = UserProfile.cName;
  }
}
