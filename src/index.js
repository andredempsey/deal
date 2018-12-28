import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import './index.css';
import App from './components/App';
import { setSuitCases, setPrizes, setOffer } from './actions';
import { suitcases, prizes } from './data/initial';

const store = createStore(rootReducer);
store.dispatch (setSuitCases(suitcases, prizes));
store.dispatch (setPrizes(prizes));
store.dispatch (setOffer({remainingCases:30, expectedValue: 40}));
store.subscribe(() => console.log('store', store.getState()));

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
