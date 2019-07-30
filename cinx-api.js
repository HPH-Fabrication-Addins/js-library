'use strict';

var CinxApi = (function() {

    var apiServer = '';
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
            if (requestData.download) {

                request.responseType = 'blob';
            }
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
                        if (requestData.download) {
                            data = new Blob([request.response]);
                        } else {
                            data = request.responseText ? JSON.parse(request.responseText) : '';
                        }

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
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    Constructor.prototype.getSubscriptions = function(callback) {
        var requestData = {
            url: `${apiServer}/subs`,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    Constructor.prototype.postNewProject = function(cinx_api_token, values, callback) {
        var requestData = {
            url: `${apiServer}/sub/${cinx_api_token}/project/create?values=${values}`,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    //Vendors
    Constructor.prototype.getVendors = function(cinx_api_token, callback) {
        var requestData = {
            url: `${apiServer}/sub/${cinx_api_token}/vendors`,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    Constructor.prototype.getVendorDetails = function(cinx_api_token, commerceId, callback) {
        var requestData = {
            url: `${apiServer}/sub/${cinx_api_token}/vendor/${commerceId}/details`,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    Constructor.prototype.postNewVendor = function(cinx_api_token, values, callback) {
        var requestData = {
            url: `${apiServer}/sub/${cinx_api_token}/private/vendor/create?values=${values}`,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    Constructor.prototype.modifyVendor = function(cinx_api_token, vendorId, values, callback) {
        var requestData = {
            url: `${apiServer}/sub/${cinx_api_token}/private/vendor/${vendorId}/modify?values=${values}`,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    //Catalogs
    Constructor.prototype.getCatalogUpdates = function(appId, updateType, callback) {
        var requestData = {
            url: `${apiServer}/sub/${appId}/ipu/updates/${updateType}`,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    Constructor.prototype.getCatalogUpdateFile = function(appId, updateId, callback) {
        var requestData = {
            url: `${apiServer}/sub/${appId}/ipu/update/download/${updateId}/data-file`,
            authenticated: true,
            download: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    Constructor.prototype.setCatalogUpdateFileApplied = function(appId, updateId, values, callback) {
        var requestData = {
            url: `${apiServer}/sub/${appId}/ipu/update/apply/${updateId}?values=${values}`,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    //Job Costs
    Constructor.prototype.putJobCostCostCode = function(cinx_api_token, values, callback) {
        var requestData = {
            url: `${apiServer}/sub/${cinx_api_token}/org-job-cost/modify/material-cost-codes?values=${values}`,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    Constructor.prototype.getJobCostCostCodes = function(cinx_api_token, callback) {
        var requestData = {
            url: `${apiServer}/sub/${cinx_api_token}/org-job-cost/get-list/material-cost-codes`,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    Constructor.prototype.getJobCostPhases = function(cinx_api_token, callback) {
        var requestData = {
            url: `${apiServer}/sub/${cinx_api_token}/org-job-cost/get-list/phases`,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    Constructor.prototype.putJobCostPhase = function(cinx_api_token, values, callback) {
        var requestData = {
            url: `${apiServer}/sub/${cinx_api_token}/org-job-cost/modify/phases?values=${values}`,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    //Projects
    Constructor.prototype.getProjects = function(cinx_api_token, callback) {
        var requestData = {
            url: `${apiServer}/sub/${cinx_api_token}/boms?type=pml`,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    Constructor.prototype.getProjectDetails = function(cinx_api_token, projectId, callback) {
        var requestData = {
            url: `${apiServer}/sub/${cinx_api_token}/project/${projectId}/details`,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    Constructor.prototype.modifyProject = function(cinx_api_token, projectId, values, callback) {
        var requestData = {
            url: `${apiServer}/sub/${cinx_api_token}/project/${projectId}/modify?values=${values}`,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    Constructor.prototype.deleteProject = function(cinx_api_token, projectId, callback) {
        var requestData = {
            url: `${apiServer}/sub/${cinx_api_token}/project/${projectId}/delete`,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    Constructor.prototype.getProjectCosts = function(cinx_api_token, projectId, callback) {
        var requestData = {
            url: `${apiServer}/sub/${cinx_api_token}/project/${projectId}/cost-codes`,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    Constructor.prototype.putProjectCost = function(cinx_api_token, projectId, values, callback) {
        var requestData = {
            url: `${apiServer}/sub/${cinx_api_token}/project/${projectId}/cost-code/create?values=${values}`,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    Constructor.prototype.modifyProjectCost = function(cinx_api_token, pccGuid, values, callback) {
        var requestData = {
            url: `${apiServer}/sub/${cinx_api_token}/project-cost-code/${pccGuid}/modify?values=${values}`,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    //Requisitions
    Constructor.prototype.getRequisitionTemplate = function(cinx_api_token, callback) {
        var requestData = {
            url: `${apiServer}/sub/${cinx_api_token}/template/req`,
            authenticated: true,
            parse: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    Constructor.prototype.putRequisition = function(cinx_api_token, requisition, callback) {
        var requestData = {
            url: `${apiServer}/sub/${cinx_api_token}/partner/exec/cinx/json-req-import?body=json`,
            type: 'PUT',
            postData: requisition,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    //Configuration
    Constructor.prototype.setCredentials = function(user, pwd) {
        username = user;
        password = pwd;
    };
    Constructor.prototype.setApiPathAndVersion = function(server, version) {
        apiServer = `${server}/${version}`;
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