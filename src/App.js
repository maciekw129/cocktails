import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from './globalStyles';

import { Header } from './Components/Header/Header';
import { CocktailsList } from './Components/CocktailsList/CocktailsList';
import { RandomCocktail } from './Components/RandomCocktail/RandomCocktail';
import { CocktailDetail } from './Components/CocktailDetail/CocktailDetail';

function App() {

  return (
    <Router>
      <GlobalStyle />
      <div className="App">
        <Header />
        <Switch>
          <Route path='/' exact component={CocktailsList}></Route>
          <Route path='/random-cocktail' component={RandomCocktail} />
          <Route path='/:id' component={CocktailDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
