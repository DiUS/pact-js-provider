Node Provider for Pact
=======

Matches pact for Providers. See PACT for details.

Setup
=======

Requirements
* You will need Ruby 2+. You can install this via ruby-install, [rvm](https://rvm.io/) or [chruby](https://github.com/postmodern/chruby).
* bundler
* node (tested on version 4.2.1)
* npm
* babel (if you want to make contributions)

Install bundler with:
```
gem install bundler
bundle --version
```
Should print something like:
```
Bundler version 1.11.2
```

Any project using Pact will then on preinstall run 'bundle install' to install the ruby dependencies.


See [test repo](https://github.com/DiUS/pact-js-provider-test)


## Links
[Pacts](https://github.com/realestate-com-au/pact) - ruby reference implementation
 
[Simplifying microservices testing with pacts](http://dius.com.au/2014/05/19/simplifying-micro-service-testing-with-pacts/) - Ron Holshausen (one of the original pact authors)

[Pact specification](https://github.com/pact-foundation/pact-specification)

[Integrated tests are a scam](https://vimeo.com/80533536) - J.B. Rainsberger

[Consumer Driven Contracts](http://martinfowler.com/articles/consumerDrivenContracts.html) - Ian Robinson

[Integration Contract Tests](http://martinfowler.com/bliki/IntegrationContractTest.html) - Martin Fowler

## Roadmap
See [ROADMAP.md](/ROADMAP.md).

## Contributing

See [CONTRIBUTING.md](/CONTRIBUTING.md).

[pact_broker]: https://github.com/bethesque/pact_broker
[pact_broker-client]: https://github.com/bethesque/pact_broker-client
[pact-public-apis]: https://github.com/realestate-com-au/pact/wiki/Why-Pact-may-not-be-the-best-tool-for-testing-public-APIs
[pass-through-apis]: https://github.com/realestate-com-au/pact/wiki/Why-Pact-may-not-be-the-best-tool-for-testing-pass-through-APIs
[gotchas]: https://github.com/realestate-com-au/pact/wiki/Matching-gotchas

