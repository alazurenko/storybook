import React from 'react';
import { addons } from '@storybook/addons';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import { Button } from '@storybook/components';

let timesClicked = 0;
const increment = () => {
  timesClicked += 1;
  addons.getChannel().emit(FORCE_RE_RENDER);
};

export default {
  title: 'Core|Events',
};

export const force = () => <Button onClick={increment}>Clicked: {timesClicked}</Button>;
force.title = 'Force re-render';