import {Input, Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Ace} from 'ace-builds';
import Editor = Ace.Editor;
import {MatDialog} from '@angular/material';
import {EditorOptionsComponent} from './editor-options/editor-options.component';

declare var ace: any;

@Component({
    selector: 'app-editor',
    template: `
         <div id="editor" style="width:100%;height:100%;"></div>
    `
})

export class EditorComponent implements OnInit {
  @Input()
  mode: string = 'text';

  @Input()
  theme: string = 'default';

  @Output()
  changed: EventEmitter<void> = new EventEmitter<void>();

  editor: Editor;

  vim = ace.require('ace/keyboard/vim').handler;
  emacs = ace.require('ace/keyboard/emacs').handler;

  userTheme: string;
  userKey: string;
  userFontSize: string;

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
    this.editor = ace.edit('editor');
    this.editor.getSession().setUseWrapMode(true);
    this.editor.setPrintMarginColumn(180);
    const EditorMode = ace.require('ace/mode/' + this.mode).Mode;
    this.editor.session.setMode(new EditorMode());
    this.userTheme = localStorage.getItem('editor-theme') || this.theme || 'eclipse';
    this.userKey = localStorage.getItem('editor-keybinding') || 'default';
    this.editor.setTheme('ace/theme/' + this.userTheme);
    this.setKeybinding(this.userKey);
    this.userFontSize = localStorage.getItem('editor-fontSize') || '15px';
    this.editor.setFontSize(this.userFontSize);
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

  showOptions() {
    const dialogRef = this.dialog.open(EditorOptionsComponent, {
      data: {
        theme: this.userTheme,
        keybinding: this.userKey,
        fontSize: this.userFontSize
      },
      position: {top: '100px'}
    });
    dialogRef.afterClosed().subscribe(val => {
      if (val.theme) {
        this.editor.setTheme('ace/theme/' + val.theme);
        this.userTheme = val.theme;
        localStorage.setItem('editor-theme', val.theme);
      }
      if (val.keybinding) {
        this.setKeybinding(val.keybinding);
        this.userKey = val.keybinding;
        localStorage.setItem('editor-keybinding', val.keybinding);
      }
      if (val.fontSize) {
        this.editor.setFontSize(val.fontSize);
        this.userFontSize = val.fontSize;
        localStorage.setItem('editor-fontSize', val.fontSize);
      }
    });
  }

  setKeybinding(key: string) {
    if (key === 'keybinding-vim') {
      this.editor.setKeyboardHandler(this.vim);
    } else if (key === 'keybinding-emacs') {
      this.editor.setKeyboardHandler(this.emacs);
    } else {
      this.editor.setKeyboardHandler(null);
    }
  }
}
