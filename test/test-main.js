var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  paths: {
    'text': 'dist/lib/RequireJS/text',
    'json': 'dist/lib/RequireJS/json',
    'propertyParser': 'dist/lib/RequireJS/propertyParser',
    'font': 'dist/lib/RequireJS/font',
    'unitary': 'src/js/unitary'
  },


  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});

// require(['text', 'font', 'json'], (text, font, json) => {
//   debugger;
//   console.dir(text);
//   console.dir(font);
//   console.dir(json);
// });
