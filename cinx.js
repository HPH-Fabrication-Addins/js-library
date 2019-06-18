//General
function PingCinx() {
    return fetch(`${apiPath}/ping`);
}

//Subscriptions
function GetSubscriptions(username, password) {
    return fetch(`${apiPath}/sub/user/subscriptions/`, {
        method: "GET",
        credentials: "include",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(username + ":" + password) }
    })
}

//Job Cost
function GetJobCostPhases(username, password, b2bId) {
    return fetch(`${apiPath}/sub/${b2bId}/org-job-cost/get-list/phases`, {
        method: "GET",
        credentials: "include",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(username + ":" + password) }
    })
}

function CreateOrModifyJobCostPhase(username, password, b2bId, values) {
    return fetch(`${apiPath}/sub/${b2bId}/org-job-cost/modify/phases?values=${values}`, {
        method: "GET",
        credentials: "include",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(username + ":" + password) }
    })
}

function GetJobCostCostCodes(username, password, b2bId) {
    return fetch(`${apiPath}/sub/${b2bId}/org-job-cost/get-list/material-cost-codes`, {
        method: "GET",
        credentials: "include",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(username + ":" + password) }
    })
}

function CreateOrModifyJobCostCostCode(username, password, b2bId, values) {
    return fetch(`${apiPath}/sub/${b2bId}/org-job-cost/modify/material-cost-codes?values=${values}`, {
        method: "GET",
        credentials: "include",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(username + ":" + password) }
    })
}

//Projects
function GetProjectList(username, password, b2bId) {
    return fetch(`${apiPath}/sub/${b2bId}/boms?type=pml`, {
        method: "GET",
        credentials: "include",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(username + ":" + password) }
    })
}

function GetProjectDetails(username, password, b2bId, projectId) {
    return fetch(`${apiPath}/sub/${b2bId}/project/${projectId}/details`, {
        method: "GET",
        credentials: "include",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(username + ":" + password) }
    })
}

function GetProjectCostCodes(username, password, b2bId, projectId) {
    return fetch(`${apiPath}/sub/${b2bId}/project/${projectId}/cost-codes`, {
        method: "GET",
        credentials: "include",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(username + ":" + password) }
    })
}

function AddProjectCostCodes(username, password, b2bId, projectId, values) {
    return fetch(`${apiPath}/sub/${b2bId}/project/${projectId}/cost-code/create?values=${values}`, {
        method: "GET",
        credentials: "include",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(username + ":" + password) }
    })
}

function ModifyProjectCostCodes(username, password, b2bId, pccGuid, values) {
    return fetch(`${apiPath}/sub/${b2bId}/project-cost-code/${pccGuid}/modify?values=${values}`, {
        method: "GET",
        credentials: "include",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(username + ":" + password) }
    })
}

function GetVendorList(username, password, b2bId) {
    return fetch(`${apiPath}/sub/${b2bId}/vendors`, {
        method: "GET",
        credentials: "include",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(username + ":" + password) }
    })
}

function GetVendorDetails(username, password, b2bId, commerceId) {
    return fetch(`${apiPath}/sub/${b2bId}/vendor/${commerceId}/details`, {
        method: "GET",
        credentials: "include",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(username + ":" + password) }
    })
}

function CreateNewVendor(username, password, b2bId, values) {
    return fetch(`${apiPath}/sub/${b2bId}/private/vendor/create?values=${values}`, {
        method: "GET",
        credentials: "include",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(username + ":" + password) }
    })
}

function ModifyVendor(username, password, b2bId, vendorId, values) {
    return fetch(`${apiPath}/sub/${b2bId}/private/vendor/${vendorId}/modify?values=${values}`, {
        method: "GET",
        credentials: "include",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(username + ":" + password) }
    })
}

function CreateNewProject(username, password, b2bId, values) {
    return fetch(`${apiPath}/sub/${b2bId}/project/create?values=${values}`, {
        method: "GET",
        credentials: "include",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(username + ":" + password) }
    })
}

function ModifyProject(username, password, b2bId, projectId, values) {
    return fetch(`${apiPath}/sub/${b2bId}/project/${projectId}/modify?values=${values}`, {
        method: "GET",
        credentials: "include",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(username + ":" + password) }
    })
}

function DeleteProject(username, password, b2bId, projectId) {
    return fetch(`${apiPath}/sub/${b2bId}/project/${projectId}/delete`, {
        method: "GET",
        credentials: "include",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(username + ":" + password) }
    })
}