import { hbs } from 'ember-cli-htmlbars';
import Centered from '@storybook/addon-centered/ember';

export default {
  title: 'Addon/Centered',
  decorators: [Centered],

  parameters: {
    component: Centered,
  },
};

export const Button = () => ({
  template: hbs`<button>A Button</button>`,
});
