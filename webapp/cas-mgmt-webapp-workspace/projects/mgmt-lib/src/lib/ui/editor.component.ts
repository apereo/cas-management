import {Input, Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Ace} from 'ace-builds';
import Editor = Ace.Editor;
import { MatDialog } from '@angular/material/dialog';
import {EditorOptionsComponent} from './editor-options/editor-options.component';

declare var ace: any;

/**
 * Component for displaying files in the ACE editor.
 *
 * @author Travis Schmidt
 */
@Component({
    selector: 'lib-editor',
    template: `
         <div id="editor" style="width:100%;height:100%;"></div>
    `
})

export class EditorComponent implements OnInit {
  @Input()
  mode = 'text';

  @Input()
  theme = 'default';

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

  /**
   * Initializes the component and sets the editor up wih inputted config.
   */
  ngOnInit() {
    ace.config.set('basePath', 'assets');
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
    (this.editor as any).$blockScrolling = Infinity;
  }

  @Input()
  set file(file: string) {
    console.log(file);
    if (this.editor) {
      this.editor.setValue(file ? file : '');
      setTimeout(() => this.editor.setValue(file));
      // this.editor.once('change', () => this.changed.emit());
    }
    setTimeout(() => {
      this.editor.focus();
      this.editor.navigateTo(0, 0);
    }, 100);
  }

  /**
   * Returns the edited file as string.
   */
  public getFile() {
    return this.editor.getValue();
  }

  /**
   * Forces resize of the editor if the screen is resized by the user.
   *
   * @param evt - Resize event
   */
  onResize(evt: Event) {
    setTimeout(() => {
        this.editor.resize(true);
    }, 10);
  }

  /**
   * Accessible function to force a resize of the editor.
   */
  public resize() {
    this.editor.resize(true);
  }

  /**
   * Destroys the editor.
   */
  destroy() {
    this.editor.destroy();
  }

  /**
   * Opens the EditorOptionsComponent in a dialog to allow user to modify editor options.
   */
  showOptions() {
    this.dialog.open(EditorOptionsComponent, {
      data: {
        theme: this.userTheme,
        keybinding: this.userKey,
        fontSize: this.userFontSize
      },
      position: {top: '100px'}
    }).afterClosed().subscribe(options => this.setOptions(options));
  }

  /**
   * Sets the edited options by the user into the ACE editor.
   *
   * @param options - editor options
   */
  private setOptions(options: any) {
    if (options.theme) {
      this.editor.setTheme('ace/theme/' + options.theme);
      this.userTheme = options.theme;
      localStorage.setItem('editor-theme', options.theme);
    }
    if (options.keybinding) {
      this.setKeybinding(options.keybinding);
      this.userKey = options.keybinding;
      localStorage.setItem('editor-keybinding', options.keybinding);
    }
    if (options.fontSize) {
      this.editor.setFontSize(options.fontSize);
      this.userFontSize = options.fontSize;
      localStorage.setItem('editor-fontSize', options.fontSize);
    }
  }

  /**
   * Sets the key bindings to use for the ACE editor.
   *
   * @param key - key of the bindings to use
   */
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
