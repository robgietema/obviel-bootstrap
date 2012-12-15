
$(document).ready(function() {

    /* we are going to render the app on the body */
    var el = $('body');

    /* here we render the app. We have included the app JSON
       inline here, but of course you can produce this on the server
       as well instead */
    el.render({
        iface: 'app',
        parts: [{
            iface: 'navbar',
            navbar: {
                brand: 'MyApp',
                inverse: true,
                position: 'fixed-top',
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
        }, {
            iface: 'container',
            parts: [{
                iface: 'grid',
                rows: [{
                    columns: [{
                        iface: 'nav',
                        type: 'tabs',
                        stacked: true,
                        span: 4,
                        items: [{
                            iface: 'navLink',
                            title: 'Customer 1',
                            link: '#'
                        }, {
                            iface: 'navLink',
                            title: 'Customer 2',
                            active: true,
                            link: '#'
                        }, {
                            iface: 'navLink',
                            title: 'Customer 3',
                            link: '#'
                        }, {
                            iface: 'navLink',
                            title: 'Customer 4',
                            link: '#'
                        }, {
                            iface: 'navLink',
                            title: 'Customer 5',
                            link: '#'
                        }]
                    }, {
                        iface: 'tabs',
                        span: 8,
                        items: [{
                            title: 'Tab 1',
                            content: {
                                iface: 'table',
                                table: {
                                    bordered: true,
                                    headers: [{
                                        iface: 'textlineCell',
                                        value: 'Customer',
                                        icon: 'briefcase'
                                    }, {
                                        iface: 'textlineCell',
                                        value: 'Computer',
                                        icon: 'hdd'
                                    }, {
                                        iface: 'textlineCell',
                                        value: 'Owner',
                                        icon: 'user'
                                    }, {
                                        iface: 'textlineCell',
                                        value: 'Product'
                                    }, {
                                        iface: 'textlineCell',
                                        value: 'Product version'
                                    }],
                                    rows: [{
                                        cells: [{
                                            iface: 'linkCell',
                                            value: 'Danwell Inc.',
                                            link: '#'
                                        }, {
                                            iface: 'linkCell',
                                            value: 'Jos-Desktop',
                                            link: '#'
                                        }, {
                                            iface: 'textlineCell',
                                            value: 'Jos Henken'
                                        }, {
                                            iface: 'textlineCell',
                                            value: 'Firefox'
                                        }, {
                                            iface: 'textlineCell',
                                            value: '20.0.0.21'
                                        }]
                                    }, {
                                        cells: [{
                                            iface: 'linkCell',
                                            value: 'Danwell Inc.',
                                            link: '#'
                                        }, {
                                            iface: 'linkCell',
                                            value: 'Jos-Laptop',
                                            link: '#'
                                        }, {
                                            iface: 'textlineCell',
                                            value: 'Jos Henken'
                                        }, {
                                            iface: 'textlineCell',
                                            value: 'Firefox'
                                        }, {
                                            iface: 'textlineCell',
                                            value: '10.0.0.21',
                                            emphasis: 'warning'
                                        }]
                                    }, {
                                        cells: [{
                                            iface: 'linkCell',
                                            value: 'Danwell Inc.',
                                            link: '#'
                                        }, {
                                            iface: 'linkCell',
                                            value: 'Henk-Desktop',
                                            link: '#'
                                        }, {
                                            iface: 'textlineCell',
                                            value: 'Henk Danwell'
                                        }, {
                                            iface: 'textlineCell',
                                            value: 'Chrome'
                                        }, {
                                            iface: 'textlineCell',
                                            value: '30.0.0.21'
                                        }]
                                    }]
                                }
                            }
                        }, {
                            title: 'Tab 2',
                            content: {
                                iface: 'image',
                                src: 'rob.gietema@gmail.com',
                                type: 'rounded',
                                gravatar: true
                            }
                        }, {
                            title: 'Tab 3',
                            content: {
                                iface: 'textlineCell',
                                value: 'Todo'
                            }
                        }]
                    }]
                }]
            }]
        }]
    });
});

