import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import { useState } from 'react';

import { Header } from './Components/Header/Header';
import { CocktailsList } from './Components/CocktailsList/CocktailsList';
import { RandomCocktail } from './Components/RandomCocktail/RandomCocktail';
import { CocktailDetail } from './Components/CocktailDetail/CocktailDetail';

function App() {

  const [previousLetter, setPreviousLetter] = useState('a');
  const [scrollPosition, setScrollPosition] = useState(0);

  const changeLetter = (letter) => {
    setPreviousLetter(letter);
  }

  const changeScrollPosition = (position) => {
    setScrollPosition(position);
  }

  return (
    <Router>
      <GlobalStyle />
      <div className="App">
        <Header />
        <Switch>
          <Route path='/' exact >
            <CocktailsList
              previousLetter={previousLetter}
              changeLetter={changeLetter}
              scrollPosition={scrollPosition}
              changeScrollPosition={changeScrollPosition}
            />
          </Route>
          <Route path='/random-cocktail' component={RandomCocktail} />
          <Route path='/:id' component={CocktailDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
