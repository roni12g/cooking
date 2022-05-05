import React from 'react'

export default function RecipeIngredient(props) {
    const {
        ingredient,
        handleIngredientChange,
        handleIngredientDelete

    }=props

    function handleChange(changes) {
        handleIngredientChange(ingredient.id, { ...ingredient, ...changes })
    }
    return (
        <>
            <input onChange={(e)=>handleChange({name:e.target.value})} value={ingredient.name} className='recipe-edit__label' type="text" />
            <input onChange={(e)=>handleChange({amount:e.target.value})} value={ingredient.amount} className='recipe-edit__label' type="text" />
            <button onClick={()=>handleIngredientDelete(ingredient.id)}className='btn btn--danger' input> &times; </button>

        </>
    )
}
