(function () {
  var sandbox = {
    print: function (message) {
      console.log('sum = ' + message);
    }
  };

  var code1 = 'function sum(a, b) { return a + b; } sum(5, 10);';
  var code2 = 'function sum(a, b) { return a + b; } print(sum(5, 10));';

  var context = vm.createContext(sandbox);

  var script1 = new vm.Script(code1);
  var script2 = new vm.Script(code2);

  console.log('vm.isContext');
  console.log('Sandbox: ' + vm.isContext(sandbox));
  console.log('Not sandbox: ' + vm.isContext({}));

  console.log('Script.runInNewContext');
  console.log(script1.runInNewContext());

  console.log('vm.runInNewContext');
  console.log(vm.runInNewContext(code1));

  console.log('Script.runInContext');
  script2.runInContext(context);

  console.log('vm.runInContext');
  vm.runInContext(code2, context);

  window.print = sandbox.print;

  console.log('Script.runInThisContext');
  script2.runInThisContext();

  console.log('vm.runInThisContext');
  vm.runInThisContext(code2);
}());
