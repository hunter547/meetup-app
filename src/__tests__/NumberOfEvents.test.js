import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('Render <NumberOfEvents /> component', ()=> {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });
  test('render main div', () => {
    expect(NumberOfEventsWrapper.find('.NumberOfEvents')).toHaveLength(1);
  });
  test('render label', () => {
    expect(NumberOfEventsWrapper.find('.NumberOfEvents__label')).toHaveLength(1);
  });
  test('render span for input field', () => {
    expect(NumberOfEventsWrapper.find('.NumberOfEvents__input-span')).toHaveLength(1);
  });
  test('render span for input field', () => {
    expect(NumberOfEventsWrapper.find('.NumberOfEvents__input-span')).toHaveLength(1);
  });
  test('render input field', () => {
    expect(NumberOfEventsWrapper.find('.NumberOfEvents__input-field')).toHaveLength(1);
  });
  
  // *** TEST UI ELEMENT CHANGES **

  test('change value in the input field', () => {
    const eventObject = { target: { value: 24 }};
    NumberOfEventsWrapper.find('.NumberOfEvents__input-field').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('eventNumber')).toBe(24);
  })
});