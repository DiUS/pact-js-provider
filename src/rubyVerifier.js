'use strict';
import childProcess from 'child_process';
import {exec} from 'child-process-promise';

import {Promise} from 'es6-promise';
import logger from './logger';

export function rakeVerify(consumerName, stateName, options) {
    logger.debug('################## rake verify###########');
    logger.debug('rake options ', options);
    logger.debug('providerName', consumerName);
    logger.debug('stateName', stateName);
    logger.debug('#########################################');


    let pactUrl = options.pactUrl;
    let providerUrl = options.baseUrl;

    let BUNDLE_EXEC_RAKE = `bundle exec rake --rakefile ./node_modules/pact-js-provider/Rakefile PactVerification:pact_verify[${pactUrl},${providerUrl},\'${consumerName}\','${stateName}']`
    let cmd = BUNDLE_EXEC_RAKE;
    logger.debug('cmd', cmd);
    return exec(cmd)
        .then((result) => {
            logger.debug('rake executed result');
            logger.info('stdout:', result.stdout);
            if(result.stderr){
                logger.error('rake failed stderr:', stderr);
            }
            return Promise.resolve(result);
        })
        .fail(err => {
            logger.error("Pact failed for " + consumerName + " for state " + stateName);
            logger.error('Error: ', err.stdout);
            if(err.stderr){
                logger.error('rake failed stderr:', err.stderr);
            }
            return Promise.reject(err);
        })
        .progress(childProcess => {
            logger.info('childProcess.pid: ', childProcess.pid);
        });
}

