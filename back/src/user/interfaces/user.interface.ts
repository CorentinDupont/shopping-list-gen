import * as mongoose from 'mongoose';
//import { Item } from '../../item/interfaces/item.interface';
//import { Recipe } from '../../recipe/interfaces/recipe.interface';

export interface User extends mongoose.Document {
    _id? : string;
    username: string;
    password: string;
    access_token? : string;
    // recipeList: Recipe[];
    // itemList: Item[];
}
