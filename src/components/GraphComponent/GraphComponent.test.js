import React from 'react';
import { shallow } from 'enzyme';
import GraphComponent from './GraphComponent';

describe('<GraphComponent />', () => {
  test('renders', () => {
    const wrapper = shallow(<GraphComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
