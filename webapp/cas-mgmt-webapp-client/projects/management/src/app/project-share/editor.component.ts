import {Input, Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Ace} from 'ace-builds';
import Editor = Ace.Editor;

declare var ace: any;

@Component({
    selector: 'app-editor',
    template: `
         <div id="editor" style="width:100%;height:100%;"></div>
    `
})

export class EditorComponent implements OnInit {
  @Input()
  mode: String = 'text';

  @Input()
  theme: String;

  @Output()
  changed: EventEmitter<void> = new EventEmitter<void>();

  editor: Editor;

  ngOnInit() {
    this.editor = ace.edit('editor');
    this.editor.getSession().setUseWrapMode(true);
    this.editor.setPrintMarginColumn(180);
    const EditorMode = ace.require('ace/mode/' + this.mode).Mode;
    const Vim = ace.require('ace/keyboard/vim');
    this.editor.session.setMode(new EditorMode());
    if (this.theme) {
      this.editor.setTheme('ace/theme/' + this.theme);
    }
    this.editor.setKeyboardHandler(Vim.handler);
    this.editor.setFontSize('14');
    (<any>this.editor).$blockScrolling = Infinity;
  }

  @Input()
  set file(file: String) {
    if (this.editor) {
      this.editor.setValue(file ? file as string : '');
      this.editor.once("change", (event) => {
        this.changed.emit();
      });
    }
    setTimeout(() => {
      this.editor.focus();
      this.editor.navigateTo(0, 0);
    }, 100);
  }


  public getFile() {
    return this.editor.getValue();
  }

  onResize(evt: Event) {
    setTimeout(() => {
        this.editor.resize(true);
    }, 10);
  }

  public resize() {
    this.editor.resize(true);
  }

  destroy() {
    this.editor.destroy();
  }
}
