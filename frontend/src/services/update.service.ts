import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';

const EventSource = NativeEventSource || EventSourcePolyfill;

const BASE_URL = 'http://localhost:8000';

function getToken(): string {
  return 'A token';
}

export function getEvenSource(): any {
  const token = getToken();
  return new EventSourcePolyfill(BASE_URL + '/events', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });
}
@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  eventSource: EventSource;

  private subj = new BehaviorSubject([]);

  constructor() {
    this.eventSource = getEvenSource();
  }

  returnAsObservable(): Observable<any> {
    return this.subj.asObservable();
  }

  getExchangeData(): void {
    let subject = this.subj;
    if (typeof (EventSource) !== undefined) {
      this.eventSource.onmessage = (e): void => {
        subject.next(e.data);
      };
      this.eventSource.onerror = function(): void {
        if (this.readyState === 0) {
          // eslint-disable-next-line no-console
          console.log("Reconnecting…")
            ;
        }
      };
    }
  }

  stopExchangeUpdates() {
    this.eventSource.close();
  }
}
