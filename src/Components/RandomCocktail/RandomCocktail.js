import { useState } from 'react';
import styled from 'styled-components';

import { Cocktail } from '../Cocktail/Cocktail';

const RandomCocktailContainer = styled.div`
    margin-top: 8rem;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    & span {
        color: #F2B138;
    }

    & h1 {
        text-align: center;
    }
`;

const RandomButton = styled.button`
    margin-top: 2rem;
    padding: 1rem 5rem;
    background: none;
    border: 2px solid #F2B138;
    border-radius: 5px 15px;
    font-family: 'Josefin Sans', sans-serif;
    font-weight: 800;
    font-size: 125%;
    cursor: pointer;
    transition: background-color 0.2s linear;

    &:hover {
        background-color: #F2B138;
        transition: background-color 0.2s linear;
    }
`

export function RandomCocktail({ changeScrollPosition, randomCocktail, fetchRandomCocktail }) {

    return(
        <RandomCocktailContainer>
            <h1>Pick for me a <span>random</span> cocktail!</h1>
            <RandomButton onClick={fetchRandomCocktail}>Click Me!</RandomButton>
            {randomCocktail ? 
            <Cocktail 
            name={randomCocktail.strDrink}
            glass={randomCocktail.strGlass}
            image={randomCocktail.strDrinkThumb}
            mainIngredient={randomCocktail.strIngredient1}
            alcoholic={randomCocktail.strAlcoholic}
            id={randomCocktail.idDrink}
            changeScrollPosition={changeScrollPosition}
            from='random-cocktail'
            />
            : null
            }
        </RandomCocktailContainer>
    )
}