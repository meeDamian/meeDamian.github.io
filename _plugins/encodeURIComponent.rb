# EncodeURIComponent for Octopress
# rcmdnk (https://github.com/rcmdnk/octopress-encodeURIComponent)
require 'uri'

module Jekyll
  module EncodeURIComponent
    def encodeURIComponent(content)
      URI.escape(content, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))
    end
  end
end

Liquid::Template.register_filter(Jekyll::EncodeURIComponent)
