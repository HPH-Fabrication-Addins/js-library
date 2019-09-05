var cinxApi = new CinxApi();
cinxApi.setApiPathAndVersion('http://api.dev.cinx.biz','2.0');
cinxApi.setCredentials('willstone@cinx.com', 'mcphaul18');

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
    cinxApi.getMaterialCostCodes(b2b)
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
    cinxApi.getPhases(b2b)
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
                document.getElementById("vendors").innerHTML += "<option value='" + el.cinx_commerce_guid + "'>" + el.name + "</option>";
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
    document.getElementById('menu').innerHTML = `
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Getting Started
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" href="ping.html">Ping</a>
                <a class="dropdown-item" href="subscriptions.html">Subscriptions</a>
            </div>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Job Cost
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" href="listphases.html">List Phases</a>
                <a class="dropdown-item" href="createphase.html">Create Phase</a>
                <!--<a class="dropdown-item" href="modifyphase.html">Modify Phase</a>-->
                <a class="dropdown-item" href="listcostcodes.html">List Cost Codes</a>
                <a class="dropdown-item" href="createcostcode.html">Create Cost Code</a>
                <!--<a class="dropdown-item" href="modifycostcode.html">Modify Cost Code</a>-->
            </div>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Projects
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" href="listprojects.html">List Projects</a>
                <a class="dropdown-item" href="projectdetails.html">Project Details</a>
                <a class="dropdown-item" href="addproject.html">Create Project</a>
                <!--<a class="dropdown-item" href="ModifyProject.html">Modify Project</a>-->
                <!--<a class="dropdown-item" href="DeleteProject.html">Delete Project</a>-->
                <a class="dropdown-item" href="ListProjectCosts.html">List Project Costs</a>
                <a class="dropdown-item" href="CreatePhaseCostCode.html">Create Project Cost</a>
                <!--<a class="dropdown-item" href="ModifyPhaseCostCode.html">Modify Phase/Cost Code</a>-->
                <a class="dropdown-item" href="requisition.html">Create Requisition</a>
            </div>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Vendors
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" href="vendorlist.html">List Vendors</a>
                <a class="dropdown-item" href="vendordetails.html">Vendor Details</a>
                <a class="dropdown-item" href="addvendor.html">Create Vendor</a>
                <!--<a class="dropdown-item" href="ModifyVendor.html">Modify Vendor</a>-->
            </div>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Catalog Updates
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" href="CatalogUpdates.html">List New Updates</a>
            </div>
        </li>
    </ul>
</div>`;
}
//Local storage
function deleteLogin() {
    window.localStorage.removeItem('guids');
}
function isLogged() {
    var json = window.localStorage.getItem('guids');
    if (json == '[]' || json == null) {
        alert('You need to run the subscription demo first to obtain your subscriptions');
        return false;
    }
    return true;
}