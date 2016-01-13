'use strict';
import q from 'q';

export default class Pact {
  constructor(options) {
    console.log('created pact instance')
    this.providers = {}
  }

  provider(providerName, statesToRun) {
    this.providers[providerName] = statesToRun
    return this
  }

  providerState(stateName, providerStateTests) {
    if(providerStateTests != undefined) {
      providerStateTests.setup.apply()
    }
    let {setup, execute, teardown} = providerStateTests

    this._runStage.apply(setup)
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
    this.providers.fooConsumer.apply()
    console.log('verfiged')
  }
}