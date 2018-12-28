import React from 'react';
import { mount } from 'enzyme';
import { SuitCase } from './SuitCase';
import { suitcases } from '../data/initial';

describe ('SuitCase', () => {
    const props = suitcases[0];
    console.log(props);
    let suitcase = mount(<SuitCase { ... props }/>);

} )