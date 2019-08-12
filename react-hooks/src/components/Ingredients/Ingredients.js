import React, { useReducer, useCallback, useMemo } from 'react';

// Components
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientsReducer = (curIngredients, action) => {
  switch (action.type) {
    case 'SET_INGREDIENT':
      return action.ingredients;
    case 'ADD_INGREDIENT':
      return [...curIngredients, action.ingredient];
    case 'DELETE_INGREDIENT':
      return curIngredients.filter(
        ingredient => ingredient.id !== action.ingredientId,
      );
    default:
      throw new Error('Should not get there!');
  }
};

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null, data: null };
    case 'RESPONSE':
      return { ...curHttpState, loading: false, data: action.responseData };
    case 'ERROR':
      return { loading: false, error: action.errorData };
    case 'CLEAR':
      return { ...curHttpState, error: null };
    default:
      throw new Error('Should not get there!');
  }
};

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientsReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });
  // const [userIngredients, setUserIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const addIngredientHandler = useCallback(ingredient => {
    dispatchHttp({ type: 'SEND' });
    // setIsLoading(true)

    fetch('https://react-hooks-update-1c9f8.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        // setIsLoading(false);
        dispatchHttp({ type: 'RESPONSE' });

        return response.json();
      })
      .then(responseData => {
        dispatch({
          type: 'ADD_INGREDIENT',
          ingredient: { id: responseData.name, ...ingredient },
        });
        // setUserIngredients(prevIngredients => [
        //   ...prevIngredients,
        //   { id: responseData.name, ...ingredient },
        // ]);
      });
  }, []);

  const removedIngredientHandler = useCallback(ingredientId => {
    // setIsLoading(true);
    dispatchHttp({ type: 'SEND' });
    fetch(
      `https://react-hooks-update-1c9f8.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: 'DELETE',
      },
    )
      .then(response => {
        dispatchHttp({ type: 'RESPONSE' });
        dispatch({ type: 'DELETE_INGREDIENT', ingredientId });

        // setIsLoading(false);
        // setUserIngredients(prevIngredients =>
        //   prevIngredients.filter(ingredient => ingredient.id !== ingredientId),
        // );
      })
      .catch(error => {
        dispatchHttp({ type: 'ERROR', errorData: error.message });
        // setIsLoading(false);
        // setError(error.message);
      });
  }, []);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({ type: 'SET_INGREDIENT', ingredients: filteredIngredients });
    // setUserIngredients(filteredIngredients);
  }, []);

  const clearErrorHandler = useCallback(() => {
    // setError(null);
    dispatchHttp({ type: 'CLEAR' });
  }, []);

  const ingredientList = useMemo(
    () => (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removedIngredientHandler}
      />
    ),
    [userIngredients, removedIngredientHandler],
  );

  return (
    <div className="App">
      {httpState.error ? (
        <ErrorModal onClose={clearErrorHandler}>{httpState.error}</ErrorModal>
      ) : null}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
