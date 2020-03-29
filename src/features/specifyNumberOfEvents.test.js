import { loadFeature, defineFeature } from 'jest-cucumber';
const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');
import { mount, shallow } from 'enzyme';
import React from 'react';
import App from '../App';
import { mockEvents } from '../mock_data/mock-events';

defineFeature(feature, test => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
    given('user has not changed default settings', () => {
      // Page is opened by user
    });

    when('the user is looking through an events results list', () => {
      // Same thing as page has loaded
    });

    then('32 events will be displayed per page', () => {
      expect(AppWrapper.state('events')).toHaveLength(32);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    given('user wants to change the number of events displayed per page', () => {
      // This is more a state of mind
    });

    when('the user selects a new number of events being displayed', async () => {
      AppWrapper.instance().updateEvents(null, null, 4);
      await AppWrapper.update();
    });

    then('the number of events displayed reflect the new number selected', () => {
      expect(AppWrapper.state('events')).toHaveLength(4);
    });
  });
});