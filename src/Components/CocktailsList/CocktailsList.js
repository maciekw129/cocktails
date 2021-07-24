import styled from 'styled-components';
import { useState, useEffect } from 'react';

import { Cocktail } from '../Cocktail/Cocktail';
import { Loading } from '../Loading/Loading';

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
        margin-top: 9rem;
        text-align: center;
        padding: 0 1rem;
    }
`;

export function CocktailsList() {

    const [cocktails, setCocktails] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [previousLetter, setPreviousLetter] = useState(undefined);
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    useEffect(() => {
        fetchCocktails('f=a');
        const firstLetter = document.querySelectorAll('ul > li')[0];
        firstLetter.style.backgroundColor = "#F2B138";
        setPreviousLetter(firstLetter);
    }, [])

    const fetchCocktails = async (str) => {
        setLoadingStatus('loading');
        try {
            const data = await fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?${str}`);
                if(data.ok){
                    const jsonData = await data.json();
                    console.log(jsonData);
                    setLoadingStatus('success');
                    setCocktails(jsonData.drinks);
                }
            } catch(error) {
                console.log(error);
                setLoadingStatus('failed');
                setCocktails(null);
            }
        }
        

    const searchByWord = (event) => {
        fetchCocktails(`s=${event.target.value}`)
    }

    const searchByLetter = (event) => {
        if(previousLetter === event.target) {
            return;
        }

        const letter = event.target.getAttribute('value');

        fetchCocktails(`f=${letter}`);
        event.target.style.backgroundColor = '#F2B138';
        previousLetter.style.backgroundColor = 'hsl(0, 0%, 97%)';
        setPreviousLetter(event.target);
    }

    return(
        <CocktailListContainer>
            <input type='text' placeholder='Search for a cocktail...' onChange={searchByWord}></input>
            <ul>
                {alphabet.map((letter, index) => 
                    <li key={index} onClick={searchByLetter} value={letter}>{letter}</li>
                )}
            </ul>
            {loadingStatus === 'loading' ?
            <Loading />
            : loadingStatus === 'success' ?
                cocktails ?
                cocktails.map((cocktail, index) =>
                    <Cocktail
                     key={index} 
                     name={cocktail.strDrink} 
                     glass={cocktail.strGlass} 
                     image={cocktail.strDrinkThumb} 
                     mainIngredient={cocktail.strIngredient1} 
                     alcoholic={cocktail.strAlcoholic}
                     id={cocktail.idDrink}  
                     />
                )
                : <h4>Sorry! We haven't found any cocktail.</h4>
            : <h4>Something went wrong. Refresh the page and check Your internet connection.</h4>
            }
        </CocktailListContainer>
    )
}