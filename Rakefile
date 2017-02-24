require 'html-proofer'

task :test do
  sh "bundle exec jekyll build"
  HTMLProofer.check_directory("./_site", {
    :url_ignore => [
      # Do not check the ISRG Root test pages - the CI system won't have the X1
      # root available in /etc/ssl/certs to verify "valid-isrgrootx1" and the
      # others are deliberately expired & revoked.
      /expired-isrgrootx1\.letsencrypt\.org/,
      /revoked-isrgrootx1\.letsencrypt\.org/,
      /valid-isrgrootx1\.letsencrypt\.org/,
      # Crates.io returns a JSON error when curl'd unless an "Accept:
      # text/html" header is sent as well. Unfortunately setting that Accept
      # globally causes two other sites (likely using WAFs?) to forbid the
      # requests. For now, ignore crates.io.
      /crates\.io/,
    ],
    :typhoeus => {
      :capath => "/etc/ssl/certs",
      # Libcurl Connection reuse seems flaky on some versions
      # Disabling it outright gives better results
      :forbid_reuse => true,
      # The default Typhoeus timeout is low enough to cause intermitent failures
      # (particularly for one or two slower websites).
      :timeout => 15,
      # Without specifying a browser-like Accept header `crates.io` will return
      # a JSON API error. This Accept header is sourced from Chrome to avoid
      # server configurations blocking non-standard Accept headers (e.g. WAFs)
      :headers => { :Accept => "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" },
    }
  }).run
end
