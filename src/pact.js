'use strict';
import {Promise} from 'es6-promise';
import {rakeVerify} from './rubyVerifier'
import logger from './logger';
import ProviderState from './providerState'
import _ from 'lodash'
import Mocha from 'mocha'
import fs from 'fs'
import path from 'path'
import pact_dsl from './pact_dsl'


export function runPact(test) {
  let mocha = new Mocha(
  {
    ui: 'pact_dsl'
  })

  mocha.addFile(test)

  mocha.run(function(failures) {
    process.on('exit', function () {
      process.exit(failures);
    });
  })
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
