import React, { useCallback, useEffect, useState } from 'react';
import './CocktailList.css';

const CocktailList = () => {
  const cocktailName = 'margarita';

  let shoppingItem = {
    name: 'vodka',
  };

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

    const ingredients = [
      { name: cocktail.strIngredient1 },
      { name: cocktail.strIngredient2 },
      { name: cocktail.strIngredient3 },
      { name: cocktail.strIngredient4 },
      { name: cocktail.strIngredient5 },
      { name: cocktail.strIngredient6 },
      { name: cocktail.strIngredient7 },
      { name: cocktail.strIngredient8 },
      { name: cocktail.strIngredient9 },
      { name: cocktail.strIngredient10 },
      { name: cocktail.strIngredient11 },
      { name: cocktail.strIngredient12 },
      { name: cocktail.strIngredient13 },
      { name: cocktail.strIngredient14 },
      { name: cocktail.strIngredient15 },
    ];
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
          <div key={shoppingItem.name}>
            <p>{shoppingItem.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CocktailList;
