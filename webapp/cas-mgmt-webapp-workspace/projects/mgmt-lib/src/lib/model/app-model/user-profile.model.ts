/**
 * Data class for UserProfile.
 */
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

  /**
   * Returns true if the passed object is an instance of UserProfile.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === UserProfile.cName;
  }

  constructor() {
    this['@class'] = UserProfile.cName;
  }
}
