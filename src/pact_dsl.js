import Mocha from 'mocha';
import Suite from 'mocha/lib/suite'
import Test from 'mocha/lib/test'
import Pact from './pact'
import logger from './logger';

export default Mocha.interfaces['pact_dsl'] = (suite) => {
  var suites = [suite];
  let pact = null
  let currentProviderState = null

  suite.on('pre-require', (context, file, mocha) => {
    const common = require('mocha/lib/interfaces/common')([suite], context);

    context.run = mocha.options.delay && common.runWithSuite(suite);

    context.provider_states_for = function(provider, consumer, pactFile, url, fn) {
      var suite = Suite.create(suites[0], provider);
      let options = {}
      options.pactUrl = pactFile;
      options.baseUrl = url
      pact = new Pact(provider, consumer, options)
      suite.file = file;
      suites.unshift(suite);

      fn.call(suite);

      suites.shift();
      return suite;
    };

    context.providerState = function(providerState, fn) {
      var suite = Suite.create(suites[0], providerState);
      suites.unshift(suite);
      currentProviderState = providerState

      fn.call(suite);
      suites.shift();
      return suite;
    };

    context.setUp = function(fn) {
      suites[0].beforeEach(fn);
    }
    context.tearDown= function(fn) {
      suites[0].afterEach(fn);
    }

    context.it = (fn) => {
      let suite = suites[0];
      let test = new Test(pact.provider, pact.providerState.bind(pact, currentProviderState));
      suite.addTest(test);

      return test;
    }

    /**
     * Describes a specification or test-case with the given `title`
     * and callback `fn` acting as a thunk.
     */
    context.test = (title, fn) => {
      const test = new Test(title, fn);
      test.file = file;
      suite.addTest(test);

      return test;
    };
  });
};
