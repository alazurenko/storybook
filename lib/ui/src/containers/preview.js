import { PREVIEW_URL } from 'global';
import React from 'react';

import { Consumer } from '@storybook/api';

import { Preview } from '../components/preview/preview';

const nonAlphanumSpace = /[^a-z0-9 ]/gi;
const doubleSpace = /\s\s/gi;
const replacer = match => ` ${match} `;
const addExtraWhiteSpace = input =>
  input.replace(nonAlphanumSpace, replacer).replace(doubleSpace, ' ');
const getDescription = (storiesHash, storyId) => {
  const storyInfo = storiesHash[storyId];
  return storyInfo ? addExtraWhiteSpace(`${storyInfo.kind} - ${storyInfo.name}`) : '';
};

const mapper = ({ api, state }) => {
  const { layout, location, customQueryParams, storiesHash, storyId } = state;
  const { parameters } = storiesHash[storyId] || {};
  return {
    api,
    getElements: api.getElements,
    options: layout,
    description: getDescription(storiesHash, storyId),
    ...api.getUrlState(),
    queryParams: customQueryParams,
    docsOnly: parameters && parameters.docsOnly,
    location,
    parameters,
  };
};

function getBaseUrl() {
  try {
    return PREVIEW_URL || 'iframe.html';
  } catch (e) {
    return 'iframe.html';
  }
}

const PreviewConnected = React.memo(props => (
  <Consumer filter={mapper}>
    {fromState => (
      <Preview
        {...props}
        baseUrl={getBaseUrl()}
        {...fromState}
        customCanvas={fromState.api.renderPreview}
      />
    )}
  </Consumer>
));
PreviewConnected.displayName = 'PreviewConnected';

export default PreviewConnected;
