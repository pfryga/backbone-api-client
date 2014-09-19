$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
    options.url = 'http://backbonejs-beginner.herokuapp.com' + options.url;
});

var Users = Backbone.Collection.extend({
    url: '/users'
});

var UserList = Backbone.View.extend({
    el: '.page',
    render: function () {
        var that = this;
        var users = new Users();
        users.fetch({
            success: function() {
                // console.log('bangla');
                that.$el.html('some example content');
            }
        });
    }
});

var Router = Backbone.Router.extend({
    routes: {
        '' : 'home'
    }
});

var userList = new UserList();

var router = new Router();
router.on('route:home', function() {
    userList.render();
});

Backbone.history.start();
