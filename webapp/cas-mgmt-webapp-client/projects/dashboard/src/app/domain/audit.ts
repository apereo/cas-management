export class AuditLog {
  principal: string;
  resourcesOperatedUpon: string;
  actionPerformed: string;
  whenActionWasPerformed: Date;
  clientIpAddress: string;
}
