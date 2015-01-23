var httpMocks = {};

httpMocks.notesGet = [
  {
    _id: '12345',
    userId: '4444',
    title: 'test note 1 title',
    content: 'test note content',
    html: '<p>test note content</p>',
    order: 4,
    tags: [{text: 'one'}],
    added: '2014-11-22T10:54:46.796Z'
  },
  {
    _id: '12346',
    userId: '4444',
    title: 'test note 2 title',
    content: 'test note 2 content',
    html: '<p>test note 2 content</p>',
    order: 1,
    tags: [{text: 'two'}],
    added: '2014-11-22T10:54:46.796Z'
  },
  {
    _id: '12347',
    userId: '4444',
    title: 'test note 3 title',
    content: 'test note 3 content',
    html: '<p>test note 3 content</p>',
    order: 9,
    tags: [{text: 'one'}],
    added: '2014-11-22T10:54:46.796Z'
  },
  {
    _id: '12349',
    userId: '4444',
    title: 'test note 4 title',
    content: 'test note 4 content',
    html: '<p>test note 4 content</p>',
    order: 2,
    tags: [{text: 'three'}],
    added: '2014-11-22T10:54:46.796Z'
  }
];

httpMocks.newNote = {
  _id: '44445',
  userId: 'newuser001',
  title: 'new note title',
  content: 'new note content',
  html: '<p>new note content</p>',
  order: 4,
  tags: [{text: 'new tag'}],
  added: '2014-12-02T10:54:46.796Z'
};
