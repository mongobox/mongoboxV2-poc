set :application, "Mongobox V2"
set :domain,      "mongobox.fr"
set :deploy_to,   "/var/www/mongobox_v2"

set :app_path,    "app"
set :web_path, 	  "web"
set :var_path, 	  "var"
set :bin_path, 	  "bin"

set :symfony_console, fetch(:bin_path) + "/console"
set :symfony_console_path,  fetch(:bin_path) + "/console"
set :dump_assetic_assets, false


# The next 3 settings are lazily evaluated from the above values, so take care
# when modifying them
set :app_config_path, "app/config"
set :log_path, "var/logs"
set :cache_path, "var/cache"
set :sessions_path, "var/sessions"

set :branch,      "master"
set :repository,  "git@github.com:mongobox/mongoboxV2.git"
set :scm,         :git
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `subversion`, `mercurial`, `perforce`, or `none`

set :deploy_via, :remote_cache
set :model_manager, "doctrine"
# Or: `propel`

role :web,        domain                         # Your HTTP server, Apache/etc
role :app,        domain, :primary => true       # This may be the same as your `Web` server

 
# General config stuff
set :keep_releases,	3
set :shared_files,      ["app/config/parameters.yml"] # This stops us from having to recreate the parameters file on every deploy.
set :shared_children,   [var_path + "/logs", web_path + "/documentation", "vendor"]

set :use_composer, true
set :permission_method, :acl

set :symfony_console_flags, "--no-debug"

# asset management
set :assets_install_path, "web"
set :assets_install_flags,  '--symlink'

# after first deployment you might want to change this to false. Setting to true will always install vendors each time
set :update_vendors,  true
set :dump_assetic_assets, true

# Confirmations will not be requested from the command line.
set :interactive_mode, false

# User details for the production server
set :user, "mongobox"
set :use_sudo, false

set :writable_dirs,       [var_path + "/cache", var_path + "/logs", var_path + "/sessions"]
set :webserver_user,      "www-data"


ssh_options[:forward_agent] = true
ssh_options[:config]        = false

# Be more verbose by uncommenting the following line
logger.level = Logger::MAX_LEVEL