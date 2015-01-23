'use strict';
describe('controllers', function(){

  var scope;
  var ctrl;
  var httpBackend;
  var notesPromise;
  //var Notes = {};

  beforeEach(module('AngularAuth'));

  beforeEach(inject(function($rootScope, $controller, $httpBackend, Notes, apiUrl) {
    //function puln () {
      //return Notes.pullNotes();
    //}
    scope = $rootScope.$new();
    ctrl = $controller('NoteListCtrl', {$scope: scope});
    httpBackend = $httpBackend;
    //notesPromise = puln();
    // https://github.com/angular-ui/ui-router/issues/212
    httpBackend.whenGET(/views.*/).respond(200, '');
    httpBackend.when('POST', apiUrl + '/checkauth').respond({token: '1234'});
    httpBackend.when('GET', apiUrl + '/api/notes').respond(httpMocks.notesGet);
    // @TODO remove query=undefined
    httpBackend.when('GET', apiUrl + '/api/tags?query=undefined').respond([{}, {}, {}]);
    // Mock tags call ??
    httpBackend.when('GET', apiUrl + '/api/tags').respond([{}, {}, {}]);
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('when notes are loaded to the scope.notes collections', function() {
    it('should have a proper lenght', function() {
      httpBackend.flush();
      //console.log(scope);
      expect(scope.notes.length).toEqual(4);
    });
    it('should be sorted', function() {
      httpBackend.flush();
      expect(scope.notes[0].title).toEqual('test note 2 title');
    });
  });

  describe('when a note from the list is clicked', function() {
    beforeEach(function () {
      httpBackend.flush();
      scope.select(scope.notes[0]);
    });

    it('should set scope.currentNote.tags', function() {
      expect(scope.currentNote.tags).toEqual(scope.notes[0].tags);
    });
  });

  xit('should succeed in doing a simple non related async test', function(){
    var cb = jasmine.createSpy();
    setTimeout(cb,1900);
    waitsFor(function(){
      return cb.callCount > 0;
    },'should succeed',2000);
    runs(function(){
      expect(cb).toHaveBeenCalled();
    });
  });

});
