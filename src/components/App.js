import {Component} from 'react';
import {Route, Switch} from 'react-router';

import PhoneBook from '../pages/PhoneBook';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={PhoneBook}/>
            </Switch>
        );
    }
}

export default App;
