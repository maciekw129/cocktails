import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import { useState } from 'react';

import { Header } from './Components/Header/Header';
import { CocktailsList } from './Components/CocktailsList/CocktailsList';
import { CocktailPicker } from './Components/CocktailPicker/CocktailPicker';
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
          <Route path='/cocktail-picker'>
            <CocktailPicker/>
          </Route>
          <Route path='/:id' component={CocktailDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
