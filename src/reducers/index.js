import {INITIALIZE_SUITCASES} from '../actions';

function suitcases(state = {}, action) {
    switch (action.type) {
        case INITIALIZE_SUITCASES:
            return action.suitcases
        default:
            return state;
    }
}

export default suitcases;