// Declare dependencies
module.exports['$inject'] = ['$http', '$q'];

module.exports = function($http, $q) {

    var clean = function(todo){
        return {
            status: todo.status,
            title: todo.title
        };
    };

    return {
        all: function(){
            return $http.get('/api/todos').then(function(result){
                return result.data;
            });
        },
        get: function (id){
            return $http.get('/api/todos/' + id).then(function(result){
                return result.data;
            });
        },
        post: function(todo){
            return $http.post('/api/todos', JSON.stringify(clean(todo))).then(function(result){
                return result.data;
            });
        },
        put: function (todo){
            return $http.put('/api/todos/' + todo.id, JSON.stringify(clean(todo))).then(function(result){
                return result.data;
            });
        },
        destroy: function(id){
            return $http.delete('/api/todos/' + id).then(function(result){
                return result.data;
            });
        }
    };
};
