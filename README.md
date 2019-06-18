<p align="center">
  <img alt="CINX.js" width="400px" src="https://cinx-api.github.io/js-library/assets/images/logo.png" />
</p>

CINX: Construction Information Network & Exchange is a cloud platform that helps to easily synchronize internal departments, systems, products as well as project participants. With no upfront costs or huge capital investment, CINX can be up and running in just minutes.

**cinx.js** is a library that wraps CINX API endpoints into functions such as **GetProjectList(username, password, b2bId)** that always return a promise. The calling pattern is the same for all calls as below with the exception on the parameters that need to be passed in.

```js
GetProjectList(username, password, b2b)
        .then(function(response) { return response.json() })
        .then(function(json) {
            // Do something with the response
        });
```

The demo in this repository consists of static HTML files that use cinx.js and demo.js plain javascript files meant to strip away any presenting code and instead focus on demonstrating how to call the cinx.js functions and work with the responses. Each HTML file has a section that will show the call to the function and the documentation for that API endpoint.




