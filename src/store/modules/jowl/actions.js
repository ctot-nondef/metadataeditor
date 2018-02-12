/* eslint no-console: ["error", { allow: ["log"] }] */
require('../../../assets/jOWL_1.0/scripts/jOWL.js');

const jOWL = window.jOWL;

const actions = {
  setOntology({ state, commit }, path) {
    commit('startProcessing', 'Loading Ontology...');
    jOWL.load(path, () => {
      commit('setOntologyPath', path);
      commit('setOntology', jOWL);
      commit('stopProcessing');
    });
  },
  searchProperty({ commit, state }, { name, query, propertyName, types }) {
    console.log('searchProperty called', name, query, propertyName, types);
    console.log(jOWL);
    console.log('state.stateObj.schema', state.stateObj.shema, state);
    jOWL.load(state.stateObj.shema, () => {
      const sparql = jOWL.SPARQL_DL(query + propertyName + types); // propVal: "PropertyValue(https://vocabs.acdh.oeaw.ac.at/schema#"  types: ", ?p, ?x)"
      console.log('inside loaded query', sparql, this);
      sparql.execute({ onComplete: (results) => {
        console.log('this', this);
        console.log('results', results);
        commit('setQuery', { name, result: results });
        console.log('state.stateObj', state.stateObj);
        // this.state.stateObj.queries[name] = results;
      } });
    });
  },
};

export default actions;
