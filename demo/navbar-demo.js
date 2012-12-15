
$(document).ready(function() {

    /* we are going to render the navbar in the testnavbar el */
    var el = $('#testnavbar');

    /* here we render a navbar. We have included the navbar JSON
       inline here, but of course you can produce this on the server
       as well instead */
    el.render({
        iface: 'navbar',
        navbar: {
            brand: 'MyApp',
            parts: [{
                iface: 'nav',
                items: [{
                    iface: 'navLink',
                    title: 'Home',
                    link: '#',
                    active: true
                }, {
                    iface: 'navLink',
                    title: 'News',
                    link: '#'
                }, {
                    iface: 'navLink',
                    title: 'Events',
                    link: '#'
                }, {
                    iface: 'navDivider',
                }, {
                    iface: 'navLink',
                    title: 'Users',
                    link: '#'
                }],
            }, {
                iface: 'navbarSearch',
                placeholder: 'Search',
                align: 'right'
            }, {
                iface: 'nav',
                align: 'right',
                items: [{
                    iface: 'navDropdown',
                    title: 'John Doe',
                    items: [{
                        iface: 'navHeader',
                        title: 'Profile'
                    }, {
                        iface: 'navLink',
                        title: 'Edit profile',
                        link: '#'
                    }, {
                        iface: 'navLink',
                        title: 'Personal preferences',
                        link: '#',
                        items: [{
                            iface: 'navLink',
                            title: 'Edit',
                            link: '#'
                        }, {
                            iface: 'navLink',
                            title: 'Reset',
                            link: '#'
                        }]
                    }, {
                        iface: 'navDivider',
                    }, {
                        iface: 'navLink',
                        title: 'Logout',
                        link: '#'
                    }]
                }]
            }]
        }
    });
});
