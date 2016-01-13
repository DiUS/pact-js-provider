require 'pact/provider/proxy/tasks'
require 'pact/provider/proxy/task_helper'
require 'rake/tasklib'
require './tasks/pact_verification_task'

$: << File.join(File.dirname(__FILE__), "lib")

namespace :PactVerification do

  desc 'Run our pact task'
  task :pact_verify, [:pact_uri, :provider_url] do |t, args|
    PactRake::Task.new.rake_task(args.pact_uri,args.provider_url)
  end
end