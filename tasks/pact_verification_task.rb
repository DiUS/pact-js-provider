module PactRake
  class Task
    def rake_task(pact_uri, provider_base_url, provider_name, state_name)
      puts pact_uri
      puts provider_base_url
      puts provider_name
      ENV['PACT_PROVIDER_NAME'] = provider_name
      ENV['PACT_PROVIDER_STATE'] = state_name

      require 'pact/provider/proxy/task_helper'

      proxy_pact_helper = File.expand_path('../../spec/support/pact_helper.rb', __FILE__)
      pact_spec_configs = []
      pact_spec_configs << {pact_uri: pact_uri, pact_helper: proxy_pact_helper}


      exit_statuses = pact_spec_configs.collect do | config |
        ENV['PACT_PROVIDER_BASE_URL'] = provider_base_url
        ENV['PACT_PROJECT_PACT_HELPER'] = config[:pact_helper]
        Pact::Provider::Proxy::TaskHelper.execute_pact_verify config[:pact_uri], proxy_pact_helper
      end

      Pact::Provider::Proxy::TaskHelper.handle_verification_failure do
        exit_statuses.count{ | status | status != 0 }
      end
    end
  end
end
