import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;

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
    }

    & li {
        padding: 0.5rem 0;
        width: 100%;
        text-align: center;
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
`

export function Header() {

    const [isNavVisible, setIsNavVisible] = useState(false);

    const showNav = () => {
        if(isNavVisible) {
            setIsNavVisible(false);
        } else {
            setIsNavVisible(true);
        }
    }

    return(
        <HeaderContainer isNavVisible={isNavVisible}>
            <h1><span>cock</span>tails.</h1>
            <Hamburger onClick={showNav} isNavVisible={isNavVisible} />
            <nav>
                <Link to='/' onClick={() => setIsNavVisible(false)}><li>cocktails list</li></Link>
                <Link to='/random-cocktail' onClick={() => setIsNavVisible(false)}><li>cocktail picker</li></Link>
                <li>about author</li>
            </nav>
        </HeaderContainer>
    )
}