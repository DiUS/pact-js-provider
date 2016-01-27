'use strict';
import q from 'q';
import {rakeVerify} from './rubyVerifier'
import logger from './logger';
import ProviderState from './providerState'
import _ from 'lodash'

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

    let currentState = new ProviderState(this.currentProvider,
      stateName, providerStateTests)
    // return currentState.run()
    return new Promise((resolve, reject) => {
      currentState.run(resolve, reject)
    })


    // return new Promise((resolve, reject) => {
    //   currentState.run()
    //   resolve()
    // })
    // return Promise.resolve(currentState.run())

  }

  verify() {
    logger.info('verifing');

    this.promise = Promise.resolve(null)
    for(let currentProvider in this.providers) {

      this.promise.then((result) => {
        return this.providers[currentProvider].apply()
      })
    }

    logger.info('verified')
  }
}
