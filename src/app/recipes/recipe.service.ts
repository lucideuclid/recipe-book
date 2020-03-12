import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Dal Makhani',
      'Delicious buttery lentil curry',
      'https://live.staticflickr.com/4872/32124200398_b54bea5c69_b.jpg',
      [
        new Ingredient('Black  Gram', 2),
        new Ingredient('Butter', 1)
      ]),
    new Recipe('Aloo Paratha',
      'Flatbread with potato stuffing',
      'https://upload.wikimedia.org/wikipedia/commons/0/08/Aloo_paratha.jpg',
      [
        new Ingredient('Potato', 4),
        new Ingredient('Atta', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice(); // copy of recipes list
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes);
  }


}
