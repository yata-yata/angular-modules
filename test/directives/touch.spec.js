// Load modules

var Lab = require('lab'),
    Touch = require('../../').directives.touch,

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

describe('swipe left', function(){
    it('should call the function when swipe left is triggered', function(done){
        var scope = {
                $apply: function(fn){
                    fn();
                }
            },
            parse = function(){
                return function(){
                    // Pass if this is called
                    done();
                }
            },
            events = {
                on: function(event, fn){
                    this._events = this._events || {};
                    this._events[event] = fn;
                },
                trigger: function(event){
                    this._events[event]();
                }
            };

        var binding = Touch.swipeLeft(parse, events);

        binding.link(scope, null, { attrs: { swipeLeft: '' }});

        events.trigger('swipeleft');

    });
});

describe('swipe right', function(){

    it('should call the function when swipe right is triggered', function(done){
        var scope = {
                $apply: function(fn){
                    fn();
                }
            },
            parse = function(){
                return function(){
                    // Pass if this is called
                    done();
                }
            },
            events = {
                on: function(event, fn){
                    this._events = this._events || {};
                    this._events[event] = fn;
                },
                trigger: function(event){
                    this._events[event]();
                }
            };

        var binding = Touch.swipeRight(parse, events);

        binding.link(scope, null, { attrs: { swipeRight: '' }});

        events.trigger('swiperight');

    });
});
