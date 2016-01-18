'use strict';
import q from 'q';
import {rakeVerify} from './rubyVerifier'


export default class Pact {
  constructor(options) {
    console.log('created pact instance')
    this.providers = {}
    this.providerStates = []
  }

  rakeVerify(options) {
    rakeVerify(options)
  }

  provider_states_for(providerName, statesToRun) {
    this.providers[providerName] = statesToRun
    return this
  }

  providerState(stateName, providerStateTests) {
    console.log('Running provider state ' + stateName)
    let {setup, execute, teardown} = providerStateTests

    this._runStage(setup)
      .then(this._runStage(execute))
      .then(this._runStage(teardown))
  }

  _runStage(method) {
    let deferred = q.defer()
    if(method != undefined) {
      method.apply(this, [deferred])
    }
    return deferred.promise
  }

  verify() {
    console.log('verifys fn')

    for(var currentProviderState in this.providers) {
      console.log('Running provider ' + currentProviderState)
      this.providers[currentProviderState].apply()
    }
    console.log('verfiged')
  }
}