import React from 'react';
import { shallow } from 'enzyme';
import CardComponent from './CardComponent';

describe('<CardComponent />', () => {
  test('renders', () => {
    const wrapper = shallow(<CardComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
