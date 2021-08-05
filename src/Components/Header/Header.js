import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 98;
    background-color: hsl(0, 0%, 97%);
    box-shadow: 0px 0.1rem 0.3rem lightgray;

    & h1 {
        margin: 2rem 1.5rem;
        color: #F2B138;

        & span {
            color: black;
        }
    }

    & nav {
        position: absolute;
        width: 100%;
        max-height: ${props => props.isNavVisible ? '100px' : '0px'};
        transition: max-height 0.2s linear;
        right: 0;
        top: 5rem;
        background-color: #F2B138;
        list-style: none;
        overflow: hidden;
        z-index: 99;

        & a {
            text-decoration: none;
        }
    }

    & li {
        padding: 0.75rem 0;
        width: 100%;
        text-align: center;
        color: black;
    }
`

const Hamburger = styled.button`
    margin: 2rem 1.5rem;
    width: 25px;
    height: 25px;
    background: none;
    border: 0;
    position: relative;
    border-top: 3px solid hsl(0, 0%, 10%);
    border-width: ${props => props.isNavVisible ? '0px' : '3px'};
    transition: border-width 0.2s linear;

    &::before, ::after {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        border-top: 3px solid hsl(0, 0%, 10%);
    } 

    &::before {
        top: 8px;
        transform: ${props => props.isNavVisible ? 'translateY(3px) rotate(45deg)' : 'none'};
        transition: transform 0.2s linear;
    }

    &::after {
        top: 19px;
        transform: ${props => props.isNavVisible ? 'translateY(-8px) rotate(-45deg)' : 'none'};
        transition: transform 0.2s linear;
    }

    &:hover {
        cursor: pointer;
    }
`

export function Header({ isNavVisible, changeNavVisibility, changeScrollPosition, resetRandomCocktail }) {

    const handleClick = () => {
        changeScrollPosition(0);
        changeNavVisibility();
        resetRandomCocktail();
    }

    return(
        <HeaderContainer isNavVisible={isNavVisible}>
            <h1><span>cock</span>tails.</h1>
            <Hamburger onClick={changeNavVisibility} isNavVisible={isNavVisible} />
            <nav>
                <Link to='/' onClick={handleClick}><li>cocktails list</li></Link>
                <Link to='/random-cocktail' onClick={handleClick}><li>random cocktail</li></Link>
            </nav>
        </HeaderContainer>
    )
}