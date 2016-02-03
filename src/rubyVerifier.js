'use strict';
import childProcess from 'child_process';
import {exec} from 'child-process-promise';

import q from 'q'
import logger from './logger';


// const BUNDLE_EXEC_RAKE = 'bundle exec rake PactVerification:pact_verify[${pactUrl},${providerUrl}]'
export function rakeVerify(providerName, stateName, options) {
    logger.info('rake options ');
    logger.debug('providerName', providerName);
    logger.debug('stateName', stateName);
    logger.debug('options', options);


    let pactUrl = options.pactUrl;
    let providerUrl = options.baseUrl;

    let BUNDLE_EXEC_RAKE = `bundle exec rake --rakefile ./node_modules/pact-js-provider/Rakefile PactVerification:pact_verify[${pactUrl},${providerUrl},\'${providerName}\','${stateName}']`
    let cmd = BUNDLE_EXEC_RAKE;
    logger.info('cmd', cmd);
    return exec(cmd)
        .then((result) => {
            logger.debug("rake executed");
            logger.info(result.stdout);
            return Promise.resolve(result);
        })
        .fail((err) => {
            logger.error("Pact failed for " + providerName + " for state " + stateName);
            logger.error(err.stdout);
            return Promise.reject(err);
        });
}
