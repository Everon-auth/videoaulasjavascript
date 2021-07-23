///////////////////////////////////////
/////// Necessário este import que corrige um erro do Parcel e deixa erxecutar async/await
import 'regenerator-runtime/runtime'
import 'core-js/stable'
import'regenerator-runtime/runtime'


import * as model from './model.js'
import recipeView from './views/recipeView'


const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

///////////////////////////////////////
//npm install -g parcel-bundler

const controlRecipes = async function(){
  try{

    const id = window.location.hash.slice(1)
    console.log(id)

    if(!id) return
    recipeView.renderSpinner()
    
    // 1) Carregando as receitas
    
    await model.loadRecipe(id)
    const {recipe} = model.state
    
    // 2) Renderizando as receitas

    recipeView.render(model.state.recipe)

    
  }catch(err){
    recipeView.renderError(`${err} xp xp xp`)
  }
};

const init = function(){
  recipeView.addHandlerRender(controlRecipes())
}
init()

// video 285, min 7