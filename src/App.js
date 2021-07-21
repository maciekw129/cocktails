import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from './globalStyles';

import { Header } from './Components/Header/Header';
import { CocktailsList} from './Components/CocktailsList/CocktailsList';
import { RandomCocktail } from './Components/RandomCocktail/RandomCocktail';

function App() {

  return (
    <Router>
      <div className="App">
        <GlobalStyle />
        <Header />
        <Switch>
          <Route path='/' exact component={CocktailsList} />
          <Route path='/random-cocktail' component={RandomCocktail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
