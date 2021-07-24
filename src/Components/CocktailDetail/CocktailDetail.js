import styled from 'styled-components';
import { useEffect, useState } from 'react';

const CocktailDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: 3rem;

    & img {
        width: 80%;
    }
`;


export function CocktailDetail({ match }) {

    const id = match.params.id;
    const [cocktail, setCocktail] = useState('');
    const [loadingStatus, setLoadingStatus] = useState('');

    useEffect(() => {
        fetchCocktail(id);
    }, [id]);

    const fetchCocktail = async (str) => {
        setLoadingStatus('loading');
        try {
            const data = await fetch(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${str}`);
                if(data.ok){
                    const jsonData = await data.json();
                    console.log(jsonData);
                    setLoadingStatus('success');
                    setCocktail(jsonData.drinks[0]);
                }
            } catch(error) {
                console.log(error);
                setLoadingStatus('failed');
                setCocktail(null);
            }
        }

    return(
        <div>
            {loadingStatus === 'failed' ?
            <h4>Something went wrong</h4>

            : <CocktailDetailContainer>
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            </CocktailDetailContainer>
            }
        </div>
    )
}