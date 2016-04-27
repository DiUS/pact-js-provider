'use strict';
import child_process from 'child_process';
import {exec} from 'child-process-promise';

import {Promise} from 'es6-promise';
import logger from './logger';

export function rakeVerify(consumerName, stateName, options) {
    let pactUrl = options.pactUrl;
    let providerUrl = options.baseUrl;

    let BUNDLE_EXEC_RAKE = `BUNDLE_GEMFILE=./node_modules/pact-js-provider/Gemfile bundle exec rake --rakefile ./node_modules/pact-js-provider/Rakefile PactVerification:pact_verify[${pactUrl},${providerUrl},\'${consumerName}\','${stateName}']`
    let cmd = BUNDLE_EXEC_RAKE;
    logger.debug('cmd', cmd);
    return child_process.execSync(cmd, {stdio:[0,1,2]})
}
