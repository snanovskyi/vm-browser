(function () {
  var vm = {};
  var contextifiedSandboxes = [];

  // Some browsers don't know about Array.prototype.indexOf
  function indexOf(array, element) {
    var result = -1;
    var i;
    if (!Array.prototype.indexOf) {
      for (i = 0; i < array.length; i++) {
        if (array[i] === element) {
          result = i;
          break;
        }
      }
    } else {
      result = array.indexOf(element);
    }
    return result;
  }

  function createIFrame() {
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    return iframe;
  }

  function createIFrameWithContext(sandbox) {
    var iframe = createIFrame();
    var key;
    document.body.appendChild(iframe);
    if (sandbox) {
      for (key in sandbox) {
        if (sandbox.hasOwnProperty(key)) {
          iframe.contentWindow[key] = sandbox[key];
        }
      }
      contextifiedSandboxes.push(sandbox);
    }
    return iframe;
  }

  function getEval(context) {
    return context.execScript ? context.execScript : context.eval;
  }

  function runCodeInNewContext(code, sandbox) {
    var iframe = createIFrameWithContext(sandbox);
    var result = getEval(iframe.contentWindow)(code);
    document.body.removeChild(iframe);
    return result;
  }

  function runCodeInContext(code, context) {
    if (!context) {
      throw new Error('Context cannot be undefined');
    }
    return getEval(context)(code);
  }

  function Script(code) {
    this.code = code;
  }

  Script.prototype.runInContext = function (context) {
    return runCodeInContext(this.code, context);
  };

  Script.prototype.runInNewContext = function (sandbox) {
    return runCodeInNewContext(this.code, sandbox);
  };

  Script.prototype.runInThisContext = function () {
    return runCodeInContext(this.code, window);
  };

  vm.Script = Script;

  vm.createContext = function (sandbox) {
    return createIFrameWithContext(sandbox).contentWindow;
  };

  vm.isContext = function (sandbox) {
    return indexOf(contextifiedSandboxes, sandbox) !== -1;
  };

  vm.runInContext = function (code, context) {
    return runCodeInContext(code, context);
  };

  // Not possible in browser?
  // vm.runInDebugContext = function (code) {
  // };

  vm.runInNewContext = function (code, sandbox) {
    return runCodeInNewContext(code, sandbox);
  };

  vm.runInThisContext = function (code) {
    return runCodeInContext(code, window);
  };

  window.vm = vm;
}());
