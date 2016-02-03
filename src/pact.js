'use strict';
import q from 'q';
import {rakeVerify} from './rubyVerifier'
import logger from './logger';
import ProviderState from './providerState'
import _ from 'lodash'

export default class Pact {
  constructor() {
    logger.info('created pact instance')
    this.providers = {};
    this.providerStates = [];
  }

  provider_states_for(consumerName, statesToRun) {
    this.providers[consumerName] = statesToRun;
    return this
  }

  providerState(consumerName ,stateName, providerStateTests) {
    logger.info('Running provider state ' + stateName);
    let currentState = new ProviderState(consumerName, stateName, providerStateTests)
    return currentState.run();
  }

  verify() {
    logger.info('verifing');
    let promises = [];
    for(let currentProvider in this.providers) {
      promises.push(new Promise((resolve, reject) => {
          resolve(this.providers[currentProvider].apply())}).catch(err => {reject(err);}));
    };
    return Promise.all(promises).then(()=>{logger.info('verified')}).catch(err => logger.error(err));
  }
}
