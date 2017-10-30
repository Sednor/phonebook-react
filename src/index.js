import { Route } from 'react-router';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Project from './reducers';
import App from './components/App';
import { composeWithDevTools } from 'redux-devtools-extension';
import './styles/phone-book.scss';

const store = createStore(Project, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route component={App} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
