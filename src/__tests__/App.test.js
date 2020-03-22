import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

describe('Render <App /> component', () => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />);
    });
    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });
    test('render NumberOfEvents', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    })
    test('render EventList', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });
});
