///////////////////////////////////////
/////// Necessário este import que corrige um erro do Parcel e deixa erxecutar async/await
import 'regenerator-runtime/runtime'
import 'core-js/stable'
import'regenerator-runtime/runtime'


import * as model from './model.js'
import recipeView from './views/recipeView'
import { async } from 'regenerator-runtime/runtime'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'





if(module.hot){
  module.hot.accept()
}



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

///////////////////////////////////////
//npm install -g parcel-bundler

const controlRecipes = async function(){
  try{

    const id = window.location.hash.slice(1)

    if(!id) return
    recipeView.renderSpinner()
    
    // 1) Carregando as receitas
    
    await model.loadRecipe(id)
    const {recipe} = model.state
    
    // 2) Renderizando as receitas

    recipeView.render(recipe)

    
  }catch(err){
    recipeView.renderError()
  }
};

const controlSearchResults = async function (){
  try{

    resultsView.renderSpinner()
    const query = searchView.getQuery();
    if(!query) return;

    await model.loadSearchResults(query)
    
    resultsView.render(model.state.search.results)

  }catch(err){
    console.error(err)
  }
}

const init = function(){
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(controlSearchResults)
}
init()