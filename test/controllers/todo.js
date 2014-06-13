// Load modules

var Lab = require('lab'),
    Todo = require('../../').controllers.Todo,

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
    var promise = {
            then: function(fn){
                fn();
            }
    },
    todoService = {
        all: function(){
            return promise;
        }
    };

    describe('#addTodo', function(){
    });

    describe('#archived', function(){
        it('returns false if the todo is archived', function(done){
            var scope = {},
                todo = new Todo(scope, todoService);

            var result = scope.archived({ status: 'archived'})
            expect(result).to.equal(false);

            done();

        });

        it('returns true if the todo is not archived', function(done){
            var scope = {},
                todo = new Todo(scope, todoService);

            var result = scope.archived({ status: 'not started'})
            expect(result).to.equal(true);

            done();

        });
    });
});
