import { CategoryClass } from '../Category/categoryModel';

export class NotesClass {
  id: number ;
  title: string;
  date: Date;
  content: string;
  categorie: CategoryClass;
}
