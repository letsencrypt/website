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
      # Do not check the 'certificateautomation.com' website - it has a broken
      # TLS configuration (missing intermediate)
      /certificateautomation\.com/,
      # TLS 1.2 only sites are currently broken
      # TODO(@cpu): figure out how to upgrade Curl in CI
      /www\.froxlor\.org/,
      /kristaps\.bsd\.lv/,
      # The ALA website seems to time out, skip it
      # TODO(@cpu): figure out how to tweak typhoeus timeout
      /www\.ala\.org/,
      # Crates.io returns errors when curl'd. Maybe UA/Content Type sniffing?
      # TODO(@cpu): figure out how to curl https://crates.io/ for HTML
      /crates\.io/,
      # Compose.com seems to have load balancing and at least 1 server fails
      # with a hostname mismatch error
      /compose\.com/,
      # Mojzis.com is failing with "SSL connect error", unclear why
      # TODO(@cpu): diagnose mojzis.com TLS error
      /mojzis\.com/,
    ],
    :typhoeus => {
      :capath => "/etc/ssl/certs",
    }
  }).run
end
