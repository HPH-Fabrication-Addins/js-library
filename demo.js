var appId = "5d63bd32-3407-c76c-6fb1-690be3597ff2"
var cinxApi = new CinxApi();
cinxApi.setCredentials('burim.ratkoceri@gmail.com', 'cinx123');



//Change tabs
function openPage(pageName, elmnt, color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
}

//Helpers
function fillOrganizationList() {
    var guids = window.localStorage.getItem('guids');
    var json = JSON.parse(guids);
    json.rows.forEach(el => {
        document.getElementById('organizations').innerHTML += `<option value='${json.rows.indexOf(el)}'>${el.org.names.primary}</option>`;
    });
}

function fillCatalogList(ordinal) {
    document.getElementById('catalogs').innerHTML = '';
    var guids = window.localStorage.getItem('guids');
    var json = JSON.parse(guids);
    json.rows[ordinal].apps.forEach(el => {
        if (el.app_cdoc == 'couchdb://apps/2d4dde95cc7d1a3d8e830036ff126f60') {
            document.getElementById('catalogs').innerHTML += `<option value='${el.id}'>${el.data_source_name}</option>`;
        }

    });
}

function fillProjectList() {
    document.getElementById('projects').innerHTML = '';
    var b2b = document.getElementById('catalogs').value;
    GetProjectList(username, password, b2b)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            json.rows.forEach(el => {
                document.getElementById('projects').innerHTML += `<option value='${el.cinx_id.id}'>${el.name}</option>`;
            });
        });
}

function fillProjectList2() {
    document.getElementById('projects').innerHTML = '';
    var b2b = document.getElementById('catalogs').value;
    GetProjectList(username, password, b2b)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            json.rows.forEach(el => {
                document.getElementById('projects').innerHTML += `<option value='${el.cinx_id.id}'>${el.name}</option>`;
            });
            fillProjectCostCodeList();
        });
}

function fillPhaseList() {
    document.getElementById('name').innerHTML = '';
    var b2b = document.getElementById('catalogs').value;
    GetJobCostPhases(username, password, b2b)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            json.rows.forEach(el => {
                document.getElementById('name').innerHTML += `<option value ='${el.name}'>${el.name}</option>`;
            });
        });
}

function fillCostCodeList() {
    document.getElementById('name').innerHTML = '';
    var b2b = document.getElementById('catalogs').value;
    GetJobCostCostCodes(username, password, b2b)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            json.rows.forEach(el => {
                document.getElementById('name').innerHTML += `<option value='${el.name}'>${el.name}</option>`;
            });
        });
}

function fillProjectCostCodeList() {
    document.getElementById('guid').innerHTML = '';
    var b2b = document.getElementById('catalogs').value;
    var projectId = document.getElementById('projects').value;
    GetProjectCostCodes(username, password, b2b, projectId)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            json.rows.forEach(el => {
                document.getElementById('guid').innerHTML += `<option value='${el.cinx_id.id}'>${el.cinx_id.id}</option>`;
            });
        });
}

function fillCostCodeList2() {
    document.getElementById('ccname').innerHTML = '';
    var b2b = document.getElementById('catalogs').value;
    GetJobCostCostCodes(username, password, b2b)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            json.rows.forEach(el => {
                document.getElementById('ccname').innerHTML += `<option value='${el.name}'>${el.name}</option>`;
            });
        });
}

function fillPhaseList2() {
    document.getElementById('phname').innerHTML = '';
    var b2b = document.getElementById('catalogs').value;
    GetJobCostPhases(username, password, b2b)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            json.rows.forEach(el => {
                document.getElementById('phname').innerHTML += `<option value='${el.name}'>${el.name}</option>`;
            });
        });
}



//Login to CINX
function showSubscriptions(username, password) {
    document.getElementById('divResponse').innerHTML = '';
    GetSubscriptions(username, password)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            window.localStorage.setItem('guids', JSON.stringify(json));
            json.rows.forEach(el => {
                document.getElementById('divResponse').innerHTML += `<h3>Organization:${el.org.names.primary}</h3></hr><ul>`;
                el.apps.forEach(ap => {
                    var li = `<li><b>Application Name: </b>${ap.name}<b> Data Source Name: </b>${ap.data_source_name}<b> Type: </b>${ap.type}</li>`;
                    document.getElementById('divResponse').innerHTML += li;
                });
                document.getElementById('divResponse').innerHTML += '</ul>';
            });
        });
}

//Job Cost
function showPhaseList(username, password) {
    document.getElementById('divResponse').innerHTML = '';
    var b2b = document.getElementById('catalogs').value;
    GetJobCostPhases(username, password, b2b)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            json.rows.forEach(el => {
                document.getElementById('divResponse').innerHTML += `<b> Name: </b>${el.name}<b> Description: </b>${el.description}<b> Status: </b>${el.status}<br/>`;
            });
        });
}

function createOrModifyPhase(username, password) {
    document.getElementById("divResponse").innerHTML = "";
    var b2b = document.getElementById('catalogs').value;
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var status = document.getElementById('status').value;
    var values = `{"phases":[{"name":"${name}","description":"${description}","status":"${status}"}]}`;

    CreateOrModifyJobCostPhase(username, password, b2b, values)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            document.getElementById("divResponse").innerHTML += `Phase <b>${name}</b> was created/modified.`;
        });
}

function showCostCodeList(username, password) {
    document.getElementById("divResponse").innerHTML = "";
    var b2b = document.getElementById('catalogs').value;
    GetJobCostCostCodes(username, password, b2b)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            json.rows.forEach(el => {
                document.getElementById("divResponse").innerHTML += `<b>Name:</b> ${el.name} <b>Description:</b> ${el.description} <b>Status:</b> ${el.status}<br/>`;
            });
        });
}

function createOrModifyCostCode(username, password) {
    document.getElementById("divResponse").innerHTML = "";
    var b2b = document.getElementById('catalogs').value;
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var status = document.getElementById('status').value;
    var values = `{"material_cost_codes":[{"name":"${name}","description":"${description}","status":"${status}"}]}`;

    CreateOrModifyJobCostCostCode(username, password, b2b, values)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            document.getElementById("divResponse").innerHTML += `Cost Code <b>${name}</b> was created/modified.`;
        });
}

function modifyProjectCost(username, password) {
    document.getElementById("divResponse").innerHTML = "";

    var b2b = document.getElementById('catalogs').value;
    var pcc = document.getElementById('guid').value;
    var pName = document.getElementById('ccname').value;
    var pDescription = document.getElementById('percent').value;
    var pNumber = document.getElementById('phname').value;
    var values = `{"material_cost_code":"${pName}","percent_complete":"${pDescription}","phase":"${pNumber}"}`;

    ModifyProjectCostCodes(username, password, b2b, pcc, values)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            document.getElementById("divResponse").innerHTML += `Project Cost/Phase <b>${pcc}</b> was modified`;

        });
}

//Projects
function showProjectList(username, password) {
    document.getElementById("divResponse").innerHTML = "";
    var b2b = document.getElementById('catalogs').value;
    GetProjectList(username, password, b2b)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            document.getElementById("divResponse").innerHTML += "<ul>";
            json.rows.forEach(el => {
                document.getElementById("divResponse").innerHTML += "<li><b>Number: </b>" + el.number + " <b>Name: </b>" + el.name + " <b>Description: </b>" + el.description + "</li>";
            });
            document.getElementById("divResponse").innerHTML += "</ul>";
        });
}


function showProjectDetails(username, password) {
    document.getElementById("divResponse").innerHTML = "";
    var selected2b = document.getElementById('catalogs').value;
    var selectedProject = document.getElementById('projects').value;
    GetProjectDetails(username, password, selected2b, selectedProject)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            document.getElementById("divResponse").innerHTML += "<ul>";
            json.rows.forEach(el => {
                document.getElementById("divResponse").innerHTML += "<li><b>Description: </b>" + el.description + " <b>Project Number: </b>" + el.number + " <b>Status: </b>" + el.status + "</li>";
            });
            document.getElementById("divResponse").innerHTML += "</ul>";
        });
}
//Add project
function addProject(username, password) {
    document.getElementById("divResponse").innerHTML = "";

    var selected2b = document.getElementById('catalogs').value;
    var pName = document.getElementById('name').value;
    var pDescription = document.getElementById('description').value;
    var pNumber = document.getElementById('number').value;
    var pStatus = document.getElementById('status').value;
    var values = `{"name":"${pName}","description":"${pDescription}","number":"${pNumber}","status":"${pStatus}","dates":[{"type":"SCHEDULED START","value": "2019-06-01"},{"type":"ACTUAL START","value": "2019-06-15"}]}`;

    CreateNewProject(username, password, selected2b, userid, values)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            document.getElementById("divResponse").innerHTML += `Project <b>${pName}</b> was created with the ID: <b>${json.rows[0].cinx_id.id}</b>`;

        });
}

function modifyProject(username, password) {
    document.getElementById("divResponse").innerHTML = "";

    var selected2b = document.getElementById('catalogs').value;
    var selectedProject = document.getElementById('projects').value;
    var pName = document.getElementById('name').value;
    var pDescription = document.getElementById('description').value;
    var pNumber = document.getElementById('number').value;
    var pStatus = document.getElementById('status').value;
    var values = `{"name":"${pName}","description":"${pDescription}","number":"${pNumber}","status":"${pStatus}"}`;

    ModifyProject(username, password, selected2b, selectedProject, values)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            document.getElementById("divResponse").innerHTML += `Project <b>${selectedProject}</b> was modified`;

        });
}

function deleteProject(username, password) {
    document.getElementById("divResponse").innerHTML = "";

    var selected2b = document.getElementById('catalogs').value;
    var selectedProject = document.getElementById('projects').value;

    DeleteProject(username, password, selected2b, selectedProject)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            document.getElementById("divResponse").innerHTML += `Project <b>${selectedProject}</b> was deleted`;

        });
}

function showProjectCosts(username, password) {
    document.getElementById("divResponse").innerHTML = "";
    var selected2b = document.getElementById('catalogs').value;
    var selectedProject = document.getElementById('projects').value;
    GetProjectCostCodes(username, password, selected2b, selectedProject)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            document.getElementById("divResponse").innerHTML += "<ul>";
            json.rows.forEach(el => {
                document.getElementById("divResponse").innerHTML += "<li><b>GUID: </b>" + el.cinx_id.id + "<b> Cost Code: </b>" + el.material_cost_code.name + " <b> Phase: </b>" + el.phase.name + " <b> Percent Complete: </b>" + el.percent_complete + "</li>";
            });
            document.getElementById("divResponse").innerHTML += "</ul>";
        });
}

function createProjectCost(username, password) {
    document.getElementById("divResponse").innerHTML = "";

    var selected2b = document.getElementById('catalogs').value;
    var selectedProject = document.getElementById('projects').value;
    var pName = document.getElementById('ccname').value;
    var pDescription = document.getElementById('percent').value;
    var pNumber = document.getElementById('phname').value;
    var values = `{"material_cost_code":"${pName}","percent_complete":"${pDescription}","phase":"${pNumber}"}`;

    AddProjectCostCodes(username, password, selected2b, selectedProject, values)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            document.getElementById("divResponse").innerHTML += `Project Cost/Phase <b>${pName}/${pNumber}</b> was added`;

        });
}

//Get vendor list
function vendorList(username, password) {
    document.getElementById("divResponse").innerHTML = "";
    var selected2b = document.getElementById('catalogs').value;
    GetVendorList(username, password, selected2b)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            document.getElementById("divResponse").innerHTML += "<ul>";
            json.rows.forEach(el => {
                document.getElementById("divResponse").innerHTML += "<li><b>Name: </b>" + el.name + " <b>ID: </b>" + el.vendor_id + " <b>Status: </b>" + el.vendor_status + "</li>";
            });
            document.getElementById("divResponse").innerHTML += "</ul>";
        });
}

function vendorListSelection(username, password) {
    var selected2b = document.getElementById('catalogs').value;
    GetVendorList(username, password, selected2b)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            json.rows.forEach(el => {
                document.getElementById("vendors").innerHTML += "<option value='" + el.commerce.cinx_id.id + "'>" + el.name + "</option>";
            });
        });
}

function modifyVendorListSelection(username, password) {
    var selected2b = document.getElementById('catalogs').value;
    GetVendorList(username, password, selected2b)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            json.rows.forEach(el => {
                document.getElementById("vendors").innerHTML += "<option value='" + el.commerce.cinx_id.id + "'>" + el.name + "</option>";
            });
        });
}

function vendorDetails(username, password) {
    document.getElementById("divResponse").innerHTML = "";
    var selected2b = document.getElementById('catalogs').value;
    var selectedVendor = document.getElementById('vendors').value;
    var logo;
    GetVendorDetails(username, password, selected2b, selectedVendor)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            document.getElementById("divResponse").innerHTML += "<ul>";
            json.rows.forEach(el => {
                logo = el.marketing.logo;
                document.getElementById("divResponse").innerHTML += "<li><b>Name: </b>" + el.names.primary + " <b>Status: </b>" + el.vendor_status + "</li>";

            });
            document.getElementById("divResponse").innerHTML += "</ul>";
            document.getElementById("divResponse").innerHTML += "<img src='" + logo + "'/>";
        });
}

function addVendor(username, password) {
    document.getElementById("divResponse").innerHTML = "";

    var selected2b = document.getElementById('catalogs').value;
    var vName = document.getElementById('vendorName').value;
    var vID = document.getElementById('vendorID').value;
    var vStatus = document.getElementById('status').value;
    var values = `{"name_primary":"${vName}","vendor_id":"${vID}","vendor_status":"${vStatus}"}`;

    CreateNewVendor(username, password, selected2b, values)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            document.getElementById("divResponse").innerHTML += `Vendor <b>${vName}</b> was created`;

        });
}

function modifyVendor(username, password) {
    document.getElementById("divResponse").innerHTML = "";

    var selected2b = document.getElementById('catalogs').value;
    var selectedVendor = document.getElementById('vendors').value;
    var vName = document.getElementById('vendorName').value;
    var vendorID = document.getElementById('vendorID').value;
    var vStatus = document.getElementById('status').value;
    var values = `{"name_primary":"${vName}","vendor_id":"${vendorID}","vendor_status":"${vStatus}"}`;

    ModifyVendor(username, password, selected2b, selectedVendor, values)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            document.getElementById("divResponse").innerHTML += `Vendor <b>${selectedVendor}</b> was modified`;

        });
}

function showNewCatalogUpdates(username, password) {
    document.getElementById("divResponse").innerHTML = "";
    var fileType = document.getElementById("type").value;
    GetNewCatalogUpdates(username, password, appId)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            document.getElementById("divResponse").innerHTML += "<ul>";
            json.rows.forEach(el => {
                document.getElementById("divResponse").innerHTML += `<li><b>Title: </b>${el.title} <b>Published Date: </b>${el.date_published} <b>File ID: </b>${el.cinx_id.id} 
                <button class="button" onclick="downloadCatalogUpdateFile(username, password, '${el.cinx_id.id}')">Download</button>`;
                if (fileType !== "Applied") {
                    document.getElementById("divResponse").innerHTML += `<button class="button" onclick="markCatalogUpdateAsApplied(username, password, '${el.cinx_id.id}')">Mark Applied</button></li><br/>`;
                }

            });
            document.getElementById("divResponse").innerHTML += "</ul>";
        });
}

function downloadCatalogUpdateFile(username, password, updateId) {
    DownloadCatalogUpdateFile(username, password, appId, updateId)
        .then(function(response) {
            return response.blob();
        }).then(function(blob) {
            download(blob);
        });

}

function markCatalogUpdateAsApplied(username, password, updateId) {
    var values = `{"applied_date":"2019-06-21", "download_date":"2019-06-21"}`;
    MarkCatalogUpdateAsApplied(username, password, appId, updateId, values)
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
        });
}

function fillProjects(id) {
    document.getElementById(id).innerHTML = '';
    projectListSelection(username, password);
}

function fillVendors(id) {
    document.getElementById(id).innerHTML = '';
    vendorListSelection(username, password);
}

function fillModifyVendors(id) {
    document.getElementById(id).innerHTML = '';
    modifyVendorListSelection(username, password);
}
//Create side menu
function createSidebar() {
    document.getElementById('sidenavId').innerHTML = `
  <p>Login</p>
  <a href="Ping.html">Ping CINX</a>
  <a href="Subscriptions.html">Subscriptions</a>
  <p>Job Cost</p>
  <a href="ListPhases.html">List Phases</a>
  <a href="CreatePhase.html">Create Phase</a>
  <a href="ModifyPhase.html">Modify Phase</a>
  <a href="ListCostCodes.html">List Cost Codes</a>
  <a href="CreateCostCode.html">Create Cost Code</a>
  <a href="ModifyCostCode.html">Modify Cost Code</a>
  <p>Projects</p>
  <a href="ListProjects.html">List Projects</a>
  <a href="ProjectDetails.html">Project Details</a>
  <a href="AddProject.html">Create Project</a>
  <a href="ModifyProject.html">Modify Project</a>
  <a href="DeleteProject.html">Delete Project</a>
  <a href="ListProjectCosts.html">List Phases/Costs Codes</a>
  <a href="CreatePhaseCostCode.html">Create Phase/Cost Code</a>
  <a href="ModifyPhaseCostCode.html">Modify Phase/Cost Code</a>
  <a href="requisition.html">Create Requisition</a>
  <p>Vendors</p>
  <a href="VendorList.html">List Vendors</a>
  <a href="VendorDetails.html">Vendor Details</a>
  <a href="AddVendor.html">Create Vendor</a>
  <a href="ModifyVendor.html">Modify Vendor</a>
  <!--<a href="DeleteVendor.html">Delete Vendor</a>-->
  <p>Catalog Updates</p>
  <a href="CatalogUpdates.html">List New Updates</a>`;
}


//Local storage
function DeleteLogin() {
    window.localStorage.removeItem('guids');
}

function IsLogged() {
    var json = window.localStorage.getItem('guids');
    if (json == '[]' || json == null) {
        alert('You need to run the subscription demo first to obtain your subscriptions');
        console.log(json);
        return false;
    }
    console.log(json);
    return true;
}