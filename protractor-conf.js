exports.config = {
  //seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.44.0.jar',  
  seleniumAddress: 'http://localhost:4444/wd/hub',

  capabilities: {
    browserName: 'chrome',
    version: '',
    platform: 'ANY'
  },

  jasmineNodeOpts: {
    showColors: true
  }
};
