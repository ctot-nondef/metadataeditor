/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

import actions from './actions';
import mutations from './mutations';

const state = {
  queries: {},
  queryhistory: {},
  ontology: null,
  ontologyPath: '',
  processing: false,
  processingMessage: '',
  p: ['ontologyPath'],
};

const getters = {
  getQuery: s => name => s.queries[name],
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
