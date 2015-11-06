/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-development-headers',

  serverMiddleware: function(config) {
    var config = this.project.config(process.env.EMBER_ENV);

    if (!config.developmentHeaders) {
      console.warn('Please add developmentHeaders to your config.');
    } else {
      config.app.use(function(req, res, next) {
        for (var i = 0; i < config.developmentHeaders.length; ++i) {
          var header = config.developmentHeaders[i];
          var key = header['key'];
          var value = header['value'];
          if (key && value) {
            res.setHeader(key, value);
          } else {
            console.warn('Improperly formatted header in developmentHeader config. Got:');
            console.warn(header);
            console.warn('Expected something of the form { key: "key", value: "value" }');
          }
        }
      });
    }
  },
};
