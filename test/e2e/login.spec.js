var config = require('./e2e-config').config;

describe('homepage', function() {
  beforeEach(function() {
    browser.get(config.url);
    //browser.ignoreSynchronization = false;
    browser.manage().timeouts().implicitlyWait(1000);
    browser.waitForAngular();
  });

  it('should redirect to /login when location hash is login', function() {
    expect(browser.getLocationAbsUrl()).toMatch('/home');
  });

  it('should not display user name position', function() {
    expect(browser.isElementPresent($('.user-name'))).toBe(false);
  });

  it('should display login menu position', function() {
    expect(browser.isElementPresent($('[ui-sref="login"]'))).toBe(true);
  });

  it('should display signup menu position', function() {
    expect(browser.isElementPresent($('[ui-sref="signup"]'))).toBe(true);
  });

});

describe('login', function () {
  beforeEach(function () {
    browser.get(config.url + '/login');
    browser.manage().timeouts().implicitlyWait(1000);
    browser.waitForAngular();
  });

  it('should not autheticate a user when the crediantials do not match', function() {
    var username = element(by.model('username'));
    var password = element(by.model('password'));
    username.sendKeys('testc');
    password.sendKeys('invalid');
    element(by.css('.login-btn')).click().then(function () {
      expect(browser.isElementPresent($('.user-name'))).toBe(false);
      expect(browser.isElementPresent($('[ui-sref="login"]'))).toBe(true);
      expect(browser.isElementPresent($('[ui-sref="signup"]'))).toBe(true);
      element(by.css('.notification')).getText().then(function (name) {
        expect(name).toBe('Invalid username or password!');
      });
    });
  });

});
