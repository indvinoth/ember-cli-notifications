/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-notifications',
  included: function(app) {
    this._super.included(app);

    // Use config to determine whether Font Awesome is imported into consuming app
    this.importFontAwesome(app);
  },

  importFontAwesome: function(app) {
    var projectConfig = this.project.config(app.env);
    var config = projectConfig['ember-cli-notifications'] ||
                 { includeFontAwesome: false };

    if (config.includeFontAwesome) {
      app.import(app.bowerDirectory + '/semantic/dist/themes/default/assets/fonts/icons.eot', {
        destDir: 'fonts'
      });
      app.import(app.bowerDirectory + '/semantic/dist/themes/default/assets/fonts/icons.svg', {
        destDir: 'fonts'
      });
      app.import(app.bowerDirectory + '/semantic/dist/themes/default/assets/fonts/icons.ttf', {
        destDir: 'fonts'
      });
      app.import(app.bowerDirectory + '/semantic/dist/themes/default/assets/fonts/icons.woff', {
        destDir: 'fonts'
      });
      app.import(app.bowerDirectory + '/semantic/dist/themes/default/assets/fonts/icons.woff2', {
        destDir: 'fonts'
      });
      app.import(app.bowerDirectory + '/semantic/dist/components/icon.css');
    }
  }
};
