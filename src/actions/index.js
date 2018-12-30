import _ from 'lodash';

export const INITIALIZE_SUITCASES = 'INITIALIZE_SUITCASES';
// export const SET_OFFER = 'SET_OFFER';
// export const UPDATE_OFFER = 'UPDATE_OFFER';
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


export function pickCase (suitcase) {
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

// export function setOffer (numOfCases, prizes) {
//     //get expected value of cases
//     let sumOfValues = 0;
//     prizes.forEach(element => {
//         sumOfValues = sumOfValues + element.amount;
//     })
//     const expectedValue = sumOfValues/numOfCases.toFixed(0);
//     const offer = (expectedValue * .5).toFixed(0);
    
//     return {
//         type: SET_OFFER,
//         remainingCases: numOfCases,
//         expectedValue, 
//         offer
//     }
// }
// export function updateOffer (value) {
//     return {
//         type: UPDATE_OFFER,
//         value
//     }
// }