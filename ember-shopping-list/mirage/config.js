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
  
  this.post('/items', function(schema, request) {
    let attrs = this.normalizedRequestAttrs()
    
    
    let already_exists = schema.items.findBy({"name": attrs["name"]});
    if (already_exists){
      return new Response(400, { 'Content-Type': 'application/vnd.api+json' }, { 'statusCode': 400, 'error': 'bad request' });
    }else{
      return schema.items.create(attrs);
    }

  });
  

  // this.passthrough('items');
}
