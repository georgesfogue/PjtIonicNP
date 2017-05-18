import {Injectable} from "@angular/core";
import { Http, Response} from '@angular/http';
//import {Observable} from 'rxjs/Rx'; //Reactive extensions for JavaScript
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NotesClass } from  './notesModel';

@Injectable()
export class NotesService {
    static get parameters() {
        return [[Http]];
    }
    private  baseUrl = 'http://localhost/notepad/web/notepad/api/';
    private _notes: BehaviorSubject<NotesClass[]>;
    private savedata: {notes: NotesClass[]};
	constructor(private http:Http) {}

    getnotes(){
        return this.http.get(this.baseUrl + 'notes')
        .map((res:Response) => res.json());
    }

    newNote(title: string, content: string, category: string) {
        var body = JSON.stringify(
            {
                "title": title,
                "content": content,
                "categorie": category
            }
        );
        console.log(body);
        const url = this.baseUrl + 'notes_post';
        return this.http.post(url, body, {})
        .map((res: Response) => res.json());
  }

  deleteNote(id: number) {
    const url = this.baseUrl + 'notes_del/' + id;
    return this.http.delete(url, {})
      .map((res: Response) => res.json());
  }

  DelNote(noteId: number){
    this.http.delete(`${this.baseUrl}notes_del/${noteId}`).subscribe(response => {
      this.savedata.notes.forEach((t, i) => {
        if (t.idn === noteId) { this.savedata.notes.splice(i, 1); }
      });

      this._notes.next(Object.assign({}, this.savedata).notes);
    }, error => console.log('La note ne peut pas etre supprimer.'));
  }

}