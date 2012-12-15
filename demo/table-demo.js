
$(document).ready(function() {

    /* we are going to render the table in the testtable el */
    var el = $('#testtable');

    /* here we render a table. We have included the table JSON
       inline here, but of course you can produce this on the server
       as well instead */
    el.render({
        iface: 'table',
        table: {
            bordered: true,
            headers: [
                {
                    iface: 'textlineCell',
                    value: 'Customer',
                    icon: 'briefcase'
                },
                {
                    iface: 'textlineCell',
                    value: 'Computer',
                    icon: 'hdd'
                },
                {
                    iface: 'textlineCell',
                    value: 'Owner',
                    icon: 'user'
                },
                {
                    iface: 'textlineCell',
                    value: 'Product'
                },
                {
                    iface: 'textlineCell',
                    value: 'Product version'
                }
            ],
            rows: [{
                cells: [
                    {
                        iface: 'linkCell',
                        value: 'Danwell Inc.',
                        link: '#'
                    },
                    {
                        iface: 'linkCell',
                        value: 'Jos-Desktop',
                        link: '#'
                    },
                    {
                        iface: 'textlineCell',
                        value: 'Jos Henken'
                    },
                    {
                        iface: 'textlineCell',
                        value: 'Firefox'
                    },
                    {
                        iface: 'textlineCell',
                        value: '20.0.0.21'
                    }
                ]
            }, {
                cells: [
                    {
                        iface: 'linkCell',
                        value: 'Danwell Inc.',
                        link: '#'
                    },
                    {
                        iface: 'linkCell',
                        value: 'Jos-Laptop',
                        link: '#'
                    },
                    {
                        iface: 'textlineCell',
                        value: 'Jos Henken'
                    },
                    {
                        iface: 'textlineCell',
                        value: 'Firefox'
                    },
                    {
                        iface: 'textlineCell',
                        value: '10.0.0.21',
                        emphasis: 'warning'
                    }
                ]
            }, {
                cells: [
                    {
                        iface: 'linkCell',
                        value: 'Danwell Inc.',
                        link: '#'
                    },
                    {
                        iface: 'linkCell',
                        value: 'Henk-Desktop',
                        link: '#'
                    },
                    {
                        iface: 'textlineCell',
                        value: 'Henk Danwell'
                    },
                    {
                        iface: 'textlineCell',
                        value: 'Chrome'
                    },
                    {
                        iface: 'textlineCell',
                        value: '30.0.0.21'
                    }
                ]
            }]
        }
    });

});
