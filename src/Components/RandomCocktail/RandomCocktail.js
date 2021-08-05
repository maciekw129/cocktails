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

    & .buttonContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media only screen and (min-width: 950px) {
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin-top: 6rem
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
            <div className="buttonContainer">
                <h1>Click to get a <span>random</span> cocktail!</h1>
                <RandomButton onClick={fetchRandomCocktail}>Click Me!</RandomButton>
            </div>
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