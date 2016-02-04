'use strict';
import {Promise} from 'es6-promise';
import {rakeVerify} from './rubyVerifier';
import logger from './logger';

export default class ProviderState {
  constructor(providerName, stateName, providerStateTests) {
    this.providerName = providerName;
    this.stateName = stateName;
    this.providerStateTests = providerStateTests;
  }

  run() {
    let {setup, teardown, options} = this.providerStateTests;
    this.options = options;

    return this._runStage(setup)
      .then(
        () => {
          return this._execute(this.options);
        })
      .then(
        () => {
          return this._runStage(teardown);
        }, () => {
          return this._runStage(teardown);
        })
      .then(
        result => {
          return Promise.resolve(result);
        })
      .catch(err => {
        logger.error(err.stack);
        return Promise.reject(err);
      });
  }

  _runStage(method) {
    logger.debug('_runStage ');
    if (method != undefined) {
      return new Promise((resolve, reject) => {
        return method.apply(this, [resolve, reject]);
      });
    }
    return Promise.reject(new Error('Method is undefined'));
  }

  _execute(options) {
    return rakeVerify(this.providerName, this.stateName, options);
  }
}
