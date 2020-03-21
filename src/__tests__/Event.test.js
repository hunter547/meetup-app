import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';

describe('Render <Event /> component', () => {
    let EventSearchWrapper;
    const event = {
        created: 1577800262000,
        duration: 7200000,
        id: '267534584',
        name: 'A Night at the Movies: Being Mortal (Crozet Library)',
        date_in_series_pattern: false,
        status: 'upcoming',
        time: 1589841000000,
        local_date: '2020-05-18',
        local_time: '18:30',
        updated: 1577800262000,
        utc_offset: -14400000,
        waitlist_count: 0,
        yes_rsvp_count: 1,
        venue: {
            id: 22171762,
            name: 'Crozet Library',
            lat: 38.06964874267578,
            lon: -78.70069122314453,
            repinned: true,
            address_1: '2020 Library Ave',
            city: 'Crozet',
            country: 'us',
            localized_country_name: 'USA',
            zip: '',
            state: 'VA'
        },
        group: {
            created: 1419015237000,
            name: 'Free Films at the Library',
            id: 18263157,
            join_mode: 'open',
            lat: 38,
            lon: -78.45999908447266,
            urlname: 'Free-Films-at-the-Library',
            who: 'Members',
            localized_location: 'Charlottesville, VA',
            state: 'VA',
            country: 'us',
            region: 'en_US',
            timezone: 'US/Eastern'
        },
        link: 'https://www.meetup.com/Free-Films-at-the-Library/events/267534584/',
        description: "<p>Join the Crozet Library for a night at the movies with theater-style popcorn and cold drinks.</p> <p>This month's film is Frontline: Being Mortal (2015). Rated TV-PG. Run time: 54 min + discussion</p> <p>Summary:</p> <p>Explores relationships between doctors and their patients nearing end of life. Follows writer and surgeon Atul Gawande as he delves into the relationships doctors have with patients are dying.</p> ",
        visibility: 'public',
        member_pay_fee: false
    };
    beforeAll(() => {
        EventSearchWrapper = shallow(<Event event={event}/>);
    });
    test('render event div', () => {
        expect(EventSearchWrapper.find('.Event')).toHaveLength(1);
    });
    test('render event time', () => {
        expect(EventSearchWrapper.find('.Event__time')).toHaveLength(1);
    });
    test('render event name', () => {
        expect(EventSearchWrapper.find('.Event__name')).toHaveLength(1);
    });
    test('render event group name', () => {
        expect(EventSearchWrapper.find('.Event__group-name')).toHaveLength(1);
    });
    test('render event rsvps', () => {
        expect(EventSearchWrapper.find('.Event__rsvps')).toHaveLength(1);
    });
    test('render event details span', () => {
        expect(EventSearchWrapper.find('.Event__details')).toHaveLength(0);
        // The details span should have a 0 length, since by default 
        // details shouldn't be shown
    });
    test('render event address', () => {
        expect(EventSearchWrapper.find('.Event__address')).toHaveLength(0);
        // The address paragraph should have a 0 length, since by default 
        // the address shouldn't be shown
    });
    test('render event description', () => {
        expect(EventSearchWrapper.find('.Event__description')).toHaveLength(0);
        // The description paragraph should have a 0 length, since by default 
        // the description shouldn't be shown
    });
    test('render event visibility', () => {
        expect(EventSearchWrapper.find('.Event__visibility')).toHaveLength(0);
        // The visibility paragraph should have a 0 length, since by default 
        // the visibility shouldn't be shown
    });
    test('render event link', () => {
        expect(EventSearchWrapper.find('.Event__link')).toHaveLength(0);
        // The event link should have a 0 length, since by default 
        // the event link shouldn't be shown
    });
    test('render event details button', () => {
        expect(EventSearchWrapper.find('.Event__details-button')).toHaveLength(1);
    });

    // *** TEST UI ELEMENT CHANGES ***

    test('Simulate clicking the details button', () => {
        EventSearchWrapper.find('.Event__details-button').simulate('click');

        // The show details boolean should now be true since the details
        // button has been clicked
        expect(EventSearchWrapper.state('showDetails')).toBe(true);
        
        // The elements below should now have a length of one, since the
        // user has clicked the "Show Details" button
        expect(EventSearchWrapper.find('.Event__details')).toHaveLength(1);
        expect(EventSearchWrapper.find('.Event__address')).toHaveLength(1);
        expect(EventSearchWrapper.find('.Event__description')).toHaveLength(1);
        expect(EventSearchWrapper.find('.Event__visibility')).toHaveLength(1);
        expect(EventSearchWrapper.find('.Event__link')).toHaveLength(1);
    })
});