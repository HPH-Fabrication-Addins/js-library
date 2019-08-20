var cinxApi = new CinxApi();
cinxApi.setApiPathAndVersion('http://api.dev.cinx.biz','2.0');
cinxApi.setCredentials('willstone@cinx.com', 'mcphaul18');

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
        document.getElementById('organizations').innerHTML += `<option value='${json.rows.indexOf(el)}'>${el.org.name}</option>`;
    });
}

function fillCatalogList(ordinal) {
    document.getElementById('catalogs').innerHTML = '';
    var guids = window.localStorage.getItem('guids');
    var json = JSON.parse(guids);
    document.getElementById('catalogs').innerHTML += `<option value='${json.rows[ordinal].cinx_api_token}'>${json.rows[ordinal].cinx_api_token}</option>`;
}

function fillProjectList() {
    document.getElementById('projects').innerHTML = '';
    var b2b = document.getElementById('catalogs').value;
    cinxApi.getProjects(b2b)
        .then(function(response) {
            console.log(response);
            response.rows.forEach(el => {
                document.getElementById('projects').innerHTML += `<option value='${el.cinx_guid}'>${el.name}</option>`;
            });
        });
}

function fillProjectList2() {
    document.getElementById('projects').innerHTML = '';
    var b2b = document.getElementById('catalogs').value;
    cinxApi.getProjects(b2b)
        .then(function(response) {
            console.log(response);
            response.rows.forEach(el => {
                document.getElementById('projects').innerHTML += `<option value='${el.cinx_id.id}'>${el.name}</option>`;
            });
            fillProjectCostCodeList();
        });
}

function fillPhaseList() {
    document.getElementById('name').innerHTML = '';
    var b2b = document.getElementById('catalogs').value;
    cinxApi.getJobCostPhases(b2b)
        .then(function(response) {
            console.log(response);
            response.rows.forEach(el => {
                document.getElementById('name').innerHTML += `<option value ='${el.name}'>${el.name}</option>`;
            });
        });
}

function createOrModifyPhase() {
    document.getElementById("divResponse").innerHTML = "";
    var b2b = document.getElementById('catalogs').value;
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var status = document.getElementById('status').value;
    var values = `{"phases":[{"name":"${name}","description":"${description}","status":"${status}"}]}`;

    cinxApi.putJobCostPhase(b2b, values)
        .then(function(response) {
            console.log(response);
            document.getElementById("divResponse").innerHTML += `Phase <b>${name}</b> was created/modified.`;
        });
}

function fillProjectCostCodeList() {
    document.getElementById('guid').innerHTML = '';
    var b2b = document.getElementById('catalogs').value;
    var projectId = document.getElementById('projects').value;
    cinxApi.getProjectCosts(b2b, projectId)
        .then(function(response) {
            console.log(response);
            response.rows.forEach(el => {
                document.getElementById('guid').innerHTML += `<option value='${el.cinx_id.id}'>${el.cinx_id.id}</option>`;
            });
        });
}

function fillCostCodeList2() {
    document.getElementById('ccname').innerHTML = '';
    var b2b = document.getElementById('catalogs').value;
    cinxApi.getJobCostCostCodes(b2b)
        .then(function(response) {
            console.log(response);
            response.rows.forEach(el => {
                document.getElementById('ccname').innerHTML += `<option value='${el.name}'>${el.name}</option>`;
            });
        });
}

function fillPhaseList2() {
    document.getElementById('phname').innerHTML = '';
    var b2b = document.getElementById('catalogs').value;
    cinxApi.getJobCostPhases(b2b)
        .then(function(response) {
            console.log(response);
            response.rows.forEach(el => {
                document.getElementById('phname').innerHTML += `<option value='${el.name}'>${el.name}</option>`;
            });
        });
}

function vendorListSelection(username, password) {
    var selected2b = document.getElementById('catalogs').value;
    cinxApi.getVendors(selected2b)
        .then(function(response) {
            console.log(response);
            response.rows.forEach(el => {
                document.getElementById("vendors").innerHTML += "<option value='" + el.commerce.cinx_id.id + "'>" + el.name + "</option>";
            });
        });
}

function modifyVendorListSelection() {
    var selected2b = document.getElementById('catalogs').value;
    cinxApi.getVendors(selected2b)
        .then(function(response) {
            console.log(response);
            response.rows.forEach(el => {
                document.getElementById("vendors").innerHTML += "<option value='" + el.commerce.cinx_id.id + "'>" + el.name + "</option>";
            });
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
    modifyVendorListSelection();
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
  <a href="addproject.html">Create Project</a>
  <a href="ModifyProject.html">Modify Project</a>
  <a href="DeleteProject.html">Delete Project</a>
  <a href="ListProjectCosts.html">List Phases/Costs Codes</a>
  <a href="CreatePhaseCostCode.html">Create Phase/Cost Code</a>
  <a href="ModifyPhaseCostCode.html">Modify Phase/Cost Code</a>
  <a href="requisition.html">Create Requisition</a>
  <p>Vendors</p>
  <a href="VendorList.html">List Vendors</a>
  <a href="VendorDetails.html">Vendor Details</a>
  <a href="addvendor.html">Create Vendor</a>
  <a href="ModifyVendor.html">Modify Vendor</a>
  <!--<a href="DeleteVendor.html">Delete Vendor</a>-->
  <p>Catalog Updates</p>
  <a href="CatalogUpdates.html">List New Updates</a>
  <a href="test.html">TEST</a>`;
}

//Local storage
function DeleteLogin() {
    window.localStorage.removeItem('guids');
}

function IsLogged() {
    var json = window.localStorage.getItem('guids');
    if (json == '[]' || json == null) {
        alert('You need to run the subscription demo first to obtain your subscriptions');
        //console.log(json);
        return false;
    }
    //console.log(json);
    return true;
}