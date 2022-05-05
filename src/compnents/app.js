import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import '../css/app.css';
import RecipeEdit from './RecipeEdit';

export const RecipeContext=React.createContext()

const LOCAL_STOREAGE_KEY = 'cooking.recipes';

function App() {
  
  const [selectedRecipeId,setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  const selectedRecipe=recipes.find(recipe=>recipe.id===selectedRecipeId)

  const recipeContextValue={
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange

  }


  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STOREAGE_KEY)
    if (recipeJSON != null) {
      setRecipes(JSON.parse(recipeJSON))
    }
  }, [])


  useEffect(() => {
    localStorage.setItem(LOCAL_STOREAGE_KEY, JSON.stringify(recipes))
  })


function handleRecipeSelect(id){
  setSelectedRecipeId(id)
}

  function handleRecipeAdd() {
    const newRecipe = {
      id: Date.now.toString(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        {
          id: Date.now.toString(),
          name: '',
          amount: ''
        }
      ]
    }
    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeDelete(id) {
    if(selectedRecipeId != null && selectedRecipeId === id){
      setSelectedRecipeId(undefined)
  }
    setRecipes(recipes.filter(recipe => recipe.id !== id))

  }

  function handleRecipeChange(id,recipe){
    const newRecipes=[...recipes]
    const index = newRecipes.findIndex(r=>r.id===id)
    newRecipes[index]=recipe
    setRecipes(newRecipes)
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes}  />
      {selectedRecipe && <RecipeEdit  recipe={selectedRecipe}/>}
      </RecipeContext.Provider>
  )

}



const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '01:45',
    instructions: "1.Put Salt On Chicken\n2.Put Chicken In Oven\n3.Eat Chicken",
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 kg'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 Spoons'
      }

    ]
  },

  {
    id: 2,
    name: 'Spaggeti',
    servings: 5,
    cookTime: '00:45',
    instructions: "1.Put Tomato\n2.Put In Oven\n3.Eat",
    ingredients: [
      {
        id: 1,
        name: 'Spaggeti',
        amount: '1 kg'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '2 Spoons'
      }

    ]
  }
]
export default App;
