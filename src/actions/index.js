import _ from 'lodash';

export const INITIALIZE_SUITCASES = 'INITIALIZE_SUITCASES';
export const SET_OFFER = 'SET_OFFER';
export const PICK_CASE = 'PICK_CASE';
export const REMOVE_PRIZE = 'REMOVE_PRIZE';
export const INITIALIZE_PRIZES = 'INITIALIZE_PRIZES';


export function setSuitCases (suitcases, prizes) {
    //Shuffle available prize amounts and assign to suitcases
    const shuffled = _.shuffle(prizes)
    suitcases.forEach(element => {
        element.value = shuffled[0].amount;
        shuffled.splice(0,1);
    });
    return {
        type: INITIALIZE_SUITCASES,
        suitcases
    };
}

export function setPrizes (prizes) {
    return {
        type: INITIALIZE_PRIZES,
        prizes
    }
}

export function setOffer (data) {
    //count cases that are left
    console.log ("Setting initial offer", data)
    //get expected value of cases
    const remainingCases = 30;
    const expectedValue = 50;
    const offer = expectedValue/remainingCases;
    
    return {
        type: SET_OFFER,
        remainingCases,
        expectedValue, 
        offer
    }
}

export function pickCase (suitcase) {
    suitcase.selected = true;
    return{
        type: PICK_CASE,
        suitcase
    }
}

export function removePrize (value) {
    return{
        type: REMOVE_PRIZE,
        value
    }
}