require 'pact/provider/rspec'

require 'sequel'
require 'db'
require 'animal_repository'
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

module ProviderStateServerClient

  def set_up_state provider_state
    puts "Setting up provider state '#{provider_state}' using provider state server at #{PROVIDER_STATE_SERVER_SET_UP_URL}"
    Faraday.post(PROVIDER_STATE_SERVER_SET_UP_URL, {"consumer" => "Zoo App", "provider_state" => provider_state })
  end

end

Pact.configure do | config |
  config.include ProviderStateServerClient
end


Pact.provider_states_for "Zoo App" do

  set_up do
    # AnimalService::DATABASE[:animals].truncate
  end

  provider_state "there is an alligator named Mary" do
    set_up do
      # AnimalService::DATABASE[:animals].insert(name: 'Mary')
    end
  end

  provider_state "there is not an alligator named Mary" do
    no_op
  end

  provider_state "an error occurs retrieving an alligator" do
    set_up do
      # allow(AnimalService::AnimalRepository).to receive(:find_alligator_by_name).and_raise("Argh!!!")
    end
  end
end