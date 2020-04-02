# require 'compass/import-once/activate'
# Require any additional compass plugins here.
require 'sass-globbing'
require 'sass-utilities'

# Set this to the root of your project when deployed:
# AEMの仕様上、CSSを個別に読み込むには用途別のフォルダ分けが必要なため、_SCSSのみまとめた構成とする
http_path = "/"
css_dir = "/"
sass_dir = "_scss"
images_dir = "/"
javascripts_dir = "/"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false

# Autoprefixer
require 'autoprefixer-rails'
require 'csso'

on_stylesheet_saved do |file|
  css = File.read(file)
  File.open(file, 'w') do |io|
    io << AutoprefixerRails.process(css, browsers: ["iOS >= 8.0", "android >= 4.1", "ie >= 11"])
  end
end


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass