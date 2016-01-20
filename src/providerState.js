'use strict';
import q from 'q';
import {rakeVerify} from './rubyVerifier'
import winston from 'winston'

let logger = winston

export default class ProviderState {
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