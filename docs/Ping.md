## API – PING Server

This request can be used to test the availability of the CINX API.

URL Pattern:

{api path}/ping

URL Samples:

http://api.cinx.com/ping

http://api.cinx.com/ping?format=xml

cinx.js function:

PingCinx()

Sample usage:

```js
PingCinx()
        .then(function(response) { return response.json() })
        .then(function(json) {
            console.log(json);
            json.rows.forEach(el => {
                //Use the json object returned from the call
            });
        });
````

Sample response:

```json
// 20190614211638
// http://api.cinx.com/ping

{
  "response": {
    "status_code": 200,
    "message": "OK",
    "method": "Validation->ping",
    "uri": "ping",
    "format": "json",
    "start_time": 1560539798.202,
    "total_time": 0.028228998184204,
    "record_count": 1,
    "total_count": 0
  },
  "rows": [
    {
      "status": 200,
      "message": "CINX: API Ping Response: Ok"
    }
  ]
}
```