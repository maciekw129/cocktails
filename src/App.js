import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import { useState } from 'react';
import styled from 'styled-components';

import { Header } from './Components/Header/Header';
import { CocktailsList } from './Components/CocktailsList/CocktailsList';
import { RandomCocktail } from './Components/RandomCocktail/RandomCocktail';
import { CocktailDetail } from './Components/CocktailDetail/CocktailDetail';

const Cover = styled.div`
  width: 100%;
  height: ${props => props.isNavVisible ? '200%' : '0%'};
  opacity: ${props => props.isNavVisible ? '50%' : '0%'};
  transition: opacity 0.2s linear;
  position: fixed;
  background-color: hsl(0, 0%, 50%);
  z-index: ${props => props.isNavVisible ? '90' : '0'};
`

function App() {

  const [previousLetter, setPreviousLetter] = useState('a');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(false);

  const changeLetter = (letter) => {
    setPreviousLetter(letter);
  }

  const changeScrollPosition = (position) => {
    setScrollPosition(position);
  }

  const changeNavVisibility = () => {
    if(isNavVisible) {
        setIsNavVisible(false);
    } else {
        setIsNavVisible(true);
    }
  }

  const hideNav = () => {
    setIsNavVisible(false);
  }

  return (
    <Router>
      <GlobalStyle />
      <div className="App">
        <Header
          isNavVisible={isNavVisible}
          changeNavVisibility={changeNavVisibility}
          hideNav={hideNav}
          changeScrollPosition={changeScrollPosition}
        />
        <Cover 
          isNavVisible={isNavVisible}
          onClick={changeNavVisibility}
        />
        <Switch>
          <Route path='/' exact >
            <CocktailsList
              previousLetter={previousLetter}
              changeLetter={changeLetter}
              scrollPosition={scrollPosition}
              changeScrollPosition={changeScrollPosition}
            />
          </Route>
          <Route path='/random-cocktail'>
            <RandomCocktail />
          </Route>
          <Route path='/:id' component={CocktailDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
