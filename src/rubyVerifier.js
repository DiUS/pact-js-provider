'use strict';
import childProcess from 'child_process'
import {exec} from 'child-process-promise'

import q from 'q'
import winston from 'winston'
let logger = winston


// const BUNDLE_EXEC_RAKE = 'bundle exec rake PactVerification:pact_verify[${pactUrl},${providerUrl}]'
export function rakeVerify(providerName, stateName, options, done) {
  logger.info('rake options ')
  logger.debug(providerName)
  logger.debug(stateName)
  logger.debug(options)

  let pactUrl = options.pactUrl
  let providerUrl = options.baseUrl

  let BUNDLE_EXEC_RAKE = `bundle exec rake --rakefile ./node_modules/pact-js-provider/Rakefile PactVerification:pact_verify[${pactUrl},${providerUrl},\'${providerName}\','${stateName}']`
  let cmd = BUNDLE_EXEC_RAKE

  return exec(cmd)
    .then( (result) => {
      logger.debug("rake executed")
      logger.info(result.stdout)
      done()
      return result
    })
    .fail((err) => {
      logger.error("Pact failed for " + providerName + " for state " + stateName)
      logger.error(err.stdout)
      done()
      return
    })

};