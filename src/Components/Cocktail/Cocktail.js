import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CocktailContainer = styled.div`
    height: 100%;
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
        

        & span {
            font-weight: 800;
        }
    }
`

export const Button = styled.button`
    border: 2px solid #F2B138;
    background-color: hsl(0, 0%, 100%);
    width: 30%;
    padding: 7px 20px;
    border-radius: 5px 15px;
    padding: 0.5rem;
    font-family: 'Josefin Sans', sans-serif;
    font-weight: 800;
    cursor: pointer;
    transition: background-color 0.2s linear;
    
    & a {
        text-decoration: none;
        color: black;
    }

    &:hover {
        background-color: #F2B138;
        transition: background-color 0.2s linear;
    }
`;

const DetailsButton = styled(Button)`
    align-self: flex-end;
    margin-top: -1rem;
`

export function Cocktail({ name, glass, image, mainIngredient, alcoholic, id, changeScrollPosition }) {

    return(
        <CocktailContainer>
            <Informations>
                <h2>{name}</h2> 
                <p><span>Main ingredient: </span>{mainIngredient}</p>
                <p><span>Glass: </span>{glass}</p>
                <p>{alcoholic}</p>
                <DetailsButton onClick = {() => console.log(window.scrollTop)}><Link to={`/${id}`}>details</Link></DetailsButton>
            </Informations>
            <img src={image} alt={name} />
        </CocktailContainer>
    )
}