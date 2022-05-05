import React, { useContext } from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import { RecipeContext } from './app'

export default function RecipeEdit ({ recipe }) {
    const { handleRecipeChange,handleRecipeSelect } = useContext(RecipeContext)
    
    function handleChange(changes) {
        handleRecipeChange(recipe.id, { ...recipe, ...changes })
    }

    function handleIngredientChange(id,ingredient){
        const newIngredients=[...recipe.ingredients]
        const index = newIngredients.findIndex(i=>i.id===id)
        newIngredients[index]=ingredient
        handleChange({ingredients:newIngredients})
    }

    function handleIngredientAdd(){
        const newIngredient={
            id:Date.now.toString(),
            name:"",
            amount:""
        }
        handleChange({ingredients:[...recipe.ingredients,newIngredient]})
    }

    function handleIngredientDelete(id){
      
        handleChange({ingredients: recipe.ingredients.filter(i=>i.id!==id)})
    }

    return (
        <div className='recipe-edit'>
            <div className='recipe-edit__remove-button-container'>
                <button onClick={()=>handleRecipeSelect(undefined)} className='btn recipe-edit__remove-button'>&times;</button>
            </div>
            <div className='recipe-edit__ditails-grid'>
                <label className='recipe-edit__label' htmlFor="name">Name</label>
                <input onChange={e=>handleChange({name: e.target.value})} value={recipe.name} className='recipe-edit__input' type="text" name="name" id="name" />
                <label className='recipe-edit__label' htmlFor="CookTime">Cook Time</label>
                <input onChange={e=>handleChange({cookTime: e.target.value})} value={recipe.cookTime} className='recipe-edit__input' type="text" name="CookTime" id="CookTime" />
                <label className='recipe-edit__label' htmlFor="servings">Servings</label>
                <input onChange={e=>handleChange({servings: parseInt(e.target.value) || ''})} value={recipe.servings} className='recipe-edit__input' type="number" min="1" name="servings" id="servings" />
                <label className='recipe-edit__label' htmlFor="instructions">Instructions</label>
                <textarea onChange={e=>handleChange({instructions: e.target.value})} value={recipe.instructions} className='recipe-edit__input' name="instructions" id="instructions" />
            </div>
            <br />
            <label className='recipe-edit__label' >Ingredients</label>
            <div className='recipe-edit__ingredient-grid'>
                <div>Name</div>
                <div>Amount</div>
                <div></div>
                {recipe.ingredients.map(ingredient => (
                    <RecipeIngredientEdit 
                    key={ingredient.id}
                    handleIngredientChange={handleIngredientChange}
                    ingredient={ingredient}
                    handleIngredientDelete={handleIngredientDelete}
                    />
                ))}

            </div>
            <div className='recipe-edit__add-ingredient-btn-container'>
                <button onClick={()=>handleIngredientAdd()}className='btn btn--primary'>Add Ingredient</button>
            </div>

        </div>
    )
}
