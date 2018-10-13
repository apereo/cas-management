/**
 * Created by tsschmi on 3/8/17.
 */
export class Commit {
  id: String;
  text: String;
  commitTime: String;

  constructor(id: String, text: String, commitTime: String) {
    this.id = id;
    this.text = text;
    this.commitTime = commitTime;
  }
}
