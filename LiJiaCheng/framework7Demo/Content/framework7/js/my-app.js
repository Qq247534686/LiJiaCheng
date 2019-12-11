var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    //panel: {
    //    swipe: 'left',
    //},
    data: function () {
        return {
            username: 'vladimir',
            firstName: 'Vladimir',
            lastName: 'Kharlampidi'
        };
    },
    // Add default routes
    routes: [
        {
            path: '/about/',
            url: '/home/about',
        },
    ],
    // ... other parameters
});

var mainView = app.views.create('.view-main');