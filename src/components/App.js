import {Component} from 'react';
import {Route, Switch} from 'react-router';

import HomePage from '../pages/HomePage';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={HomePage}/>
            </Switch>
        );
    }
}

export default App;
