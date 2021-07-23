import { async } from "regenerator-runtime"
import { API_URL } from "./config"
import { getJSON } from './views/helpers.js'
import recipeView from "./views/recipeView"

export const state ={

    recipe:{},
    search:{
        query: '',
        results: [],
    }

}

export const loadRecipe = async function(id){
    try{

        const data = await getJSON(`${API_URL}${id}`)
        const {recipe} = data.data
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.sourceUrl,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        }
        console.log(data)
        console.log(state.recipe)
    recipeView.render(state.recipe)
    }catch(err){
        console.error(err)
    }
}
export const loadSearchResults = async function(query){
try{
    state.search.query = query 
    const data = await getJSON(`${API_URL}?search=${query}`)

    state.search.results = data.data.recipes.map(rec => {
        return{
            id: rec.id,
            title: rec.title,
            publisher: rec.publisher,
            image: rec.image_url,
        }

    })
}catch(err){
    console.error(`${err} XP XP XP`)
    throw err
}
}

export const getSearchResultsPage = function (page){
    const start = (page -1) * 10
    const end = page * 10
    
    return state.search.results.slice(start,end)
}