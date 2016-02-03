'use strict';
import q from 'q';
import {rakeVerify} from './rubyVerifier';
import logger from './logger';

export default class ProviderState {
  constructor(providerName, stateName, providerStateTests){
      logger.debug('providerName in constructor', providerName);
    this.providerName = providerName;
    this.stateName = stateName;
    this.providerStateTests = providerStateTests;
  }

  run() {
    let {setup, teardown, options} = this.providerStateTests;
    this.options = options;

    return this._runStage(setup)
        .then(result => {
            logger.info("runStage setup result", result);
            return this._execute(this.options);
        })
        .then(result => {
            logger.info("execute result", result.stdout);
            return this._runStage(teardown);
        })
        .then(result => {
            logger.info("teardown setup result", result);
            Promise.resolve(result);
        })
        .catch(err => {
            logger.error(err.stack);
            Promise.reject(result);
        });
  }

  _runStage(method) {
    logger.debug('_runStage ');
    if(method != undefined) {
      return Promise.resolve(method.apply(this));
    }
    return Promise.reject(new Error('Method is undefined'));
  }

  _execute(options) {
    return rakeVerify(this.providerName, this.stateName, options)
  }
}