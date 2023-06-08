import React, { useCallback, useEffect, useState } from 'react';
import './CocktailList.css';

const CocktailList = () => {
  const cocktailName = 'margarita';

  let shoppingItem = ['vodka'];

  const [shoppingList, setShoppingList] = useState([shoppingItem]);

  const addToShoppingList = async (cocktailId) => {
    console.log(cocktailId);

    const cocktailDetailsUrl =
      'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + cocktailId;

    const response = await fetch(cocktailDetailsUrl);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const cocktailDetails = await response.json();
    console.log(cocktailDetails);

    const cocktail = cocktailDetails.drinks[0];
    console.log(cocktail);

    const ingredientsList = [
      cocktail.strIngredient1,
      cocktail.strIngredient2,
      cocktail.strIngredient3,
      cocktail.strIngredient4,
      cocktail.strIngredient5,
      cocktail.strIngredient6,
      cocktail.strIngredient7,
      cocktail.strIngredient8,
      cocktail.strIngredient9,
      cocktail.strIngredient10,
      cocktail.strIngredient11,
      cocktail.strIngredient12,
      cocktail.strIngredient13,
      cocktail.strIngredient14,
      cocktail.strIngredient15,
    ];

    let ingredients = [];

    for (const ingredient of ingredientsList) {
      if (ingredient != null) {
        if (shoppingList.includes(ingredient)) {
          console.log('Duplicate REMOVED!');
        } else {
          console.log('Ingridient added');
          ingredients.push(ingredient);
        }
      }
    }

    console.log(ingredients);

    const newShoppingList = [...shoppingList, ...ingredients];
    console.log(newShoppingList);

    setShoppingList(newShoppingList);
  };

  const [cocktailData, setCocktailData] = useState([]);
  const [loading, setLoading] = useState(false);

  const url =
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + cocktailName;

  const fetchCocktails = useCallback(async () => {
    setLoading(true);

    const response = await fetch(url);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const json = await response.json();

    setCocktailData(json.drinks);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCocktails();
  }, [fetchCocktails]);

  if (loading) {
    return <></>; // Loading...
  }
  return (
    <div className="container">
      <div className="cocktail-list">
        {cocktailData.map((cocktail) => (
          <div key={cocktail.idDrink} className="drink-container">
            <img
              className="drink-img"
              width={250}
              height={250}
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
            />

            <div className="drink-details">
              <h2 className="drink-name">{cocktail.strDrink}</h2>

              <p className="drink-instructions">{cocktail.strInstructions}</p>

              <div className="ingredients-list">
                <div className="ingredients-name">
                  <p>{cocktail.strIngredient1}</p>
                </div>

                <div className="ingredients-name">
                  <p>{cocktail.strIngredient2}</p>
                </div>

                <div className="ingredients-name">
                  <p>{cocktail.strIngredient3}</p>
                </div>

                <div className="ingredients-name">
                  <p>{cocktail.strIngredient4}</p>
                </div>

                <div className="ingredients-name">
                  <p>{cocktail.strIngredient5}</p>
                </div>

                <div className="ingredients-name">
                  <p>{cocktail.strIngredient6}</p>
                </div>

                <div className="ingredients-name">
                  <p>{cocktail.strIngredient7}</p>
                </div>

                <div className="ingredients-name">
                  <p>{cocktail.strIngredient8}</p>
                </div>

                <div className="ingredients-name">
                  <p>{cocktail.strIngredient9}</p>
                </div>

                <div className="ingredients-name">
                  <p>{cocktail.strIngredient10}</p>
                </div>

                <div className="ingredients-name">
                  <p>{cocktail.strIngredient11}</p>
                </div>

                <div className="ingredients-name">
                  <p>{cocktail.strIngredient12}</p>
                </div>

                <div className="ingredients-name">
                  <p>{cocktail.strIngredient13}</p>
                </div>

                <div className="ingredients-name">
                  <p>{cocktail.strIngredient14}</p>
                </div>

                <div className="ingredients-name">
                  <p>{cocktail.strIngredient15}</p>
                </div>
              </div>
            </div>
            <button
              className="add-drink-button"
              title="Add to shopping list!"
              onClick={(e) => addToShoppingList(cocktail.idDrink)}
            >
              +
            </button>
          </div>
        ))}
      </div>

      <div className="shopping-list">
        {shoppingList.map((shoppingItem) => (
          <div key={shoppingItem}>
            <p>{shoppingItem}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CocktailList;
