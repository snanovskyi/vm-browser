# vm-browser
Browser polyfill for Node.js VM

## Browser compatibility
Works in all modern browsers(Internet Explorer 8+)

## Usage
You can use it in 2 ways:
- Add [vm.js](https://github.com/sun1x/vm-browser/blob/master/dist/vm.js) via script tag
- Copy source code from [index.js](https://github.com/sun1x/vm-browser/blob/master/index.js) to your project

## API
Make sure to check [examples](https://github.com/sun1x/vm-browser/tree/master/examples)
- #### vm.Script
  - #### new vm.Script(code)
    ```javascript
    var code = 'console.log("Hello");';
    var script = new vm.Script(code);
    ```
  - #### script.runInContext(context)
    ```javascript
    var code = 'console.log(a);';
    var sandbox = { a: 1 };
    var context = vm.createContext(sandbox);
    var script = new vm.Script(code);
    script.runInContext(context);
    ```
  - #### script.runInNewContext(sandbox)
    ```javascript
    var code = 'console.log(a);';
    var sandbox = { a: 1 };
    var script = new vm.Script(code);
    script.runInNewContext(sandbox);
    ```
  - #### script.runInThisContext()
    ```javascript
    var code = 'console.log(someVar);';
    var script = new vm.Script(code);
    window.someVar = 1;
    script.runInThisContext();
    ```
- #### vm.createContext(sandbox)
  ```javascript
  var sandbox = { a: 5, b: 10, c: 'something' };
  var context = vm.createContext(sandbox);
  ```
- #### vm.isContext(sandbox)
  ```javascript
  var sandbox = { a: 1 };
  var context = vm.createContext(sandbox);
  vm.isContext(sandbox); // => true
  vm.isContext({}); // => false
  ```
- #### vm.runInContext(code, context)
  ```javascript
  var code = 'console.log(a);';
  var sandbox = { a: 1 };
  var context = vm.createContext(sandbox);
  vm.runInContext(code, context);
  ```
- #### vm.runInNewContext(code, sandbox)
  ```javascript
  var code = 'console.log(a)';
  var sandbox = { a: 1 };
  vm.runInNewContext(code, sandbox);
  ```
- #### vm.runInThisContext(code)
  ```javascript
  var code = 'console.log(someVar)';
  window.someVar = 1;
  vm.runInThisContext(code);
  ```

## Development
- Install
  ```
  $ npm install
  ```
- Lint
  ```
  $ npm run lint
  ```
- Build
  ```
  $ npm run build
  ```

## Copyright
ISC © [Sergey Nanovsky](https://twitter.com/sun1x)
