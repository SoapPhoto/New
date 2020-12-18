import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Loading } from './index';

export default {
  title: 'Components/Button',
  component: Loading,
} as Meta;

const Template = args => (
  <div>
    <Loading />
  </div>
);

export const FirstStory = Template.bind({});

// FirstStory.args = {
//   /* the args you need here will depend on your component */
// };
