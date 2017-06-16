# accounts-eve
Up to date Meteor OAuth Package for EVE-Onlines SSO API

## Installation
`meteor add ruohki:accounts-eve`

## Configuration
Put this somewhere in your Servers code:

```javascript
ServiceConfiguration.configurations.upsert({
    service: 'eve',
}, {
    clientId: '<clientId>',
    secret: '<clientSecret>'
});
```
You can obtain those at [https://developers.eveonline.com/](https://developers.eveonline.com/)

## Logging In
Is as easy as calling 
```Javascript
Meteor.loginWithEve();

or

Meteor.loginWithEve({ requestPermissions: [<array of scopes>] }, <callback> );
```

After a successful login the user profile will yield the character name and id.
You can also use the token on the service part to query the api any further.


### Thanks to
lichthagel:accounts-discord wich i used as a template