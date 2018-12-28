import { combineReducers } from 'redux';
import {INITIALIZE_SUITCASES, PICK_CASE, REMOVE_PRIZE, INITIALIZE_PRIZES, SET_OFFER} from '../actions';

function suitcases(state = {}, action) {
    switch (action.type) {
        case INITIALIZE_SUITCASES:
            return action.suitcases
        case PICK_CASE:
            const updatedSuitCases = state.map(currentCase => {
                if (currentCase.id === action.suitcase.id) {
                    return {...currentCase, ...action.suitcase}
                }
                return currentCase
            })
            return updatedSuitCases
            
        default:
            return state;
    }
}

function prizes (state={}, action) {
    switch (action.type) {
        case INITIALIZE_PRIZES:
            return action.prizes
        case REMOVE_PRIZE:
            const updatedPrizes = state.map(currentPrize => {
            if (currentPrize.amount === action.value) {
                return {...currentPrize, inPlay: false}
            }
            return currentPrize
            })
            return updatedPrizes
        default:
            return state;
    }
}

function offer (state={}, action) {
    switch (action.type){
        case SET_OFFER:
            return {
                expectedValue: action.expectedValue,
                remainingCases: action.remainingCases,
                offer: action.offer
            }
        default:
            return state;
    }
}
export default combineReducers ({ suitcases, prizes, offer });