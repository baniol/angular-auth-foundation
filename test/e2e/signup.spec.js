var config = require('./e2e-config.js').config;

describe('signup', function () {
  beforeEach(function () {
    browser.get(config.url + '/signup');
    browser.ignoreSynchronization = true;
    browser.manage().timeouts().implicitlyWait(2100);
    browser.waitForAngular();
  });

  it('should not autheticate a user when the crediantials do not match', function() {
    element(by.css('.signup-btn')).click().then(function () {
      var all = element.all(by.css('fieldset small'));
      expect(all.getText()).toEqual(['Username must be at least 4 characters long', 'Email is not valid', 'Password must be at least 4 characters long']);
    });
  });

  it('should display email error and disable submit button when email not valid', function () {
    element(by.name('email')).sendKeys('asdf');
    element(by.css('.email-error')).getText().then(function (name) {
      expect(name).toBe('Email is not valid');
    });
    expect(element(by.css('.signup-btn')).isEnabled()).toBe(false);
  });

  it('should successfully register a new user', function () {
    element(by.model('username')).sendKeys('newtestuser');
    element(by.model('email')).sendKeys('test@user.new');
    element(by.model('password')).sendKeys('password');
    element(by.css('.signup-btn')).click().then(function () {
      element(by.css('.notification')).getText().then(function (name) {
        expect(name).toBe('Your account has been created.');
      });
    });
  });
});

describe('should login & logout after singup', function () {
  it('should autheticate a user when the crediantials match', function() {
    browser.manage().timeouts().implicitlyWait(1000);

    browser.get(config.url + '/login');

    var username = element(by.model('username'));
    var password = element(by.model('password'));
    username.sendKeys('newtestuser');
    password.sendKeys('password');
    element(by.css('.login-btn')).click().then(function () {
      expect(browser.isElementPresent($('.user-name'))).toBe(true);
      expect(browser.isElementPresent($('[ui-sref="login"]'))).toBe(false);
      expect(browser.isElementPresent($('[ui-sref="signup"]'))).toBe(false);
      element(by.css('.user-name')).getText().then(function (name) {
        expect(name).toBe('newtestuser');
      });
    });
  });
  it('should logout', function () {
    element(by.css('.logout-link')).click().then(function () {
      expect(browser.getCurrentUrl()).toMatch(config.url + '/login');
    });
  });
});

describe('remove account', function () {
  it('should autheticate a user when the crediantials match', function() {
    browser.manage().timeouts().implicitlyWait(2000);

    browser.get(config.url + '/login');

    var username = element(by.model('username'));
    var password = element(by.model('password'));
    username.sendKeys('newtestuser');
    password.sendKeys('password');
    element(by.css('.login-btn')).click().then(function () {
      expect(browser.isElementPresent($('.user-name'))).toBe(true);
      expect(browser.isElementPresent($('[ui-sref="login"]'))).toBe(false);
      expect(browser.isElementPresent($('[ui-sref="signup"]'))).toBe(false);
      element(by.css('.user-name')).getText().then(function (name) {
        expect(name).toBe('newtestuser');
      });
    });
  });

  it('should remove user`s account', function () {
    browser.get(config.url + '/editprofile');
    browser.manage().timeouts().implicitlyWait(2000);
    element(by.css('.remove-account-btn')).click().then(function () {
      var alertDialog = browser.switchTo().alert();
      alertDialog.accept();
      expect(browser.getCurrentUrl()).toMatch(config.url + '/home');
      // @TODO check redirect
      //expect(name).toBe('Email is not valid');
    });
  });
});
