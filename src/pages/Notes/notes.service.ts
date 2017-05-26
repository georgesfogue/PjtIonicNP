import {Injectable} from "@angular/core";
import { Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx'; //Reactive extensions for JavaScript
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { NotesClass } from  './notesModel';

@Injectable()
export class NotesService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private  baseUrl = 'http://localhost/notepad/web/notepad/api';  // URL to web api
    constructor(private http:Http) {}

    getNotes(): Observable<NotesClass[]> { 
        const url = `${this.baseUrl}/notes`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

    newNote(note: NotesClass): Observable<NotesClass>{
    //const cat_id = note.categorie.id;
    const url = this.baseUrl + '/notes_post';
    return this.http.post(url, JSON.stringify(note), {})
    .map(this.extractData)
    .catch(this.handleError);
  }
  delNote(id: number): Promise<void> {
      const url = `${this.baseUrl}/notes_del/${id}`;
      return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    updatenote(note: NotesClass): Observable<NotesClass>{
        const url = `${this.baseUrl}/notes_put/${note.id}`;
        return this.http.put(url, JSON.stringify(note), {})
        .map(this.extractData)
        .catch(this.handleError);
    }
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}