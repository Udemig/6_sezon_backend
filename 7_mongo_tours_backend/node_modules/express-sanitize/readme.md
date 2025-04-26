express-sanitize
------------
An express middleware to sanitize all of the request inputs to prevent SQL injections and XSS attacks
[![Thanks to rimadarji](https://cdn.dribbble.com/users/2829177/screenshots/10763020/media/c03780df84015dd8a0bfbb6e2179575f.jpg "Thanks to geneyaro")](https://dribbble.com/geneyaro  "Thanks to geneyaro")



------------
The request ```body```,```params``` and ```queries``` will be sanitized. Also, you can edit middleware for custom edits like, escape or adding any characters.

I accept any contributes with open arms \\./

### Instalation
------------
 ```
    npm i express-sanitize
 ```

### Usage
------------
 ```
    const es = require('express-sanitize');
    app.use(es);
 ```

![](https://img.shields.io/github/stars/amindotb/validplease.svg) ![](https://img.shields.io/github/forks/amindotb/validplease.svg) ![](https://img.shields.io/github/tag/amindotb/validplease.svg) ![](https://img.shields.io/github/release/amindotb/validplease.svg) ![](https://img.shields.io/github/issues/amindotb/validplease.svg)