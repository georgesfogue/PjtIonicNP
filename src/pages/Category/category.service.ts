import {Injectable} from "@angular/core";
import { Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx'; //Reactive extensions for JavaScript
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CategoryService {
    static get parameters() {
        return [[Http]];
    }
    private  baseUrl = 'http://localhost/notepad/web/notepad/api/';
 
	constructor(private http:Http) {}

    getCategory(){

        return this.http.get(this.baseUrl + 'Categories')
        .map((res:Response) => res.json());
    }

    postCats(category: string):Observable<any> {
    var body = JSON.stringify({"categorie": category}
    );
    return this.http.post(this.baseUrl+'categorie_post', body, {})
      .map((res: Response) => res.json());
  }

}