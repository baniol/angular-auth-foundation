'use strict';
describe('controllers', function(){

  var scope;
  var ctrl;
  var notesPromise;
  var Notes;

  beforeEach(
    //Initiate the app before each test
    module('AngularAuth', function ($provide) {
      // Mock Notes service
      // http://stackoverflow.com/a/20830042
      Notes = {
        getNotes: function () {}
        //delete: function () {}
      };
      spyOn(Notes, 'getNotes').andReturn(httpMocks.notesGet);
      $provide.value('Notes', Notes);
    })
  );

  beforeEach(
    // Injecting necessary components
    inject(
      function($rootScope, $controller, $httpBackend) {
        scope = $rootScope.$new();
        ctrl = $controller('NoteListCtrl', {$scope: scope});
      }
    )
  );

  describe('When notes collection is loaded', function () {
    it('should have a proper lenght', function () {
      expect(scope.notes.length).toEqual(4);
    });
    it('should be sorted', function () {
      expect(scope.notes[0].title).toEqual('test note 2 title');
    });
  });

  describe('When a note is selected', function () {

    beforeEach(function () {
      scope.select(httpMocks.notesGet[1]);
    });

    it('should set a current note id', function () {
      expect(scope.currentId).toEqual('12346');
    });

  });

  describe('When a new note push is triggered', function () {

    beforeEach(function () {
      scope.$broadcast('pushNote', httpMocks.newNote);
    });

    it('should increase the collection length by 1', function () {
      expect(scope.notes.length).toEqual(5);
    });

    it('should set the current id to the new note id', function () {
      expect(scope.currentId).toEqual('44445');
    });

  });

  describe('When a note is deleted', function () {

    //var mockDelete;
    var deferred;

    beforeEach(function () {
      inject(function ($q) {
        deferred = $q.defer();
      });
      //mockDelete = {
        //confirm: function () {}
      //};
      //Notes.delete = function () {}
      //Notes.delete = $q.defer();
      //var mockEvent = {stopPropagation: function (){}};
      //scope.delete(httpMocks.notesGet, mockEvent);
    });

    xit('....', function () {
      Notes.delete = deferred.promise;
      spyOn(Notes, 'delete').andReturn('dupa');
    });

    xit('should simulate promise', inject(function($q, $rootScope) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      var resolvedValue;

      promise.then(function(value) { resolvedValue = value; });
      expect(resolvedValue).toBeUndefined();

      // Simulate resolving of promise
      deferred.resolve(123);
      // Note that the 'then' function does not get called synchronously.
      // This is because we want the promise API to always be async, whether or not
      // it got called synchronously or asynchronously.
      expect(resolvedValue).toBeUndefined();

      // Propagate promise resolution to 'then' functions using $apply().
      //$rootScope.$apply();
      //expect(resolvedValue).toEqual(123);
    }));

    //it('...', function () {
      //var deferred = $q.defer();
      //deferred.resolve('yes');
      //spyOn(mockDelete, 'confirm').andReturn({result:deferred.promise});
      //expect(mockDelete.confirm).toHaveBeenCalledWith('Are you sure?');
    //});

  });

});
