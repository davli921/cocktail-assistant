import React, { useEffect, useState } from 'react';
import './CocktailList.css';

const CocktailList = () => {
  let shoppingItem = [];

  const [cocktailName, setCocktailName] = useState('margarita');
  const [userInput, setUserInput] = useState('margarita');
  const [shoppingList, setShoppingList] = useState([shoppingItem]);
  const [cocktailData, setCocktailData] = useState([]);

  function displayToasterMessage(toastIdNumber) {
    console.log(toastIdNumber);
    let toastId = '';
    switch (toastIdNumber) {
      case 1:
        toastId = 'toaster-search';
        break;
      case 2:
        toastId = 'toaster-results';
        break;
      case 3:
        toastId = 'toaster-no-results';
        break;
      case 4:
        toastId = 'toaster-add-ingredients';
        break;
      case 5:
        toastId = 'toaster-remove-duplicates';
        break;
      default:
        toastId = 'toaster-search';
    }

    var x = document.getElementById(toastId);

    x.className = 'toaster-show';

    setTimeout(function () {
      x.className = x.className.replace('toaster-show', 'toaster');
    }, 3000);
  }

  const addToShoppingList = async (cocktailId) => {
    const cocktailDetailsUrl =
      'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + cocktailId;

    const response = await fetch(cocktailDetailsUrl);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const cocktailDetails = await response.json();

    const cocktail = cocktailDetails.drinks[0];

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
          displayToasterMessage(5);
        } else {
          displayToasterMessage(4);
          ingredients.push(ingredient);
        }
      }
    }

    const newShoppingList = [...shoppingList, ...ingredients];

    setShoppingList(newShoppingList);
  };

  const printShoppingList = () => {
    var prtContent = document.getElementById('print-shopping-list');
    var WinPrint = window.open(
      '',
      '',
      'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0'
    );
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  };

  const fetchCocktails = async (cocktailName) => {
    displayToasterMessage(1);

    const url =
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' +
      cocktailName;
    const response = await fetch(url);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    } else {
      const json = await response.json();

      if (json.drinks != null) {
        displayToasterMessage(2);
        setCocktailData(json.drinks);
      } else {
        displayToasterMessage(3);
      }
    }
  };

  useEffect(() => {
    fetchCocktails(cocktailName);
  }, [cocktailName]);

  return (
    <>
      <div className="search">
        <input
          className="search-bar"
          type="text"
          size="20"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          className="search-button"
          onClick={(e) => setCocktailName(userInput)}
        >
          Search
        </button>
      </div>

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
          <div id="print-shopping-list">
            {shoppingList.map((shoppingItem) => (
              <div key={shoppingItem} className="shopping-item">
                <p>{shoppingItem}</p>
              </div>
            ))}
          </div>
          <button className="print-button" onClick={(e) => printShoppingList()}>
            Print
          </button>
        </div>

        <div className="toast-group">
          <div
            className="toaster"
            id="toaster-search"
            style={{ backgroundColor: 'blue' }}
          >
            Searching...
          </div>
          <div
            className="toaster"
            id="toaster-results"
            style={{ backgroundColor: 'green' }}
          >
            Here are the results.
          </div>
          <div
            className="toaster"
            id="toaster-no-results"
            style={{ backgroundColor: 'red' }}
          >
            No results found.
          </div>
          <div
            className="toaster"
            id="toaster-add-ingredients"
            style={{ backgroundColor: 'green' }}
          >
            Ingredients added to shopping list.
          </div>
          <div
            className="toaster"
            id="toaster-remove-duplicates"
            style={{ backgroundColor: 'black' }}
          >
            Duplicated ingredient removed from shopping list.
          </div>
        </div>
      </div>
    </>
  );
};

export default CocktailList;
