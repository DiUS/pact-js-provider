'use strict';
import childProcess from 'child_process'
import q from 'q'
// const BUNDLE_EXEC_RAKE = 'bundle exec rake PactVerification:pact_verify[${pactUrl},${providerUrl}]'
export function rakeVerify(options) {
    let deferred = q.defer();

    let pactUrl = options.pactUrl
    let providerUrl = options.baseUrl
    let BUNDLE_EXEC_RAKE = `bundle exec rake PactVerification:pact_verify[${pactUrl},${providerUrl}]`

    let cmd = BUNDLE_EXEC_RAKE
    childProcess.exec(cmd, (error, stdout) => {
      console.log('exec bundle here')
      console.log(stdout.toString());

      if (error) {
        console.log(error)
        deferred.reject(new Error('pact:verify failed: ' + error.message))
      } else {

        console.log('success')
        console.log(stdout.toString());

        deferred.resolve();
    }
    });
    return deferred.promise;
};