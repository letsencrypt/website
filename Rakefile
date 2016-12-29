require 'html-proofer'

task :test do
  sh "bundle exec jekyll build"
  HTMLProofer.check_directory("./_site", {
    :typhoeus => {
      :ssl_capath => "/etc/ssl/certs"
    }
  }).run
end
