'use strict';
import childProcess from 'child_process'
import q from 'q'
import winston from 'winston'

let logger = new winston.Logger()

// const BUNDLE_EXEC_RAKE = 'bundle exec rake PactVerification:pact_verify[${pactUrl},${providerUrl}]'
export function rakeVerify(providerName, stateName, options) {
  logger.debug('rake options ')
  logger.debug(providerName)
  logger.debug(stateName)
  logger.debug(options)

  let deferred = q.defer();

  let pactUrl = options.pactUrl
  let providerUrl = options.baseUrl

  let BUNDLE_EXEC_RAKE = `bundle exec rake --rakefile ./node_modules/pact-js-provider/Rakefile PactVerification:pact_verify[${pactUrl},${providerUrl},\'${providerName}\','${stateName}']`

  let cmd = BUNDLE_EXEC_RAKE
  childProcess.exec(cmd, (error, stdout) => {

    if (error) {
      logger.error(error)
      deferred.reject(new Error('pact:verify failed: ' + error.message))
    } else {

      logger.info('success')
      console.info(stdout.toString());

      deferred.resolve();
  }
  });
  return deferred.promise;
};