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

export function CocktailsList({ previousLetter, changeLetter, scrollPosition, changeScrollPosition }) {

    const [cocktails, setCocktails] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    useEffect(() => {
        fetchCocktails(`f=${previousLetter}`, true);
        document.getElementById(previousLetter).style.backgroundColor = '#F2B138';
    }, [])

    const fetchCocktails = async (str, initialFetch) => {
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
            if(initialFetch){
                window.scrollTo(0, scrollPosition);
            }
        }
        

    const searchByWord = (event) => {
        fetchCocktails(`s=${event.target.value}`)
    }

    const searchByLetter = (event) => {
        if(previousLetter === event.target.getAttribute('value')) {
            return;
        }
        const letter = event.target.getAttribute('value');
        changeLetter(letter)
        fetchCocktails(`f=${letter}`);
        event.target.style.backgroundColor = '#F2B138';
        document.getElementById(previousLetter).style.backgroundColor = 'hsl(0, 0%, 97%)';
    }

    return(
        <CocktailListContainer>
            <input type='text' placeholder='Search for a cocktail...' onChange={searchByWord}></input>
            <ul>
                {alphabet.map((letter, index) => 
                    <li key={index} onClick={searchByLetter} value={letter} id={letter}>{letter}</li>
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
                     changeScrollPosition={changeScrollPosition}  
                     />
                )
                : <h4>Sorry! We haven't found any cocktail.</h4>
            : <h4>Something went wrong. Refresh the page and check Your internet connection.</h4>
            }
        </CocktailListContainer>
    )
}