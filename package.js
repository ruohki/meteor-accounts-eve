Package.describe({
  name: 'ruohki:accounts-eve',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Adds account support for EVE Online',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/ruohki/meteor-accounts-eve',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.4.1.2');

  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use('underscore', 'client');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.use('accounts-base', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);

  api.export('EVE');

  api.addFiles('eve_server.js', 'server');

  api.addFiles('eve_client.js', 'client');

  api.addFiles('accounts-eve.js');
});