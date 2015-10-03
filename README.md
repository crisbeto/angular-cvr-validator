# Angular CVR validator

AngularJS module that checks whether an input's value is a valid Danish CVR number.
Checks client-side with a modulus check and in the public registry.

## [Demo](http://crisbeto.github.io/angular-cvr-validator/)

## Install

Include Angular and [cvr.min.js](https://raw.githubusercontent.com/crisbeto/angular-cvr-validator/master/cvr.min.js) or [cvr.js](https://raw.githubusercontent.com/crisbeto/angular-cvr-validator/master/cvr.js) in your page. You can use npm, bower, or a script-tag:

`npm install angular-cvr-validator`

or

`bower install angular-cvr-validator`

or

`<script src="http://crisbeto.github.io/angular-cvr-validator/cvr.min.js"></script>`


Add `angular-cvr-validator` to your app's module dependencies:

```javascript
angular.module('someModule', ['angular-cvr-validator'])
```

## Checking the public registry
The directive automatically polls the public registry to check if the CVR number is present.
You can access the data through the directives ngModel controller (you can refer to the demo to see how its being done).
If the data is not found on the registry or there was an http error, a `$warning` flag gets set on the ngModel controller.

You can disable the registry check by editing the `checkRegistry` property in the `validateCvrConfig` constant.

### Example:

```html
<input ng-model="cvr" name="cvr" validate-cvr>
```

## Development

*  `npm install` to install development dependencies
*  `grunt` to build minified demo in build/
*  `grunt deploy` to build minified demo and push it to gh-pages branch
