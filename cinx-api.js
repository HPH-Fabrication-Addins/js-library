'use strict';

var CinxApi = (function () {

    var apiServer = '';
    var username = '';
    var password = '';
    var promiseImplementation = null;

    var EnableAbortOnPromise = function (promise, onAbort) {
        promise.abort = onAbort;
        return promise;
    };
    var promiseProvider = function (promiseFunction, onAbort) {
        var returnedPromise;
        if (promiseImplementation !== null) {
            var deferred = promiseImplementation.defer();
            promiseFunction(
                function (resolvedResult) {
                    deferred.resolve(resolvedResult);
                },
                function (rejectedResult) {
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
    var runRequest = function (requestData, callback) {
        var request = new XMLHttpRequest();

        var promiseFunction = function (resolve, reject) {
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

            request.onreadystatechange = function () {
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
            return promiseProvider(promiseFunction, function () {
                request.abort();
            });
        }
    };
    var addParameters = function (url, parameters) {
        var qs = '';
        for (var key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                var value = parameters[key];
                qs += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
            }
        }
        if (qs.length > 0) {
            // chop off last '&'
            qs = qs.substring(0, qs.length - 1);
            url = url + '?' + qs;
        }
        return url;
    };
    var Constructor = function () { };
    Constructor.prototype = {
        constructor: CinxApi
    };


    // PING
    //api_path/2.0/ping
    Constructor.prototype.pingCinx = function (params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/ping`, params),
            authenticated: false
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };


    //SUBSCRIPTIONS
    //api_path/2.0/subs
    Constructor.prototype.getSubscriptions = function (params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/subs`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };


    //PROJECTS
    //api_path/2.0/sub/api_token/projects/next-number
    Constructor.prototype.getProjectNumber = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/projects/next-number`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/projects
    Constructor.prototype.getProjects = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/projects`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/project/project_guid
    Constructor.prototype.getProjectDetails = function (cinx_api_token, project_guid, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/project/${project_guid}`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token//partner/exec/cinx/json-project-import?body=json&synchronous=1
    Constructor.prototype.postProject = function (cinx_api_token, project, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/partner/exec/cinx/json-project-import`, params),
            type: 'POST',
            postData: project,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //
    Constructor.prototype.putProject = function (cinx_api_token, project, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/partner/exec/cinx/json-project-import`, params),
            type: 'PUT',
            postData: project,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //
    Constructor.prototype.deleteProject = function (cinx_api_token, project_guid, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/project/${project_guid}/delete`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };


    //VENDORS
    //api_path/2.0/sub/api_token/vendors/next-number
    Constructor.prototype.getVendorNumber = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/vendors/next-number`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/vendors
    Constructor.prototype.getVendors = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/vendors`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/vendor/org_commerce_guid
    Constructor.prototype.getVendorDetails = function (cinx_api_token, org_commerce_guid, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/vendor/${org_commerce_guid}`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/partner/exec/cinx/json-vendor-import?body=json
    Constructor.prototype.postVendor = function (cinx_api_token, vendor, params, callback) {
        var requestData = {

            url: addParameters(`${apiServer}/sub/${cinx_api_token}/partner/exec/cinx/json-vendor-import)`, params),
            type: 'POST',
            postData: vendor,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //
    Constructor.prototype.putVendor = function (cinx_api_token, vendor, params, callback) {
        var requestData = {

            url: addParameters( `${apiServer}/sub/${cinx_api_token}/partner/exec/cinx/json-vendor-import`, params),
            type: 'PUT',
            postData: vendor,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };



    //CATALOGS
    //
    Constructor.prototype.getCatalogUpdates = function (cinx_api_token, appId, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/app/${appId}/price-updates`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //
    Constructor.prototype.getCatalogUpdateFile = function (cinx_api_token, appId, updateId, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/app/${appId}/price-update/${updateId}`, params),
            authenticated: true,
            download: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //
    Constructor.prototype.setCatalogUpdateApplied = function (cinx_api_token, appId, updateId, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/app/${appId}/price-update/${updateId}/apply`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };


    //JOB COSTS
    //api_path/2.0/sub/api_token/org/job-costing/phases
    Constructor.prototype.getPhases = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/org/job-costing/phases`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/partner/exec/cinx/json-org-phase-import?body=json
    Constructor.prototype.postPhase = function (cinx_api_token, phase, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/partner/exec/cinx/json-org-phase-import`, params),
            type: 'POST',
            postData: phase,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    Constructor.prototype.putPhase = function (cinx_api_token, phase, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/partner/exec/cinx/json-org-phase-import`, params),
            type: 'PUT',
            postData: phase,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    //api_path/2.0/sub/api_token/org/job-costing/categories
    Constructor.prototype.getCategories = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/org/job-costing/categories`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/partner/exec/cinx/json-org-category-import?body=json
    Constructor.prototype.postCategory = function (cinx_api_token, category, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/partner/exec/cinx/json-org-category-import?body=json`, params),
            type: 'POST',
            postData: category,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/org/job-costing/material-cost-codes
    Constructor.prototype.getMaterialCostCodes = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/org/job-costing/material-cost-codes`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/partner/exec/cinx/json-material-cost-code-import?body=json
    Constructor.prototype.postMaterialCostCode = function (cinx_api_token, material_cost_code, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/partner/exec/cinx/json-material-cost-code-import`, params),
            type: 'POST',
            postData: material_cost_code,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };

    Constructor.prototype.putMaterialCostCode = function (cinx_api_token, material_cost_code, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/partner/exec/cinx/json-material-cost-code-import`, params),
            type: 'PUT',
            postData: material_cost_code,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/org/job-costing/tax-groups
    Constructor.prototype.getTaxGroups = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/org/job-costing/tax-groups`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/partner/exec/cinx/json-org-tax-group-import?body=json
    Constructor.prototype.postTaxGroup = function (cinx_api_token, tax_group, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/partner/exec/cinx/json-org-tax-group-import`, params),
            type: 'POST',
            postData: tax_group,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };


    //PROJECT JOB COSTS
    //api_path/2.0/sub/api_token/project/project_guid/job-costing
    Constructor.prototype.getProjectJobCosting = function (cinx_api_token, project_guid, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/project/${project_guid}/job-costing`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/partner/exec/cinx/json-project-job-costing-import?body=json
    Constructor.prototype.postProjectJobCosting = function (cinx_api_token, project_job_costing, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/partner/exec/cinx/json-project-job-costing-import`, params),
            type: 'POST',
            postData: project_job_costing,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //
    Constructor.prototype.modifyProjectJobCosting = function (cinx_api_token, pccGuid, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/project-cost-code/${pccGuid}/modify`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };


    //REQUISITIONS
    //api_path/2.0/sub/api_token/reqs
    Constructor.prototype.getReqs = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/reqs`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/req/req_guid
    Constructor.prototype.getReq = function (cinx_api_token, req_guid, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/req/${req_guid}`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/partner/exec/cinx/json-req-import?body=json
    Constructor.prototype.postReq = function (cinx_api_token, requisition, params, callback) {
        var requestData = {
            url: addParameters( `${apiServer}/sub/${cinx_api_token}/partner/exec/cinx/json-req-import`, params),
            type: 'POST',
            postData: requisition,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };


    //PURCHASE ORDERS
    //api_path/2.0/sub/api_token/pos
    Constructor.prototype.getPOs = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/pos`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/po/po_guid
    Constructor.prototype.getPO = function (cinx_api_token, po_guid, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/po/${po_guid}`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/partner/exec/cinx/json-po-import?body=json
    Constructor.prototype.postPO = function (cinx_api_token, po, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/partner/exec/cinx/json-po-import`, params),
            type: 'POST',
            postData: po,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };


    //DELIVERIES
    //api_path/2.0/sub/api_token/deliveries
    Constructor.prototype.getDeliveries = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/deliveries`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/delivery/delivery_guid
    Constructor.prototype.getDelivery = function (cinx_api_token, delivery_guid, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/delivery/${delivery_guid}`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/partner/exec/cinx/json-delivery-import?body=json
    Constructor.prototype.postDelivery = function (cinx_api_token, delivery, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/partner/exec/cinx/json-delivery-import`, params),
            type: 'POST',
            postData: delivery,
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };


    //ORGANIZATION
    //api_path/2.0/sub/api_token/addresses
    Constructor.prototype.getOrgAddresses = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/addresses`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/users
    Constructor.prototype.getOrgUsers = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/users`, params),
            authenticated: true
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };


    //TEMPLATES
    //api_path/2.0/sub/api_token/template/req
    Constructor.prototype.getReqTemplate = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/template/req`, params),
            authenticated: true,
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/template/project
    Constructor.prototype.getProjectTemplate = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/template/project`, params),
            authenticated: true,
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/template/vendor
    Constructor.prototype.getVendorTemplate = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/template/vendor`, params),
            authenticated: true,
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/template/po
    Constructor.prototype.getPoTemplate = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/template/po`, params),
            authenticated: true,
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/template/delivery
    Constructor.prototype.getDeliveryTemplate = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/template/delivery`, params),
            authenticated: true,
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/template/phase
    Constructor.prototype.getPhaseTemplate = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/template/phase`, params),
            authenticated: true,
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/template/material-cost-code
    Constructor.prototype.getMaterialCostCodeTemplate = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/template/material-cost-code`, params),
            authenticated: true,
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/template/category
    Constructor.prototype.getCategoryTemplate = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/template/category`, params),
            authenticated: true,
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/template/tax-group
    Constructor.prototype.getTaxGroupTemplate = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/template/tax-group`, params),
            authenticated: true,
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/template/project-job-costing
    Constructor.prototype.getProjectJobCostTemplate = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/template/project-job-costing`, params),
            authenticated: true,
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };


    //AUTONUMBERS
    //api_path/2.0/sub/api_token/auto-number/vendor
    Constructor.prototype.getVendorNumber = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/auto-number/vendor`, params),
            authenticated: true,
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/auto-number/project
    Constructor.prototype.getProjectNumber = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/auto-number/project`, params),
            authenticated: true,
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/auto-number/req
    Constructor.prototype.getReqNumber = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/auto-number/req`, params),
            authenticated: true,
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/auto-number/rfq
    Constructor.prototype.getRfqNumber = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/auto-number/rfq`, params),
            authenticated: true,
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/auto-number/po
    Constructor.prototype.getPoNumber = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/auto-number/po`, params),
            authenticated: true,
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/auto-number/delivery
    Constructor.prototype.getDeliveryNumber = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/auto-number/delivery`, params),
            authenticated: true,
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };
    //api_path/2.0/sub/api_token/auto-number/return
    Constructor.prototype.getReturnNumber = function (cinx_api_token, params, callback) {
        var requestData = {
            url: addParameters(`${apiServer}/sub/${cinx_api_token}/auto-number/return`, params),
            authenticated: true,
        };
        console.log(requestData.url);
        return runRequest(requestData, callback);
    };


    //CONFIGURATION
    Constructor.prototype.setCredentials = function (user, pwd) {
        username = user;
        password = pwd;
    };
    Constructor.prototype.setApiPathAndVersion = function (server, version) {
        apiServer = `${server}/${version}`;
    };
    Constructor.prototype.setPromiseImplementation = function (PromiseImplementation) {
        var valid = false;
        try {
            var p = new PromiseImplementation(function (resolve) {
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