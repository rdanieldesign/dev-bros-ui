import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IEntry, IEntryMap, INewEntry } from './interfaces/entry.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllEntries(): Observable<IEntry[]> {
    return this.httpClient.get<IEntryMap>(`${environment.apiDomain}/api/all-entries`)
      .pipe(map((entryMap: IEntryMap): IEntry[] => {
        return Object.keys(entryMap).map((key: string) => ({ id: key, ...entryMap[key] }))
      }));
  }

  getEntry(entryId: string): Observable<IEntry> {
    return this.httpClient.get<IEntry>(`${environment.apiDomain}/api/entry/${entryId}`)
  }

  createEntry(newEntry: INewEntry): Observable<string> {
    return this.httpClient.post<string>(`${environment.apiDomain}/api/new-entry`, newEntry);
  }

  deleteEntry(entryId: string): Observable<null> {
    return this.httpClient.delete<null>(`${environment.apiDomain}/api/entry/${entryId}`)
  }

}
