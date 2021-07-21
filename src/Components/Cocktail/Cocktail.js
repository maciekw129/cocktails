import styled from 'styled-components';

const CocktailContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 80%;
    margin-top: 3rem;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 0.5rem lightgray;
    overflow: hidden;

    & img {
        width: 100%;
    }
`

const Informations = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1rem;

    & h2 {
        padding-top: 0.5rem;
    }

    & p {
        padding-top: 1rem;
    }
`

export function Cocktail({ name, glass, image, mainIngredient, alcoholic }) {
    return(
        <CocktailContainer>
            <Informations>
                <h2>{name}</h2> 
                <p><span>Main ingredient: </span>{mainIngredient}</p>
                <p><span>Glass: </span>{glass}</p>
                <p>{alcoholic}</p>
            </Informations>
            <img src={image} />
        </CocktailContainer>
    )
}