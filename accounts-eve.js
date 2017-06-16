Accounts.oauth.registerService('eve');

if (Meteor.isClient) {
  Meteor.loginWithEve = function (options, callback) {
    // support a callback without options
    if (!callback && typeof options === 'function') {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Eve.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    forLoggedInUser: ['services.eve'],
    forOtherUsers: ['services.eve.character']
  });
}