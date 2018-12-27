import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import './index.css';
import App from './components/App';
import {setSuitCases} from './actions';
import {suitcases} from './data/initial';

const store = createStore(rootReducer);
store.subscribe(() => console.log('store', store.getState()));
store.dispatch (setSuitCases(suitcases));

    ReactDOM.render(
        <Provider store = {store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={App}/>
                </Switch>
            </BrowserRouter>
        </Provider>,
    document.getElementById('root')
);
