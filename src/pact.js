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

  provider_states_for(providerName, statesToRun) {
    logger.info('providerName', providerName);
    logger.info('statesToRun', statesToRun);
    this.currentProvider = providerName;
    this.providers[providerName] = statesToRun;
    logger.info('Provider State', this.providers);
    return this
  }

  providerState(stateName, providerStateTests) {
    logger.info('Running provider state ' + stateName);
    let currentState = new ProviderState(this.currentProvider, stateName, providerStateTests)
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
