import {Component, OnInit, ViewChild} from '@angular/core';
import {ImportService} from './import.service';
import {Router} from '@angular/router';
import {EditorComponent} from '@app/project-share';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html'
})
export class ImportComponent implements OnInit {

  file: string;

  @ViewChild(EditorComponent, { static: true })
  editor: EditorComponent;

  constructor(public service: ImportService,
              public router: Router) {

  }

  ngOnInit() {
  }

  save() {
    this.service.import(this.editor.getFile())
      .subscribe(
        () => this.router.navigate(['importService']),
        () => alert('The system was not able to parse your imported service as a valid Registered Service.')
      );
  }

  getFile(evt: Event) {
    const input: HTMLInputElement = evt.currentTarget as HTMLInputElement;
    const reader = new FileReader();
    reader.onload = (function(fe: ImportComponent) {
      return function (e: Event) {
        fe.file = <string> reader.result;
      };
    })(this);
    reader.readAsText(input.files[0]);
  }
}
