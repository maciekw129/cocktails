import styled from 'styled-components';
import { useState, useEffect } from 'react';

import { Cocktail } from '../Cocktail/Cocktail';

const CocktailListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    & input {
        padding: 1rem;
        border: none;
        border-radius: 10px;
        width: 80%;
        margin-top: 1rem;
    }

    & ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        padding: 1rem;
        padding-bottom: 0;
        margin-top: 1rem;
        width: 100%;
    }

    & li {
        width: 10%;
        padding: 0.5rem;
        text-align: center;
        border: 1px solid lightgray;
    }

    & h4 {
        margin-top: 2rem;
    }
`;

export function CocktailsList() {

    const [cocktails, setCocktails] = useState([]);
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    useEffect(() => {
        fetchCocktails('a');
    }, [])

    const fetchCocktails = async (str) => {
        const data = await fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?f=${str}`);
        const jsonData = await data.json();
        console.log(jsonData);
        setCocktails(jsonData.drinks);
    }

    return(
        <CocktailListContainer>
            <input type='text' placeholder='Search for a cocktail...'></input>
            <ul>
                {alphabet.map((letter, index) => 
                    <li key={index} onClick={() => fetchCocktails(letter)}>{letter}</li>
                )}
            </ul>
            {cocktails ?
                cocktails.map((cocktail, index) => 
                    <Cocktail key={index} name={cocktail.strDrink} glass={cocktail.strGlass} image={cocktail.strDrinkThumb} mainIngredient={cocktail.strIngredient1} alcoholic={cocktail.strAlcoholic}  />
                )
            : <h4>Sorry, We haven't found any cocktail.</h4>
            }
        </CocktailListContainer>
    )
}