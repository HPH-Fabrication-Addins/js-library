'use strict';

var CinxApi = (function() {

    var apiServer = 'https://api.cinx.com';
    var username = '';
    var password = '';
    var promiseImplementation = null;

    var EnableAbortOnPromise = function(promise, onAbort) {
        promise.abort = onAbort;
        return promise;
    };

    var promiseProvider = function(promiseFunction, onAbort) {
        var returnedPromise;
        if (promiseImplementation !== null) {
            var deferred = promiseImplementation.defer();
            promiseFunction(
                function(resolvedResult) {
                    deferred.resolve(resolvedResult);
                },
                function(rejectedResult) {
                    deferred.reject(rejectedResult);
                }
            );
            returnedPromise = deferred.promise;
        } else {
            if (window.Promise) {
                returnedPromise = new window.Promise(promiseFunction);
            }
        }

        if (returnedPromise) {
            return new EnableAbortOnPromise(returnedPromise, onAbort);
        } else {
            return null;
        }
    };

    var runRequest = function(requestData, callback) {
        var request = new XMLHttpRequest();

        var promiseFunction = function(resolve, reject) {
            function success(data) {
                if (resolve) {
                    resolve(data);
                }
                if (callback) {
                    callback(null, data);
                }
            }

            function failure() {
                if (reject) {
                    reject(request);
                }
                if (callback) {
                    callback(request, null);
                }
            }

            var type = requestData.type || 'GET';
            request.open(type, requestData.url);

            if (requestData.authenticated) {
                request.withCredentials = true;
                request.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));
            }

            if (requestData.contentType) {
                request.setRequestHeader('Content-Type', requestData.contentType)
            }

            request.onreadystatechange = function() {
                if (request.readyState === 4) {
                    var data = null;
                    try {
                        data = request.responseText ? JSON.parse(request.responseText) : '';
                    } catch (e) {
                        console.error(e);
                    }

                    if (request.status >= 200 && request.status < 300) {
                        success(data);
                    } else {
                        failure();
                    }
                }
            };

            if (type === 'GET') {
                request.send(null);
            } else {
                var postData = null
                if (requestData.postData) {
                    postData = requestData.contentType === 'image/jpeg' ? requestData.postData : JSON.stringify(requestData.postData)
                }
                request.send(postData);
            }
        };

        if (callback) {
            promiseFunction();
            return null;
        } else {
            return promiseProvider(promiseFunction, function() {
                request.abort();
            });
        }
    };

    var Constructor = function() {};
    Constructor.prototype = {
        constructor: CinxApi
    };

    Constructor.prototype.pingCinx = function(callback) {
        var requestData = {
            url: `${apiServer}/ping`,
            authenticated: false
        };
        return runRequest(requestData, callback);
    };

    Constructor.prototype.putRequisition = function(b2bId, requisition, callback) {
        var requestData = {
            url: `${apiServer}/sub/${b2bId}/partner/exec/cinx/json-req-import`,
            type: 'PUT',
            postData: requisition,
            authenticated: true
        };
        return runRequest(requestData, callback);
    };

    Constructor.prototype.getSubscriptions = function(callback) {
        var requestData = {
            url: `${apiServer}/sub/user/subscriptions`,
            authenticated: true
        };
        return runRequest(requestData, callback);
    };

    Constructor.prototype.setCredentials = function(user, pwd) {
        username = user;
        password = pwd;
    };

    Constructor.prototype.setPromiseImplementation = function(PromiseImplementation) {
        var valid = false;
        try {
            var p = new PromiseImplementation(function(resolve) {
                resolve();
            });
            if (typeof p.then === 'function' && typeof p.catch === 'function') {
                valid = true;
            }
        } catch (e) {
            console.error(e);
        }
        if (valid) {
            promiseImplementation = PromiseImplementation;
        } else {
            throw new Error('Unsupported implementation of Promises/A+');
        }
    };

    return Constructor;

})();

if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = CinxApi;
}