/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {Metadata} from 'domain-lib';
import {MetadataService} from '@app/registry/metadata/metadata.service';

@Injectable({
  providedIn: 'root'
})
export class MetadataResolver implements Resolve<Metadata> {

  constructor(private metaDataService: MetadataService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Metadata> | Metadata {
    const param: string = route.params.id;

    if (!param) {
      return null;
    } else {
        return this.metaDataService.getMetadata(param);
    }
  }
}
