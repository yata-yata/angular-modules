// Load modules

var Lab = require('lab'),
    Sinon = require('sinon'),
    TodoService = require('../../').services.Todo,

    // Declare internals
    internals = {},

    // Test aliases
    expect = Lab.expect,
    before = Lab.before,
    beforeEach = Lab.beforeEach,
    after = Lab.after,
    afterEach = Lab.afterEach,
    describe = Lab.experiment,
    it = Lab.test,
    assert = Lab.assert;

describe('Todo', function(){

    var promise = function(val){
        return {
            then: function(fn){
                if(fn) {
                    return promise(fn(val));
                }
            }
        }
    };

    describe('#all', function(){
        it('should call `/api/todos` and return the `data` property of the response', function(done){
            var response = {
                    data: [
                        { title: 'A', status: 'not started' }
                    ]
                },
                http = {
                    get: function(url){
                        expect(url).to.equal('/api/todos');

                        return promise(response);
                    }
                },
                todoService = new TodoService(http);

            todoService.all().then(function(result){
                expect(result).to.deep.equal(response.data);

                done();
            });
        });
    });

    describe('#get', function(){
        it('should call `/api/todos/{{id}}` and return the `data` property of the response', function(done){
            var response = {
                    data: { title: 'A', status: 'not started' }
                },
                id = 123,
                http = {
                    get: function(url){
                        expect(url).to.equal('/api/todos/' + id);

                        return promise(response);
                    }
                },
                todoService = new TodoService(http);

            todoService.get(id).then(function(result){
                expect(result).to.deep.equal(response.data);

                done();
            });
        });
    });

    describe('#post', function(){
        it('should call `/api/todos/` and return the `data` property of the response', function(done){
            var todo = { title: 'A', status: 'not started' },
                response = {
                    data: todo
                },
                http = {
                    post: function(url){
                        expect(url).to.equal('/api/todos');

                        return promise(response);
                    }
                },
                todoService = new TodoService(http);

            todoService.post(todo).then(function(result){
                expect(result).to.deep.equal(response.data);

                done();
            });
        });

        it('should remove all properties except `status` and `title`', function(done){
            var todo = { title: 'A', status: 'not started', blah: 'boo' },
                response = {
                    data: todo
                },
                http = {
                    post: function(url, todo){
                        expect(JSON.parse(todo)).to.deep.equal({ title: 'A', status: 'not started' });

                        return promise(response);
                    }
                },
                todoService = new TodoService(http);

            todoService.post(todo).then(function(result){
                done();
            });
        });
    });

    describe('#put', function(){
        it('should call `/api/todos/{{id}}` and return the `data` property of the response', function(done){
            var todo = { title: 'A', status: 'not started', id: 123 },
                response = {
                    data: todo
                },
                http = {
                    put: function(url){
                        expect(url).to.equal('/api/todos/' + todo.id);

                        return promise(response);
                    }
                },
                todoService = new TodoService(http);

            todoService.put(todo).then(function(result){
                expect(result).to.deep.equal(response.data);

                done();
            });
        });

        it('should remove all properties except `status` and `title`', function(done){
            var todo = { title: 'A', status: 'not started', id: 123 },
                response = {
                    data: todo
                },
                http = {
                    put: function(url, todo){
                        expect(JSON.parse(todo)).to.deep.equal({ title: 'A', status: 'not started' });

                        return promise(response);
                    }
                },
                todoService = new TodoService(http);

            todoService.put(todo).then(function(result){
                done();
            });
        });
    });

    describe('#destroy', function(){
        it('should call `/api/todos/{{id}}` and return the `data` property of the response', function(done){
            var id = 123,
                response = {
                    data: null
                },
                http = {
                    delete: function(url){
                        expect(url).to.equal('/api/todos/' + id);

                        return promise(response);
                    }
                },
                todoService = new TodoService(http);

            todoService.destroy(id).then(function(result){
                expect(result).to.deep.equal(response.data);

                done();
            });
        });

    });
});

