import { loadFeature, defineFeature } from 'jest-cucumber';
const feature = loadFeature('./src/features/filterEventsByCity.feature');
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import CitySearch from '../CitySearch';
import { mockEvents } from '../mock_data/mock-events';

defineFeature(feature, test => {
  test('By default, when user hasn’t searched for a city, show upcoming events based on the user’s location', ({ given, when, then }) => {
    given('user hasn’t searched for any city', () => {

    });

    let AppWrapper;
    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then('the user should see the list of upcoming events from their location', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.Event')).toHaveLength(mockEvents.events.length);
    });
  });

  test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {
    let CitySearchWrapper;
    given('the main page is open', () => {
      CitySearchWrapper = shallow(<CitySearch />);
    });

    when('user starts typing in the city textbox', () => {
      CitySearchWrapper.find('.CitySearch__city').simulate('change', { target: { value: 'Munich' } });
    });

    then('the user should receive a list of cities (suggestions) that match what they’ve typed', () => {
      expect(CitySearchWrapper.find('.CitySearch__suggestions li')).toHaveLength(2);
    });
  });


  test('User can select a city from the suggested list', ({ given, and, when, then }) => {
    let AppWrapper;
    given('user was typing “Munich” in the city textbox', () => {
      AppWrapper = mount(<App />);
      AppWrapper.find('.CitySearch__city').simulate('change', { target: { value: 'Munich' } });
    });

    and('the list of suggested cities is showing', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.CitySearch__suggestions li')).toHaveLength(2);
    });

    when('the user selects a city (e.g., “Munich, Germany”) from the list', () => {
      AppWrapper.find('.CitySearch__suggestions li').at(0).simulate('click');
    });

    then('their city should be changed to that city (i.e., “Munich, Germany”)', () => {
      const CitySearchWrapper = AppWrapper.find(CitySearch);
      expect(CitySearchWrapper.state('query')).toBe('Munich, Germany');
    });

    and('the user should receive a list of upcoming events in that city', () => {
      expect(AppWrapper.find('.Event')).toHaveLength(mockEvents.events.length);
    });
  });
});