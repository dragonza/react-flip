import React from 'react';
import { shallow, mount } from 'enzyme';
import FlipCard from '../FlipCard';

it('renders without crashing', () => {
  shallow(<FlipCard frontContent="test" backContent="back" />);
});

it('renders content of the front and back card', () => {
  const wrapper = shallow(<FlipCard frontContent="test" backContent="back" />);
  expect(wrapper.find('.card').length).toBe(1);
  expect(wrapper.find('.card__face--front').length).toBe(1);
  expect(wrapper.find('.card__face--back').length).toBe(1);
});

it('renders content as a React component', () => {
  const FakeComponent = () => (
    <div className="fake-component">This is a component</div>
  );
  const wrapper = mount(
    <FlipCard
      frontContent={<FakeComponent />}
      backContent={<FakeComponent />}
    />
  );
  expect(wrapper.find('.fake-component').length).toBe(2);
});

it('should include card__flipped when the card is flipped', () => {
  const wrapper = shallow(
    <FlipCard
      flipped={true}
      onCardClick={jest.fn()}
      backContent="This is a front"
      backCardStyle={{ background: 'blue' }}
      frontContent="This is a front"
      frontCardStyle={{ background: 'red' }}
    />
  );
  expect(wrapper.find('.card__flipped').length).toBe(1);
});

it('should include card__flipped--horizontal when horizontal is true', () => {
  const wrapper = shallow(
    <FlipCard
      horizontal
      flipped={true}
      onCardClick={jest.fn()}
      backContent="This is a front"
      backCardStyle={{ background: 'blue' }}
      frontContent="This is a front"
      frontCardStyle={{ background: 'red' }}
    />
  );
  expect(wrapper.find('.card__flipped--horizontal').length).toBe(2);
});

test('clicking on the card calls onCardClick', () => {
  const props = {
    ...FlipCard.defaultProps,
    onCardClick: jest.fn()
  };

  const wrapper = mount(<FlipCard {...props} />);
  expect(props.onCardClick).not.toBeCalled();
  expect(wrapper.find('.card').length).toBe(1);
  wrapper.find('.card').simulate('click');
  expect(props.onCardClick).toBeCalled();
});
