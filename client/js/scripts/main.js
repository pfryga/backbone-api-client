$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
    options.url = 'http://backbonejs-beginner.herokuapp.com' + options.url;
});

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

var Users = Backbone.Collection.extend({
    url: '/users'
});

var User = Backbone.Model.extend({
    urlRoot: '/users'
});

var UserList = Backbone.View.extend({
    el: '.page',
    render: function () {
        var that = this;
        var users = new Users();
        users.fetch({
            success: function(users) {
                var template = _.template($('#user-list-template').html());
                that.$el.html(template({users: users.models}));
            }
        });
    }
});

var EditUser = Backbone.View.extend({
    el: '.page',
    render: function () {
        var template = _.template($('#edit-user-template').html());
        this.$el.html(template({}));
    },
    events: {
        'submit .edit-user-form': 'saveUser'
    },
    saveUser: function (ev) {
        var userDetails = $(ev.currentTarget).serializeObject();
        var user = new User();
        user.save(userDetails, {
            success: function (user) {
                console.log('success: ' + user.toJSON());
            }
        });
        console.log(userDetails);
        return false;
    }
});

var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'new': 'editUser'
    }
});

var userList = new UserList();
var editUser = new EditUser();

var router = new Router();
router.on('route:home', function() {
    userList.render();
});
router.on('route:editUser', function() {
    editUser.render();
});

Backbone.history.start();
