import styled from 'styled-components';
import { useEffect, useState } from 'react';

const CocktailDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding: 1rem;
    margin-bottom: 7rem;

    & img {
        width: 100%;
    }
`;

const Informations = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1rem;

    & h1 {
        margin: 1rem 0;
    }

    & p {
        margin: 0.5rem 0;
        
    }
`


export function CocktailDetail({ match }) {

    const id = match.params.id;
    const [cocktail, setCocktail] = useState('');
    const [loadingStatus, setLoadingStatus] = useState('');
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetchCocktail(id);
    }, []);

    const fetchCocktail = async (str) => {
        setLoadingStatus('loading');
        try {
            const data = await fetch(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${str}`);
                if(data.ok){
                    const jsonData = await data.json();
                    setCocktail(jsonData.drinks[0]);
                    setIngredients(getIngredients(jsonData.drinks[0]));
                    setLoadingStatus('success');
                }
            } catch(error) {
                console.log(error);
                setLoadingStatus('failed');
                setCocktail(null);
            }
        }

    const getIngredients = (data) => {
        const cocktailIngredients = [];

        for(let i = 0; i <= 14; i++) {
           const ingredient = data[`strIngredient${i+1}`];

           if(ingredient === null) {
            break;
        }
           const measure = data[`strMeasure${i+1}`];
           const ingredientToPush = `${measure}of ${ingredient}`;

           cocktailIngredients.push(ingredientToPush);
        }
        return cocktailIngredients;
    }

    return(
        <div>
            {loadingStatus === 'failed' ?
            <h4>Something went wrong</h4>

            : <CocktailDetailContainer>
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                <Informations>
                    <h1>{cocktail.strDrink}</h1>
                    <p>Glass: {cocktail.strGlass}</p>
                    <p>{cocktail.strAlcoholic}</p>
                    {ingredients.map((ingredient, index) => 
                    <p key={index}>{ingredient}</p>
                     )}
                     <p>Preparation: {cocktail.strInstructions}</p>
                </Informations>
            </CocktailDetailContainer>
            }
        </div>
    )
}