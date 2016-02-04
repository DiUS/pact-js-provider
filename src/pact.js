'use strict';
import {Promise} from 'es6-promise';
import {rakeVerify} from './rubyVerifier'
import logger from './logger';
import ProviderState from './providerState'
import _ from 'lodash'

export default class Pact {
  constructor() {
    this.providers = {};
    this.consumber = '';
  }

  provider_states_for(consumerName, statesToRun) {
    this.providers[consumerName] = statesToRun;
    this.consumber = consumerName;
    return this
  }

  providerState(stateName, providerStateTests) {
    logger.debug('Running provider state ' + stateName);
    logger.debug('Test', this.consumber);
    let currentState = new ProviderState(this.consumber, stateName, providerStateTests);
    return currentState.run();
  }

  verify() {
    logger.info('start verifing');
    let promises = [];
    for(let currentProvider in this.providers) {
      promises.push(this.providers[currentProvider]());
    };
    return Promise.all(promises);
  }
}
