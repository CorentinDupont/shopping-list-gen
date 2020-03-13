import { Response } from 'miragejs';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = 'http://localhost:3009';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = '/';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */
  this.get('/items');
  
  this.post('/items', function(schema) {
    let attrs = this.normalizedRequestAttrs()
    
    
    let already_exists = schema.items.findBy({"name": attrs["name"]});
    if (already_exists){
      return new Response(400, { 'Content-Type': 'application/vnd.api+json' }, { 'statusCode': 400, 'error': 'bad request' });
    }else{
      return schema.items.create(attrs);
    }

  });

  this.post('token', function() {
    return '{"recipeIds":[],"itemIds":[],"_id":"5e6b4ba507ae613c343cdeef","username":"azertyui","password":"$2b$10$GIIKij1JYeCueiEVM2dUxOGDDPuCKwkW3NL7KHHalyS2D1jzbhyDq","createdAt":"2020-03-13T09:00:21.197Z","access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNmI0YmE1MDdhZTYxM2MzNDNjZGVlZiIsInVzZXJuYW1lIjoiYXplcnR5dWkiLCJpYXQiOjE1ODQwOTQ3MTV9.SmFSkKXN6hYodpqXOKQY7sZ1Lf-7KDb0BwKtmBAcQRE"}';
  })

  this.post('users', function() {
    return '{"data":{"type":"users","id":"5e6b6752190060538850512d","attributes":{"username":null,"password":"$2b$10$Pm7vI11RQRq48.pAXFLcV.1qahJqBvbV/1WpEscGZnrWQRkxfk.Hm"}}}';
  })


  
  

  // this.passthrough('items');
}
