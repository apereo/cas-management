import {Component, OnInit, ViewChild} from '@angular/core';
import {ImportService} from './import.service';
import {Router} from '@angular/router';
import {EditorComponent} from '@app/project-share';
import {SpinnerService} from 'mgmt-lib';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html'
})
export class ImportComponent implements OnInit {

  file: string;

  @ViewChild(EditorComponent)
  editor: EditorComponent;

  constructor(public service: ImportService,
              public router: Router,
              public spinner: SpinnerService) {

  }

  ngOnInit() {
  }

  save() {
    this.spinner.start('Loading file');
    this.service.import(this.editor.getFile())
      .pipe(finalize(() => this.spinner.stop()))
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
