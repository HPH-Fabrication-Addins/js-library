<p align="center">
  <img alt="CINX.js" width="400px" src="https://bratkoceri.github.io/cinxjs/assets/images/logo.png" />
</p>

CINX: Construction Information Network & Exchange is a cloud platform that helps to easily synchronize internal departments, systems, products as well as project participants. With no upfront costs or huge capital investment, CINX can be up and running in just minutes.

**cinx.js** is a library that wraps CINX API endpoints into functions such as **GetProjectList(username, password, b2bId)** that always returns a promise. The calling pattern is the same for all calls as below

```js
GetProjectList(username, password, b2b)
        .then(function(response) { return response.json() })
        .then(function(json) {
            // Do something with the response
        });
```




