import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import './index.css';
import App from './components/App';
import {setSuitCases} from './actions';

const store = createStore(rootReducer);
store.subscribe(() => console.log('store', store.getState()));
store.dispatch (setSuitCases([
    {id: 0, label:'#1', value:'$0'},
    {id: 1, label:'#2', value:'$0'},
    {id: 2, label:'#3', value:'$0'}]));

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
