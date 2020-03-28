import { loadFeature, defineFeature } from 'jest-cucumber';
const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');
import { mount } from 'enzyme';
import React from 'react';
import App from '../App';
import { mockEvents } from '../mock_data/mock-events';
defineFeature(feature, test => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = mount(<App />);
  });

  afterAll(() => {
    AppWrapper.unmount();
  })

  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the main page is open', () => {
      // Already done in the beforeAll() statement
    });

    when('user hasn’t clicked on the event details button', () => {
      AppWrapper.update();
    });

    then('results display a grid of unexpanded events', () => {
      expect(AppWrapper.find('.Event')).toHaveLength(mockEvents.events.length);
      // Event details is an element of the expanded view, so it should not have a length.
      expect(AppWrapper.find('.Event__details')).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({ given, when, then, and }) => {
    given('the results display with a grid of events is open', () => {
      // Events already open from the first scenario above
    });

    when('user clicks the details button', () => {
      AppWrapper.find('.Event__details-button').at(0).simulate('click');
    });

    then('details about the event are revealed', () => {
      expect(AppWrapper.find('.Event__details').at(0)).toHaveLength(1);
    });

    and('details include address, description, visibility, and link', () => {
      expect(AppWrapper.find('.Event__address').at(0)).toHaveLength(1);
      expect(AppWrapper.find('.Event__description').at(0)).toHaveLength(1);
      expect(AppWrapper.find('.Event__visibility').at(0)).toHaveLength(1);
      expect(AppWrapper.find('.Event__link').at(0)).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given('the event details are already expanded (from Scenario 2)', () => {
      // The details button has already been clicked in Scenario 2 - Then
    });

    when('user clicks the details button again', () => {
      AppWrapper.find('.Event__details-button').at(0).simulate('click');
    });

    then('the event details should roll back up into the event', () => {
      expect(AppWrapper.find('.Event__details').at(0)).toHaveLength(0);
    });
  });
});

