require 'uri'

module Jekyll
  module EncodeURIComponent
    def encodeURIComponent(content)
      URI.escape(content, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))
    end

    def removeTrailingSlash(content)
      content.gsub(/\\$/, '')
    end
  end
end

Liquid::Template.register_filter(Jekyll::EncodeURIComponent)
