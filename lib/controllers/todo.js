// Require
var _ = require('lodash');

// Declare dependencies
module.exports['$inject'] = ['$scope', 'todoService'];

module.exports = function ($scope, todoService) {
    var retrieveTodos = function(){
        todoService.all().then(function(todos){
            $scope.todos = todos;
        })
    };

    $scope.newTodo = '';

    $scope.addTodo = function(){
        var newTodo = {
            title: $scope.newTodo.trim(),
            status: 'not started'
        };

        if(!newTodo.title) {
            return;
        }

        $scope.todos.push(newTodo);

        todoService.post(newTodo)
            .then(null, function(){
                // TODO: Handle error
            });

        $scope.newTodo = '';
    };

    $scope.archiveCompleted = function(){
        _($scope.todos)
            .where({ status: 'done' })
            .forEach(function(todo){
                todo.status = 'archived';
                todoService.put(todo)
                    .then(null, function(){
                    // TODO: Handle error
                    });
            });
    };

    $scope.nextStatus = function(todo){
        todo.status = {
            'not started': 'done',
            'done': 'not started'
        }[todo.status];

        todoService.put(todo)
            .then(null, function(){
                // TODO: Handle error
            });
    };

    $scope.getStatusClass = function(status){
        return {
            'not started': 'todo-not-started',
            'done': 'todo-done'
        }[status];
    };

    $scope.archived = function(todo){
        return todo.status !== 'archived';
    };

    $scope.statusOrder = function(todo){
        return {
            'not started': 1,
            'done': 0
        }[todo.status];
    };

    retrieveTodos();
};
