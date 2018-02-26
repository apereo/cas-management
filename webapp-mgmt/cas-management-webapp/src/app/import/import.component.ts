import {Component, OnInit, ViewChild} from '@angular/core';
import {Messages} from '../messages';
import {ImportService} from './import.service';
import {Router} from '@angular/router';
import {EditorComponent} from '../editor.component';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  file: String;

  @ViewChild(EditorComponent)
  editor: EditorComponent;

  constructor(public messages: Messages,
              public service: ImportService,
              public router: Router) {

  }

  ngOnInit() {
  }

  save() {
    this.service.import(this.editor.getFile()).then(resp => {
      this.router.navigate(['importService']);
    }).catch(e => alert('The system was not able to parse your imported service as a valid Registered Service.'));
  }

  getFile(evt: Event) {
    let input: HTMLInputElement = evt.srcElement as HTMLInputElement;
    var reader = new FileReader();
    reader.onload = (function(fe:ImportComponent) {
      return function (e:Event) {
        fe.file = <String> reader.result;
      };
    })(this);
    reader.readAsText(input.files[0]);
  }
}
