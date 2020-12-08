# frozen_string_literal: true

source "https://rubygems.org"

# repo_name "alexsab/kmu"

git_source(:github) {|repo_name| "https://github.com/#{repo_name}.git" }

# gem "rails"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve --port 4000
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!

# For local development uncomment "gem "jekyll"" below and 
# comment "gem "github-pages"" then run `bundle update`
gem "jekyll", "~> 4.1.1"

# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
# gem "github-pages", group: :jekyll_plugins

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag", "~> 2.6"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
gem 'jekyll-browsersync', group: [:jekyll_plugins]
gem 'jekyll-sitemap', group: [:jekyll_plugins]