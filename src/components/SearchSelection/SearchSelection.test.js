import React from 'react';
import { shallow } from 'enzyme';
import SearchSelection from './SearchSelection';

describe('<SearchSelection />', () => {
  test('renders', () => {
    const wrapper = shallow(<SearchSelection />);
    expect(wrapper).toMatchSnapshot();
  });
});
