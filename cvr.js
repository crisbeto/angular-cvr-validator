'use strict';

angular.module('angular-cvr-validator', [])
    .constant('validateCvrConfig', {
        checkRegistry: true,
        cvrRegex: /^\d{8}$/,
        cleanupRegex: /-/g,
        controlNumbers: [2, 7, 6, 5, 4, 3, 2, 1] // via https://erhvervsstyrelsen.dk/modulus-11-kontrol
    })
    .directive('validateCvr', ['$http', 'validateCvrConfig', function($http, validateCvrConfig){

        var isValidCvr = function(val){
            if(!val) return false;

            var value = (val + '').replace(validateCvrConfig.cleanupRegex, '');

            if(validateCvrConfig.cvrRegex.test(value)){
                return isModulus11(value) ? value : false;
            }

            return false;
        };

        var isModulus11 = function(val){
            var components  = (val + '').split('');
            var control     = validateCvrConfig.controlNumbers;
            var sum         = 0;

            angular.forEach(components, function(current, index){
                var currentControl = control[index];
                sum += current*currentControl;
            });

            return sum % 11 === 0;
        };

        return {
            require: 'ngModel',
            scope: {
                checkRegistry: '='
            },
            link: function (scope, elem, attrs, ctrl) {
                var validator = function(val){
                    var isValid = isValidCvr(val);
                    var checkRegistry = angular.isDefined(scope.checkRegistry) ? scope.checkRegistry : validateCvrConfig.checkRegistry;

                    ctrl.$setValidity('cvr', !!isValid);

                    // The warning is so we can show whether the number is present in
                    // the public registry
                    if(isValid && checkRegistry){
                        $http.jsonp('//cvrapi.dk/api?vat='+ isValid +'&country=dk&callback=JSON_CALLBACK').then(function(response){
                            var data = response.data;
                            var hasError = data.hasOwnProperty('error');

                            ctrl.$warning = hasError;
                            ctrl.$cvrData = hasError ? null : data;
                        }, function(){
                            ctrl.$warning = true;
                            ctrl.$cvrData = null;
                        });
                    }else{
                        ctrl.$warning = false;
                        ctrl.$cvrData = null;
                    }

                    return isValid || undefined;
                };

                ctrl.$parsers.push(validator);
                ctrl.$formatters.push(validator);
            }
        };
    }
]);
