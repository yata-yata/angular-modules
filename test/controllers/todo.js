// Load modules

var Lab = require('lab'),
    Sinon = require('sinon'),
    TodoCtrl = require('../../').controllers.Todo,

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
                    fn(val);
                }
            }
        }
    },
    todoService = {
        all: function(){
            return promise([]);
        }
    };

    describe('#addTodo', function(){
        beforeEach(function(done){
            todoService.post = function(){
                return promise();
            };

            done();
        });

        it('pushes a new todo using `newTodo` as the title to $scope.todos', function(done){
            var scope = {},
                todoCtrl = new TodoCtrl(scope, todoService),
                curLen = scope.todos.length,
                title = scope.newTodo = 'blah';

            scope.addTodo();

            expect(scope.todos.length).to.equal(curLen + 1);
            expect(scope.todos[curLen].title).to.equal(title);

            done();
        });

        it('calls the service to create a new todo', function(done){
            var scope = {},
                todoCtrl = new TodoCtrl(scope, todoService),
                curLen = scope.todos.length,
                title = scope.newTodo = 'blah';


            todoService.post = function(todo){
                expect(todo).to.deep.equal({
                    title: title,
                    status: 'not started'
                });

                done();
                return promise();
            };

            scope.addTodo();

        });

        it('noops if there is no title', function(done){

            var scope = {},
                todoCtrl = new TodoCtrl(scope, todoService),
                curLen = scope.todos.length,
                title = scope.newTodo = '';

            scope.addTodo();

            expect(scope.todos.length).to.equal(curLen);

            done();
        });
    });

    describe('#archiveCompleted', function(){
        beforeEach(function(done){
            todoService.put = function(){
                return promise();
            };

            done();
        });

        it('sets all todos with status done to status archived', function(done){
            var scope = {},
                todoCtrl = new TodoCtrl(scope, todoService);

            scope.todos = [
                { title: 'A', status: 'done' },
                { title: 'B', status: 'not started' }
            ];

            scope.archiveCompleted();

            expect(scope.todos[0].status).to.equal('archived');
            expect(scope.todos[1].status).to.equal('not started');

            done();
        });

        it('calls service to update each todo changed', function(done){
            var scope = {},
                spy = Sinon.spy(todoService, 'put'),
                todoCtrl = new TodoCtrl(scope, todoService);

            scope.todos = [
                { title: 'A', status: 'done' },
                { title: 'B', status: 'done' },
                { title: 'C', status: 'not started' }
            ];

            scope.archiveCompleted();

            expect(spy.callCount).to.equal(2);

            done();
        });
    });

    describe('#nextStatus', function(){
        beforeEach(function(done){
            todoService.put = function(){
                return promise();
            };

            done();
        });

        it('changes status from `not started` to `done`', function(done){
            var scope = {},
                todo = { title: 'A', status: 'not started'},
                todoCtrl = new TodoCtrl(scope, todoService);

            scope.nextStatus(todo);
            expect(todo.status).to.equal('done');

            done();
        });

        it('changes status from `done` to `not started`', function(done){
            var scope = {},
                todo = { title: 'A', status: 'done'},
                todoCtrl = new TodoCtrl(scope, todoService);

            scope.nextStatus(todo);
            expect(todo.status).to.equal('not started');

            done();
        });

        it('calls service to update each todo changed', function(done){
            var scope = {},
                todo = { title: 'A', status: 'done'},
                spy = Sinon.spy(todoService, 'put'),
                todoCtrl = new TodoCtrl(scope, todoService);


            scope.nextStatus(todo);
            expect(spy.calledWith(todo)).to.equal(true);

            done();
        });
    });

    describe('#archived', function(){
        it('returns false if the todo is archived', function(done){
            var scope = {},
                todoCtrl = new TodoCtrl(scope, todoService);

            var result = scope.archived({ status: 'archived'})
            expect(result).to.equal(false);

            done();

        });

        it('returns true if the todo is not archived', function(done){
            var scope = {},
                todoCtrl = new TodoCtrl(scope, todoService);

            var result = scope.archived({ status: 'not started'})
            expect(result).to.equal(true);

            done();

        });
    });

    describe('#getStatusClass', function(){
        it('returns `todo-icon-not-started` for status `not started`', function(done){
            var scope = {},
                todoCtrl = new TodoCtrl(scope, todoService);

            var result = scope.getStatusClass('not started');
            expect(result).to.equal('todo-icon-not-started');

            done();
        });

        it('returns `todo-icon-done` for status `done`', function(done){
            var scope = {},
                todoCtrl = new TodoCtrl(scope, todoService);

            var result = scope.getStatusClass('done');
            expect(result).to.equal('todo-icon-done');

            done();
        });
    });
});
