Eve = {};

OAuth.registerService('eve', 2, null, function (query) {  
  var accessToken = getAccessToken(query);
  var user = getUser(accessToken);

  return {
    serviceData: _.extend(user, { accessToken: OAuth.sealSecret(accessToken) }),
    options: { 
      profile: { 
        name: user.CharacterName,
        id: user.id
      } 
    }
  };
});

var userAgent = 'Meteor';
if (Meteor.release)
  userAgent += '/' + Meteor.release;

var getAccessToken = function (query) {
  var config = ServiceConfiguration.configurations.findOne({ service: 'eve' });
  if (!config)
    throw new ServiceConfiguration.ConfigError();

  var response;
  try {    
    const token = new Buffer(`${config.clientId}:${OAuth.openSecret(config.secret)}`).toString('base64')
    response = HTTP.post(
      'https://login.eveonline.com/oauth/token', {
        headers: {
          Accept: 'application/json',
          'User-Agent': userAgent,
          Authorization: `Basic ${token}`
        },
        followRedirects: true,
        params: {
          grant_type: 'authorization_code',
          code: query.code,
        }
      });
  } catch (err) {
    throw _.extend(new Error('Failed to complete OAuth handshake with EVE-Online. ' + err.message),
      { response: err.response });
  }  
  if (response.data.error) { // if the http response was a json object with an error attribute
    throw new Error('Failed to complete OAuth handshake with EVE-Online. ' + response.data.error);
  } else {
    return response.data.access_token;
  }
};

var getUser = function (accessToken) {
  try {
    const requestData = HTTP.get(
      'https://login.eveonline.com/oauth/verify', {
        headers: {
          'User-Agent': userAgent,
          'Authorization': 'Bearer ' + accessToken
        }
      }).data;
      requestData['id'] = requestData['CharacterID'];
      delete requestData['CharacterID']      
      return requestData;
  } catch (err) {
    throw _.extend(new Error('Failed to fetch user from EVE-Online. ' + err.message),
      { response: err.response });
  }
};

Eve.retrieveCredential = function (credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};