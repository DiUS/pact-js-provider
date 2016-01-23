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

  run(done, reject) {
    let {setup, teardown, options} = this.providerStateTests
    this.options = options

    return new Promise((resolve, reject) => {
          this._runStage(setup, resolve)
        })
        .then((result) => {
          return new Promise((resolve, reject) => {
            this._execute(this.options, resolve)
          })
        })
        .then((result) => {
          return new Promise((resolve, reject) => {
            this._runStage(teardown, resolve)
          })
        })
        .then((result) => {
          done()
        })
      .catch( (err) => {
        console.log(err)
        logger.error(err.stack)
        reject()
      })
  }

  _runStage(method, done) {
    logger.debug('_runStage ')

    if(method != undefined) {
      return method.apply(this, [done])
    }
    return ''
  }

  _execute(options, done) {
    return rakeVerify(this.providerName, this.stateName, this.options, done)
  }
}