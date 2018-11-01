import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/internal/Subscription';
import {DataRecord} from 'mgmt-lib';

@Component({
  selector: 'app-tab-base',
  template: `'<div></div>'`
})

export class TabBaseComponent implements OnInit, OnDestroy {

  @ViewChild('submit')
  submit: ElementRef;

  sub: Subscription;

  constructor(public data: DataRecord,
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
