export class GitStatus {
  hasChanges: boolean;
  added: String[];
  modified: String[];
  deleted: String[];
  unpublished: boolean;
  submissions: number;
  pullRequests: number;
}
