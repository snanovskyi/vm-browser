(function () {
  var vm = {};

  function createIFrame() {
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    return iframe;
  }

  function runCodeInNewContext(code, sandbox) {
    var iframe = createIFrame();
    var result;
    document.body.appendChild(iframe);
    if (sandbox) {
      Object.keys(sandbox).forEach(function (key) {
        iframe.contentWindow[key] = sandbox[key];
      });
    }
    result = iframe.contentWindow.eval(code);
    document.body.removeChild(iframe);
    return result;
  }

  function Script(code) {
    this.code = code;
  }

  Script.prototype.runInContext = function (context) {
  };

  Script.prototype.runInNewContext = function (sandbox) {
    return runCodeInNewContext(this.code, sandbox);
  };

  Script.prototype.runInThisContext = function () {
  };

  vm.Script = Script;

  vm.createContext = function (sandbox) {
  };

  vm.isContext = function (sandbox) {
  };

  vm.runInContext = function (code, context) {
  };

  vm.runInDebugContext = function (code) {
  };

  vm.runInNewContext = function (code, sandbox) {
    return runCodeInNewContext(code, sandbox);
  };

  vm.runInThisContext = function (code) {
  };

  window.vm = vm;
}());
