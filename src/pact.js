'use strict';
import q from 'q';
import {rakeVerify} from './rubyVerifier'


export default class Pact {
  constructor(options) {
    console.log('created pact instance')
    this.providers = {}
    this.providerStates = []
  }

  provider_states_for(providerName, statesToRun) {
    this.currentProvider = providerName
    this.providers[providerName] = statesToRun
    return this
  }

  providerState(stateName, providerStateTests) {
    console.log('Running provider state ' + stateName)

    let currentState = new ProviderState(this.currentProvider, stateName, providerStateTests)
    currentState.run()
  }


  verify() {
    console.log('verifing')

    for(var currentProviderState in this.providers) {
      console.log('Running provider ' + currentProviderState)
      this.providers[currentProviderState].apply()
    }
    console.log('verified')
  }
}

class ProviderState {
  constructor(providerName, stateName, providerStateTests){
    this.providerName = providerName
    this.stateName = stateName
    this.providerStateTests = providerStateTests
  }

  run() {
    let {setup, teardown, options} = this.providerStateTests
    this.options = options

    this._runStage(setup)
      .then(this._execute(this.options))
      .then(this._runStage(teardown))
  }

  _runStage(method) {
    let deferred = q.defer()
    if(method != undefined) {
      method.apply(this, [deferred])
    }
    return deferred.promise
  }

  _execute(options) {
    return rakeVerify(this.providerName, this.stateName, this.options)
  }


}