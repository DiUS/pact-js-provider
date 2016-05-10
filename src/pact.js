'use strict';
import {Promise} from 'es6-promise';
import {rakeVerify} from './rubyVerifier'
import logger from './logger';
import _ from 'lodash'
import Mocha from 'mocha'
import fs from 'fs'
import path from 'path'
import pact_dsl from './pact_dsl'

function onFailure(failures) {
  process.on('exit', () =>  {
    process.exit(failures);
  })
}

export function runPact(...tests) {
  let mocha = new Mocha({
    ui: 'pact_dsl'
  })

 _(tests).forEach( (test) => {
   mocha.addFile(test)
 })
 mocha.run(onFailure)
}

export default class Pact {
  constructor(provider, consumer, options) {
    this.provider = provider
    this.consumer = consumer;
    this.options = options
  }

  providerState(stateName) {
    logger.debug('Running provider state ' + stateName);
    logger.debug('Test', this.consumer);
    return rakeVerify(this.consumer, stateName, this.options)
  }
}
