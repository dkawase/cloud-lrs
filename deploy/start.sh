#!/bin/sh

# Make sure nothing else is running before we start the app server
./deploy/stop.sh

# The directory where forever logs should be sent to
LOG_DIR= ~/logs

#npm install -g bower

npm install </path/to/caliper-js-develop>

npm install

#bower install

# copy static assets to Document Root
#cp -R public /var/www/html/

# Start the app server
node_modules/.bin/forever -a -l "$LOG_DIR/forever.log" -i "$LOG_DIR/forever_app.log" -e "$LOG_DIR/forever_app.log" -m 10 start app.js
#node_modules/.bin/forever -a -m 10 start app.js
