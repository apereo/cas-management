/**
 * Created by tsschmi on 3/8/17.
 */
export class Commit {
  id: string;
  text: string;
  commitTime: string;

  constructor(id: string, text: string, commitTime: string) {
    this.id = id;
    this.text = text;
    this.commitTime = commitTime;
  }
}
