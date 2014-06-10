exports.swipeLeft = function($parse, $ionicGesture) {
    return {
        restrict :  'A',
        link : function(scope, elem, attrs) {
            var fn = $parse(attrs.swipeLeft);
            $ionicGesture.on('swipeleft', function(event) {
                scope.$apply(function() {
                    fn(scope, {$event:event});
                });
            }, elem);
        }
    }
};

exports.swipeRight = function($parse, $ionicGesture) {
    return {
        restrict :  'A',
        link : function(scope, elem, attrs) {
            var fn = $parse(attrs.swipeRight);
            $ionicGesture.on('swiperight', function(event) {
                scope.$apply(function() {
                    fn(scope, {$event:event});
                });
            }, elem);
        }
    }
};
