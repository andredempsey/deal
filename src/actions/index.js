import {prizes} from '../data/initial';
import _ from 'lodash';

export const INITIALIZE_SUITCASES = 'INITIALIZE_SUITCASES';


export function setSuitCases (suitcases) {
    //Shuffle available prize amounts and assign to suitcases
    const shuffled = _.shuffle(prizes)
    suitcases.forEach(element => {
        element.value = shuffled[0].amount;
        shuffled.splice(0,1);
    });
    console.log(suitcases);
    return {
        type: INITIALIZE_SUITCASES,
        suitcases
    };
}