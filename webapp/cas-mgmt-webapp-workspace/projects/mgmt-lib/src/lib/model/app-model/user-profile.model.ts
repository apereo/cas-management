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
  displayName: string;
  username: string;
  phone: string;
  department: string;
  administrator: boolean;
  attributes: unknown;
  authenticationAttributes: unknown;
  roles: string[];

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
