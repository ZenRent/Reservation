import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Guests from '../src/components/Guests';

const wrapper = shallow(<Guests />);

it('Guests exists', () => {
  expect(wrapper).toBeDefined();
});

it('Guests contains the Category component', () => {
  expect(wrapper.text()).toContain('<Category />');
});
