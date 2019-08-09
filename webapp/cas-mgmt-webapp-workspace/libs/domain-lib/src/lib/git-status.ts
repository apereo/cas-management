export class GitStatus {
  hasChanges: boolean;
  added: string[];
  modified: string[];
  deleted: string[];
  unpublished: boolean;
  submissions: number;
  pullRequests: number;
}
