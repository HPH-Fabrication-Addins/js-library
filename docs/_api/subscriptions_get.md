---
title: Subscriptions
position: 1.0
type: get
description: API – GET User Subscriptions/Authorizations (Orgs and Applications)
parameters:
  - name:
    content:
content_markdown: |-
  This request will be used to get the applications/subscriptions that the user is authorized to access.  The response will contain information required to make additional API calls.

  URL Pattern: **{api path}/sub/user/subscriptions**

  URL Sample: **https://api.cinx.com/sub/user/subscriptions**

left_code_blocks:
  - code_block: |-
      var cinxApi = new CinxApi();
      cinxApi.setCredentials('CINX USERNAME', 'CINX PASSWORD');
      cinxApi.getSubscriptions()
            .then(function(response) {
                  console.log(response);
                });
            });
    title: JavaScript (using cinx-api.js)
    language: javascript
right_code_blocks:
  - code_block: |2-
      {
        "response": {
          "status_code": 200,
          "message": "OK",
          "method": "User->getUserSubscriptions",
          "uri": "sub/user/subscriptions",
          "format": "json",
          "start_time": 1562338517.204,
          "total_time": 0.31632900238037,
          "record_count": 2,
          "total_count": 0
        }
        "rows": [
          "org": {
            "names": {
              "primary": "Ratkoceri Engineering-LIVE",
              "alternate": null,
              "short": null,
              "previous": null
            },
            "cinx_id": {
              "type": "ORG",
              "domain": "orgs",
              "id": "org-0000-8247"
            }
          },
          "access_status": {
            "code": 200,
            "message": "OK",
            "reason": null
          },
          "start_date": "2015-06-18 13:04:53Z",
          "end_date": "2022-07-18 13:04:53Z",
          "apps": [
            {
              "name": "HPH Plumbing/Mechanical",
              "id": "e82d126d-53c7-b455-8e26-cc0a4a2b6762",
              "type": "DATA-SOURCE",
              "sub_type": "CATALOG",
              "access": "PUBLIC",
              "app_cdoc": "couchdb://apps/dab29b19c69e2703849cd5010a183fdd",
              "attributes": [
                
              ],
              "cost": 0,
              "is_paid": "1",
              "users": [
                
              ],
              "notify": [
                
              ],
              "labor_app": false,
              "logo": "https://cdn.cinx.com/assets/apps/org-0000-0001_logo_1.png",
              "description": "HPH Plumbing and Mechanical Material Catalog",
              "data_source": "couchdb://apps/dab29b19c69e2703849cd5010a183fdd",
              "data_source_name": "HPH Plumbing/Mechanical",
              "catalog_source": "couchdb://apps/dab29b19c69e2703849cd5010a183fdd"
            }
          ],
          "cinx_id": {
            "type": "SUBSCRIPTION",
            "domain": "subscriptions",
            "id": "47895223-a950-a206-ef6c-fb489667eeb3"
          },
          "user": {
            "names": {
              "first": "Burim",
              "middle": "",
              "last": "Ratkoceri",
              "suffix": ""
            },
            "cinx_id": {
              "type": "USER",
              "domain": "users",
              "id": "911d0a71-c650-51dc-5a28-d35d1229397b"
            },
            "joomla_id": "10396",
            "orgs": [
              {
                "org_cdoc": "couchdb://orgs/org-0000-8247",
                "role": "Administrator",
                "permissions": [
                  
                ],
                "permission_extensions": [
                  
                ]
              },
              {
                "org_cdoc": "couchdb://orgs/org-0000-7068",
                "role": "User",
                "permissions": [
                  
                ],
                "permission_extensions": [
                  
                ]
              }
            ]
          }
        ]
      }
    title: Sample Response
    language: json
---