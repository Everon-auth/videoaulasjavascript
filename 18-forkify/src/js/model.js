import { async } from "regenerator-runtime"
import { API_URL } from "./config"
import { getJSON } from './views/helpers.js'
export const state ={

    recipe:{}

}

export const loadRecipe = async function(id){
    try{

        const data = await getJSON(`${API_URL}/${id}`)
        console.log(data)
    const {recipes} = data.data
    state.recipes = {
      id: recipes.id,
      title: recipes.title,
      publisher: recipes.publisher,
      sourceUrl: recipes.sourceUrl,
      image: recipes.image_url,
      servings: recipes.servings,
      cookingTime: recipes.cooking_Time,
      ingredients: recipes.ingredients,
    }
    console.log(state.recipes)
    }catch(err){
        console.Error(err)
    }
}
