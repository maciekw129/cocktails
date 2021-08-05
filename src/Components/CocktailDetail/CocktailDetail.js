import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../Cocktail/Cocktail'; 

const CocktailDetailContainer = styled.div`
    margin-top: 7rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1rem;

    & img {
        width: 90%;
        border-radius: 5px;
    }

    & a {
        align-self: flex-start;
    }

    @media only screen and (min-width: 950px) {
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 10rem;
        justify-content: space-around;
        align-items: stretch;

        & img {
            width: 40%;
        }
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
        line-height: 1.4rem;
        
    }

    & span {
        font-weight: 800;
    }

    @media only screen and (min-width: 950px) {
        width: 40%;
    }
`

const BackButton = styled(Button)`
    align-self: flex-start;
    margin-left: 1rem;
    margin-bottom: 1rem;

    @media only screen and (min-width: 950px) {
        position: absolute;
        top: 7.5rem;
        left: 2rem;
        width: 10%;
    }
`


export function CocktailDetail({ match, location }) {

    const id = match.params.id;
    const from = location.from.from;
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
           const ingredientToPush = `${ingredient} --- ${measure}`;

           cocktailIngredients.push(ingredientToPush);
        }
        return cocktailIngredients;
    }

    return(
        <div>
            {loadingStatus === 'failed' ?
            <h4>Something went wrong</h4>

            : <CocktailDetailContainer>
                <Link to={from === 'cocktails-list' ? '/' : '/random-cocktail'}><BackButton>Back</BackButton></Link>
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                <Informations>
                    <h1>{cocktail.strDrink}</h1>
                    <p><span>{cocktail.strAlcoholic}</span></p>
                    <p><span>Glass: </span>{cocktail.strGlass}</p>
                    <p><span>Ingredients:</span></p>
                    {ingredients.map((ingredient, index) => 
                    <p key={index}>{ingredient}</p>
                     )}
                     <p><span>Preparation:</span> {cocktail.strInstructions}</p>
                </Informations>
            </CocktailDetailContainer>
            }
        </div>
    )
}