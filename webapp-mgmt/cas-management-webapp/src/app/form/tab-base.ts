import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Data} from './data';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-tab-base',
  template: `'<div></div>'`
})

export class TabBaseComponent implements OnInit, OnDestroy {

  @ViewChild('submit')
  submit: ElementRef;

  sub: Subscription;

  constructor(public data: Data,
              public changeRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (this.submit) {
      if (this.data.submitted) {
          this.submit.nativeElement.click();
      }
      this.sub = this.data.save.asObservable().subscribe(() => {
          this.submit.nativeElement.click();
      });
      this.changeRef.detectChanges();
    }
  }

  ngOnDestroy() {
    if (this.sub) {
        this.sub.unsubscribe();
    }
  }

}
