import React from 'react';
import { mount } from 'enzyme';
import { SuitCase } from './SuitCase';
import { unSelectedSuitcase, selectedSuitcase, chosenSuitcase } from '../data/initial';

describe ('when suitcase is not selected', () => {
    console.log(unSelectedSuitcase);
    let sc = mount(<SuitCase suitcase={unSelectedSuitcase} selectedSuitcase={()=>{}}/>)
    it('renders the suitcase label', ()=>{
        expect(sc.find('h4').text()).toEqual('1');
    })
    it('sets suitcase class to value-reveal if not chosen', () =>{
        expect(sc.find('.value-reveal').exists()).toBe(true);
    })
})

describe ('when suitcase is selected', () => {
    let sc = mount(<SuitCase suitcase={selectedSuitcase} selectedSuitcase={()=>{}}/>)
    it('renders the suitcase value', ()=>{
        expect(sc.find('h4').text()).toEqual('$0');
    })
    it('sets suitcase class to value-hidden if chosen', () =>{
        expect(sc.find('.value-hidden').exists()).toBe(true);
    })
})

describe ('when suitcase is chosen', () => {
    let sc = mount(<SuitCase suitcase={chosenSuitcase} selectedSuitcase={()=>{}}/>)
    it('renders the suitcase value', ()=>{
        expect(sc.find('.value-chosen').exists()).toBe(true);
    })
})

