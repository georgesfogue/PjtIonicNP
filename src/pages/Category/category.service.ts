import {Injectable} from "@angular/core";
import { Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx'; //Reactive extensions for JavaScript
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CategoryClass } from  './categoryModel';

@Injectable()
export class CategoryService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    private  baseUrl = 'http://localhost/notepad/web/notepad/api';  // URL to web api
 
	constructor(private http:Http) {}

    getCategory(): Observable<CategoryClass[]> {
        const url = `${this.baseUrl}/Categories`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

    postCats(category: CategoryClass):Observable<CategoryClass> {
        const url = `${this.baseUrl}/categorie_post`;
        return this.http.post(url, JSON.stringify(category), {})
        .map(this.extractData)
        .catch(this.handleError);
    }

    delcategory(id: number): Promise<void> {
        const url = `${this.baseUrl}/Categories_del/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }
    updatecategory(category: CategoryClass): Observable<CategoryClass>{
        const url = `${this.baseUrl}/categorie_put/${category.id}`;
        return this.http.put(url, JSON.stringify(category), {})
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