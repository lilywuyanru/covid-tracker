import React from 'react';
import { shallow } from 'enzyme';
import QueryComponent from './QueryComponent';

describe('<QueryComponent />', () => {
  test('renders', () => {
    const wrapper = shallow(<QueryComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
