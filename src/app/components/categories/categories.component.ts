import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Category } from 'src/app/models/enums/category';;
import { SetCategory } from 'src/app/store/game.actions';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  category = Category;
  
  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  onCategoryClick(category: Category) {
    this.store.dispatch(new SetCategory(category));
  }
}
