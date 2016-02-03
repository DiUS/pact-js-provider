require 'pact/provider/rspec'

require 'faraday'
require 'rack/reverse_proxy'

Pact.service_provider "Animal Service" do
  app do
    Rack::ReverseProxy.new do
      reverse_proxy '/', ENV.fetch('PACT_PROVIDER_BASE_URL')
    end
  end
end

require ENV['PACT_PROJECT_PACT_HELPER'] if ENV.fetch('PACT_PROJECT_PACT_HELPER','') != ''

consumer_name = ENV['PACT_PROVIDER_NAME']
states = [ENV['PACT_PROVIDER_STATE']]

module ProviderStateServerClient
  def set_up_state provider_state
    puts "Setting up provider state '#{provider_state}' using provider state server at #{PROVIDER_STATE_SERVER_SET_UP_URL}"
    Faraday.post(PROVIDER_STATE_SERVER_SET_UP_URL, {"consumer" => consumer_name, "provider_state" => provider_state })
  end
end


block = lambda { |provider_state|
  set_up {

  }
  states.each {|state|
    provider_state(state) {
      no_op
    }
  }

}

Pact.configure do | config |
  config.include ProviderStateServerClient
end

Pact.provider_states_for(consumer_name, &block)
