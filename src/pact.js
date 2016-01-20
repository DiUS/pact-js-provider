'use strict';
import q from 'q';
import {rakeVerify} from './rubyVerifier'
import winston from 'winston'
import ProviderState from './providerState'

let logger = winston

export default class Pact {
  constructor(options) {
    logger.info('created pact instance')
    this.providers = {}
    this.providerStates = []
  }

  provider_states_for(providerName, statesToRun) {
    this.currentProvider = providerName
    this.providers[providerName] = statesToRun
    return this
  }

  providerState(stateName, providerStateTests) {
    logger.info('Running provider state ' + stateName);

    let currentState = new ProviderState(this.currentProvider, stateName, providerStateTests)
    currentState.run()
  }


  verify() {
    logger.info('verifing');

    for(var currentProviderState in this.providers) {
      logger.info('Running provider ' + currentProviderState)
      this.providers[currentProviderState].apply()
    }
    logger.info('verified')
  }
}
