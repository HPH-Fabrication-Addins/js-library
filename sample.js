var template = `{
	"doc_info": {
		"type": "JSON-REQ-IMPORT-TEMPLATE",
		"description": "API template for creating a CINX Requisition.",
		"version": "2.01",
		"last_updated": "2019-04-15 15:14:56Z"
	},
	"template": {
		"cinx_guid": "",
		"number": "",
		"name": "",
		"description": "",
		"tx_sub_type": "",
		"user_comment": "",
		"procurement_status": "OPEN",
		"allow_substitutes": "true",
		"cinx_user_guid_assign_to": "",
		"dates": {
			"need_by": "",
			"approved": "",
			"closed": ""
		},
		"vendor": {
			"number": "",
			"cinx_commerce_guid": ""
		},
		"project": {
			"number": "",
			"cinx_guid": ""
		},
		"delivery": {
			"address1": "",
			"address2": "",
			"address3": "",
			"city": "",
			"state": "",
			"postal_code": "",
			"country": "USA",
			"ship_via": "",
			"fob_type": "",
			"ship_from": "",
			"attention": "",
			"location_type": "JOB SITE",
			"location_name": "",
			"instructions": ""
		},
		"job_cost_defaults": {
			"phase_name": "",
			"cinx_phase_guid": "",
			"cost_code_name": "",
			"cinx_cost_code_guid": "",
			"category_name": "",
			"cinx_category_guid": ""
		},
		"taxes": {
			"taxable": "false",
			"tax_group_name": "",
			"cinx_tax_group_guid": ""
		},
		"transaction_references": [],
		"items": []
	},
	"transaction_reference_template":{
		"type": "",
		"description": "",
		"value": ""
	},
	"item_template":{
			"quantity": "",
			"need_by_date": "",
			"allow_substitutes": "true",
			"hph_code": "",
			"org_item_id": "",
			"org_system_id": "",
			"mfr_part_number": "",
			"upc": "",
			"size": "",
			"description": "",
			"mfr_name": "",
			"item_type": "",
			"vendor": {
				"number": "",
				"cinx_commerce_guid": ""
			},
			"project": {
				"number": "",
				"cinx_guid": ""
			},
			"delivery": {
				"deliver_to": "",
				"location_type": "JOB SITE",
				"instructions": "",
				"labeling_instructions": "",
				"packaging_instructions": ""
			},
			"work_breakdown": {
				"work_order_id": "",
				"work_order_name": "",
				"spool_id": "",
				"spool_number": "",
				"building_name": "",
				"level": "",
				"space": "",
				"sub_space": "",
				"system": "",
				"arch_symbol": ""
			},
			"job_cost": {
				"phase_name": "",
				"cinx_phase_guid": "",
				"cost_code_name": "",
				"cinx_cost_code_guid": "",
				"category_name": "",
				"cinx_category_guid": ""
			},
			"taxes": {
				"taxable": "false",
				"tax_group_name": "",
				"cinx_tax_group_guid": ""
			},
			"design": {
				"model_item_guid": "",
				"model_name": "",
				"model_file": "",
				"drawing_number": "",
				"drawing_name": ""
		}
	},
	"transaction_field_options": {
		"location_type": ["JOB SITE,OFFICE,WAREHOUSE,FABRICATION SHOP,FABRICATOR"],
		"ship_via": ["SUPPLIER TRUCK,MOTOR COMMON CARRIER,CUSTOMER PICKUP,TRACKING GROUND,GROUND,AIR EXPRESS,AIR,PRIVATE PARCEL SERVICE"],
		"fob_type": ["PREPAID AND CHARGED TO CUSTOMER,PREPAID,PICK-UP,COLLECT,DEFINED BY BUYER AND SELLER"],
		"allow_substitutes": ["true,false"],
		"taxable": ["true,false"],
		"tx_sub_type": ["OFFICE,SHOP,FIELD,RENTAL,CONTRACTOR"],
		"procurement_status": ["OPEN,SUBMITTED,IN-REVIEW,APPROVED,APPROVED W/MODS,REJECTED,PENDING ORDER,COMPLETE,CLOSED,CANCELLED,RESUBMITTED"]
	},
	"item_field_options": {
		"location_type": ["JOB SITE,OFFICE,WAREHOUSE,FABRICATION SHOP,FABRICATOR"],
		"ship_via": ["SUPPLIER TRUCK,MOTOR COMMON CARRIER,CUSTOMER PICKUP,TRACKING GROUND,GROUND,AIR EXPRESS,AIR,PRIVATE PARCEL SERVICE"],
		"allow_substitutes": ["true,false"],
		"taxable": ["true,false"],
		"procurement_status": ["NOT ORDERED,ORDER REQUESTED,ORDER PENDING,ORDERED,BACKORDERED,DELIVERED,RETURNED,CANCELLED"]
	},
	"api_calls": [
		{
			"type": "THIS CALL",
			"url": "https://api.cinx.com/sub/dfed7d88-adf8-5356-8029-fe061c93d0fe/api/developer/template?type=JSON-REQ-IMPORT-TEMPLATE&section=ALL",
			"note": "Returns this page"
		},
		{
			"type": "REQUISTION SUBMIT",
			"url": "https://api.cinx.com/sub/dfed7d88-adf8-5356-8029-fe061c93d0fe/partner/exec/cinx/json-req-import",
			"notes": "Authenticated call user credentials required, post .JSON iport file"
		},
		{
			"type": "VENDORS GET LIST",
			"url": "https://api.cinx.com/sub/dfed7d88-adf8-5356-8029-fe061c93d0fe/...",
			"note": "Authenticated call user credentials required"
		},
		{
			"type": "PROJECTS GET LIST",
			"url": "https://api.cinx.com/sub/dfed7d88-adf8-5356-8029-fe061c93d0fe/...",
			"note": "Authenticated call user credentials required"
		},
		{
			"type": "USERS GET LIST ",
			"url": "https://api.cinx.com/sub/dfed7d88-adf8-5356-8029-fe061c93d0fe/...",
			"note": "Authenticated call user credentials required"
	}]
}`;

function createRequisition() {
    const Http = new XMLHttpRequest();
    const url = 'https://api.dev.cinx.biz/sub/99478956-9ec5-68e7-b74f-ab017ce7aec5/partner/exec/cinx/json-req-import';
    Http.open("POST", url);
    Http.setRequestHeader('Authorization', 'Basic ' + btoa('burim.ratkoceri@gmail.com' + ':' + 'cinx123'));
    Http.setRequestHeader('Content-Type', 'application/json');

    var requisition = JSON.parse(template).template;
    var item = JSON.parse(template).item_template;

    item.quantity = 2;
    item.hph_code = 'HPH123';
    console.log(item);

    requisition.number = 'REQ123';
    requisition.name = 'REQUISITION 123';
    requisition.project.number = 'C2NR';

    requisition.items.push(item);
    console.log(requisition);

    Http.send(JSON.stringify(requisition));

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
    }
}