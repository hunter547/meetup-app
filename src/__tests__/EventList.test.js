import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../EventList';
import Event from '../Event';

describe('Render <EventList /> component', () => {
    test('render correct number of events', () => {
        const events = [{id:1},{id:2},{id:3},{id:4}];
        const EventListWrapper = shallow(<EventList events={events} />);
        expect(EventListWrapper.find(Event)).toHaveLength(4);
    });
});