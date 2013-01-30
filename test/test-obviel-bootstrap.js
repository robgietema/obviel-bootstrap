/*global buster: false, assert: false, refute: false, obviel: false */

buster.testCase("Obviel Bootstrap Tests", {
    'namespace exists': function () {
        assert.defined(obviel.bootstrap);
        assert.defined(obviel.template);
    }
});

buster.testCase("Obviel Bootstrap App Tests", {
    setUp: function () {
        $(document.body).html('<div id="viewdiv"></div>');
    },

    tearDown: function () {
        $('#viewdiv').remove();
    },

    'app constructor exists': function () {
        assert.isFunction(obviel.bootstrap.App);
    },

    'basic app': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'app'
        });

        assert.equals(el.html(), '');
    },

    'app with parts': function () {
        var el = $('#viewdiv');

        obviel.view({
            iface: 'dummy',
            obvt: '{content}'
        });
        el.render({
            iface: 'app',
            parts: [{
                iface: 'dummy',
                content: 'One'
            }, {
                iface: 'dummy',
                content: 'Two'
            }]
        });

        assert.equals($('div:first', el).html(), 'One');
        assert.equals($('div:last', el).html(), 'Two');
    }
});

buster.testCase("Obviel Bootstrap Container Tests", {
    setUp: function () {
        $(document.body).html('<div id="viewdiv"></div>');
    },

    tearDown: function () {
        $('#viewdiv').remove();
    },

    'container constructor exists': function () {
        assert.isFunction(obviel.bootstrap.Container);
    },

    'basic container': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'container'
        });

        assert.equals($('div', el).length, 1);
        assert($('div', el).hasClass('container'));
    },

    'fluid container': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'container',
            fluid: true
        });

        assert($('div', el).hasClass('container-fluid'));
    },

    'container with parts': function () {
        var el = $('#viewdiv');

        obviel.view({
            iface: 'dummy',
            obvt: '{content}'
        });
        el.render({
            iface: 'container',
            parts: [{
                iface: 'dummy',
                content: 'One'
            }]
        });

        assert.equals($('div.container div', el).html(), 'One');
    }
});

buster.testCase("Obviel Bootstrap Grid Tests", {
    setUp: function () {
        $(document.body).html('<div id="viewdiv"></div>');
    },

    tearDown: function () {
        $('#viewdiv').remove();
    },

    'grid constructor exists': function () {
        assert.isFunction(obviel.bootstrap.Grid);
    },

    'grid without rows': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'grid'
        });

        assert.equals($('div', el).length, 0);
    },

    'grid with row': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'grid',
            rows: [{}]
        });

        assert.equals($('div.row', el).length, 1);
    },

    'grid with fluid row': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'grid',
            rows: [{
                fluid: true
            }]
        });

        assert.equals($('div.row-fluid', el).length, 1);
    },

    'grid with rows': function () {
        var el = $('#viewdiv');

        obviel.view({
            iface: 'dummy',
            obvt: '{content}'
        });
        el.render({
            iface: 'grid',
            rows: [{
                columns: [
                    {
                        iface: 'dummy',
                        content: 'One'
                    },
                    {
                        iface: 'dummy',
                        content: 'Two'
                    }
                ]
            }, {
                columns: [
                    {
                        iface: 'dummy',
                        content: 'Three'
                    },
                    {
                        iface: 'dummy',
                        content: 'Four'
                    }
                ]
            }]
        });

        assert.equals($('div.row:first div:first', el).html(), 'One');
        assert.equals($('div.row:last div:last', el).html(), 'Four');
    },

    'grid with column without span': function () {
        var el = $('#viewdiv');

        obviel.view({
            iface: 'dummy',
            obvt: '{content}'
        });
        el.render({
            iface: 'grid',
            rows: [{
                columns: [
                    {
                        iface: 'dummy',
                        content: 'One'
                    }
                ]
            }]
        });

        assert($('div.row div', el).hasClass('span1'));
    },

    'grid with column with span': function () {
        var el = $('#viewdiv');

        obviel.view({
            iface: 'dummy',
            obvt: '{content}'
        });
        el.render({
            iface: 'grid',
            rows: [{
                columns: [
                    {
                        iface: 'dummy',
                        content: 'One',
                        span: 4
                    }
                ]
            }]
        });

        assert($('div.row div', el).hasClass('span4'));
    },

    'grid with column with offset': function () {
        var el = $('#viewdiv');

        obviel.view({
            iface: 'dummy',
            obvt: '{content}'
        });
        el.render({
            iface: 'grid',
            rows: [{
                columns: [
                    {
                        iface: 'dummy',
                        content: 'One',
                        offset: 4
                    }
                ]
            }]
        });

        assert($('div.row div', el).hasClass('offset4'));
    }
});

buster.testCase("Obviel Bootstrap Table Tests", {
    setUp: function () {
        $(document.body).html('<div id="viewdiv"></div>');
    },

    tearDown: function () {
        $('#viewdiv').remove();
    },

    'table constructor exists': function () {
        assert.isFunction(obviel.bootstrap.Table);
    },

    'basic table': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'table',
            table: {}
        });

        assert.equals($('table', el).length, 1);
        assert($('table', el).hasClass('table'));
        assert.equals($('table > thead', el).length, 0);
        assert.equals($('table > tbody', el).length, 0);
        assert.equals($('table > caption', el).length, 0);
    },

    'table with headers': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'table',
            table: {
                headers: [
                    {
                        iface: 'textlineCell',
                        value: 'header1'
                    },
                    {
                        iface: 'textlineCell',
                        value: 'header2'
                    }
                ]
            }
        });

        assert.equals($('thead th:first', el).html(), 'header1');
        assert.equals($('thead th:last', el).html(), 'header2');
    },

    'table with headers with an icon': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'table',
            table: {
                headers: [
                    {
                        iface: 'textlineCell',
                        value: 'header1',
                        icon: 'test'
                    }
                ]
            }
        });

        assert.equals($('thead th i', el).length, 1);
        assert($('thead th i', el).hasClass('icon-test'));
    },

    'repeat table headers in the footer': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'table',
            table: {
                footer: true,
                headers: [
                    {
                        iface: 'textlineCell',
                        value: 'header1'
                    },
                    {
                        iface: 'textlineCell',
                        value: 'header2'
                    }
                ]
            }
        });

        assert.equals($('thead th:first', el).html(), 'header1');
        assert.equals($('thead th:last', el).html(), 'header2');
        assert.equals($('tfoot th:first', el).html(), 'header1');
        assert.equals($('tfoot th:last', el).html(), 'header2');
    },

    'table with caption': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'table',
            table: {
                caption: 'some caption'
            }
        });

        assert.equals($.trim($('caption', el).html()), 'some caption');
    },

    'table with optional classes': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'table',
            table: {
                striped: true,
                bordered: true,
                hover: true,
                condensed: true
            }
        });

        assert($('table', el).hasClass('table-striped'));
        assert($('table', el).hasClass('table-bordered'));
        assert($('table', el).hasClass('table-hover'));
        assert($('table', el).hasClass('table-condensed'));
    },

    'textline cell': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'textlineCell',
            value: 'One'
        })

        assert.equals(el.html(), 'One');
    },

    'cell with emphasis class': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'textlineCell',
            value: 'One',
            emphasis: 'warning'
        })

        assert(el.hasClass('text-warning'));
    },

    'cell with non existing emphasis class': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'textlineCell',
            value: 'One',
            emphasis: 'someemphasis'
        })

        refute(el.hasClass('someemphasis'));
    },

    'cell with muted class': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'textlineCell',
            value: 'One',
            emphasis: 'muted'
        })

        assert(el.hasClass('muted'));
    },

    'link cell': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'linkCell',
            value: 'One',
            link: 'someurl'
        })

        assert.equals($('a', el).length, 1);
        assert.equals($('a', el).html(), 'One');
        assert.equals($('a', el).attr('href'), 'someurl');
    },

    'table with rows': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'table',
            table: {
                rows: [{
                    cells: [
                        {
                            iface: 'textlineCell',
                            value: 'One'
                        },
                        {
                            iface: 'textlineCell',
                            value: 'Two'
                        }
                    ]
                }, {
                    cells: [
                        {
                            iface: 'textlineCell',
                            value: 'Three'
                        },
                        {
                            iface: 'textlineCell',
                            value: 'Four'
                        }
                    ]
                }]
            }
        });

        assert.equals($('tbody td:first', el).html(), 'One');
        assert.equals($('tbody td:last', el).html(), 'Four');
    },

    'table with row style': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'table',
            table: {
                rows: [{
                    cells: [
                        {
                            iface: 'textlineCell',
                            value: 'One'
                        },
                        {
                            iface: 'textlineCell',
                            value: 'Two'
                        }
                    ],
                    classname: 'info'
                }]
            }
        });

        assert($('tbody tr:first', el).hasClass('info'));
    }
});

buster.testCase("Obviel Bootstrap Breadcrumbs Tests", {
    setUp: function () {
        $(document.body).html('<div id="viewdiv"></div>');
    },

    tearDown: function () {
        $('#viewdiv').remove();
    },

    'breadcrumbs constructor exists': function () {
        assert.isFunction(obviel.bootstrap.Breadcrumbs);
    },

    'basic breadcrumbs': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'breadcrumbs'
        });

        assert.equals($('ul', el).length, 1);
        assert($('ul', el).hasClass('breadcrumb'));
    },

    'breadcrumbs with one item': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'breadcrumbs',
            items: ['One']
        });

        assert.equals($('li', el).length, 1);
        assert($('li', el).hasClass('active'));
        assert.equals($('li', el).text(), 'One');
    },

    'breadcrumbs with two items': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'breadcrumbs',
            items: ['One', 'Two']
        });

        assert.equals($('li', el).length, 2);
        assert.equals($('li:eq(0) a', el).length, 1);
        assert.equals($('li:eq(0) a', el).text(), 'One');
        refute($('li:eq(0)', el).hasClass('active'));
        assert.equals($('li:eq(0) span', el).length, 1);
        assert.equals($('li:eq(0) span', el).text(), '/');
        assert($('li:eq(0) span', el).hasClass('divider'));
        assert.equals($('li:eq(1)', el).text(), 'Two');
        assert($('li:eq(1)', el).hasClass('active'));
    }

});

buster.testCase("Obviel Bootstrap Alert Tests", {
    setUp: function () {
        $(document.body).html('<div id="viewdiv"></div>');
    },

    tearDown: function () {
        $('#viewdiv').remove();
    },

    'alert constructor exists': function () {
        assert.isFunction(obviel.bootstrap.Alert);
    },

    'basic alert': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'alert'
        });

        assert.equals($('div', el).length, 1);
        assert($('div', el).hasClass('alert'));
        assert.equals($('button', el).length, 1);
        assert($('button', el).hasClass('close'));
    },

    'alert with title and body': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'alert',
            title: 'Warning!',
            description: 'This is the warning'
        });

        assert.equals($('strong', el).length, 1);
        assert.equals($('strong', el).html(), 'Warning!');
        assert($('div', el).text().indexOf('This is the warning') !== -1);
    },

    'alert block': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'alert',
            title: 'Warning!',
            description: 'This is the warning',
            block: true
        });

        assert($('div', el).hasClass('alert-block'));
        assert.equals($('h4', el).length, 1);
        assert.equals($('h4', el).html(), 'Warning!');
    },

    'custom alert type': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'alert',
            title: 'Warning!',
            description: 'This is the warning',
            type: 'error'
        });

        assert($('div', el).hasClass('alert-error'));
    }

});

buster.testCase("Obviel Bootstrap Navbar Tests", {
    setUp: function () {
        $(document.body).html('<div id="viewdiv"></div>');
    },

    tearDown: function () {
        $('#viewdiv').remove();
    },

    'navbar constructor exists': function () {
        assert.isFunction(obviel.bootstrap.Navbar);
    },

    'basic navbar': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'navbar'
        });

        assert.equals($('div.navbar', el).length, 1);
    },

    'navbar position': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'navbar',
            navbar: {
                position: 'fixed-top'
            }
        });

        assert($('div', el).hasClass('navbar-fixed-top'));
    },

    'navbar inverse': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'navbar',
            navbar: {
                inverse: true
            }
        });

        assert($('div', el).hasClass('navbar-inverse'));
    },

    'navbar with a brand': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'navbar',
            navbar: {
                brand: 'Some Brand'
            }
        });

        assert.equals($('a.brand', el).length, 1);
        assert.equals($('a.brand', el).html(), 'Some Brand');
    },

    'nav inside the navbar': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'navbar',
            navbar: {
                parts: [{
                    iface: 'nav'
                }]
            }
        });

        assert.equals($('ul.nav', el).length, 1);
    },

    'nav with items': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'nav',
            items: [{
                iface: 'navLink',
                title: 'Home',
                link: '#'
            }]
        });

        assert.equals($('a', el).length, 1);
        assert.equals($('a', el).html(), 'Home');
    },

    'align the nav': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'nav',
            align: 'right'
        });

        assert($('ul.nav', el).hasClass('pull-right'));
    },

    'different type of nav': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'nav',
            type: 'tabs'
        });

        assert($('ul.nav', el).hasClass('nav-tabs'));
    },

    'stacked nav': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'nav',
            stacked: true
        });

        assert($('ul.nav', el).hasClass('nav-stacked'));
    },


    'navLink which is active': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'navLink',
            title: 'Home',
            link: '#',
            active: true
        });

        assert(el.hasClass('active'));
    },

    'navLink which is disabled': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'navLink',
            title: 'Home',
            link: '#',
            disabled: true
        });

        assert(el.hasClass('disabled'));
    },

    'navLink with subitems': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'navLink',
            title: 'Home',
            link: '#',
            items: [{
                iface: 'navLink',
                title: 'Home',
                link: '#'
            }]
        });

        assert(el.hasClass('dropdown-submenu'));
        assert.equals($('ul.dropdown-menu', el).length, 1);
        assert.equals($('ul.dropdown-menu li', el).length, 1);
    },

    'navDivider': function () {
        var el = $('#viewdiv'),
            li;
        el.append($('<ul><li></li></ul>'));
        li = $('li', el);

        li.render({
            iface: 'navDivider'
        });

        assert(li.hasClass('divider-vertical'));
    },

    'navDivider in dropdown': function () {
        var el = $('#viewdiv'),
            li;
        el.append($('<ul class="dropdown-menu"><li></li></ul>'));
        li = $('li', el);

        li.render({
            iface: 'navDivider'
        });

        assert(li.hasClass('divider'));
    },

    'navHeader': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'navHeader',
            title: 'Header'
        });

        assert(el.hasClass('nav-header'));
        assert.equals(el.html(), 'Header');
    },

    'navDropdown': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'navDropdown',
            title: 'Dropdown'
        });

        assert(el.hasClass('dropdown'));
        assert($('a', el).hasClass('dropdown-toggle'));
        assert.equals($.trim($('a', el).text()), 'Dropdown');
        assert.equals($('b.caret', el).length, 1);
    },

    'navDropdown with items': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'navDropdown',
            title: 'Dropdown',
            items: [{
                iface: 'navLink',
                title: 'Home',
                link: '#'
            }]
        });

        assert.equals($('ul.dropdown-menu', el).length, 1);
        assert.equals($('ul.dropdown-menu li', el).length, 1);
    },

    'align the navDropdown': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'navDropdown',
            title: 'Dropdown',
            align: 'right',
            items: [{
                iface: 'navLink',
                title: 'Home',
                link: '#'
            }]
        });

        assert($('ul.dropdown-menu', el).hasClass('pull-right'));
    },

    'searchform inside the navbar': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'navbar',
            navbar: {
                parts: [{
                    iface: 'navbarSearch',
                    placeholder: 'Search'
                }]
            }
        });

        assert.equals($('form.navbar-search', el).length, 1);
        assert.equals($('form.navbar-search input', el).attr('placeholder'),
                                                             'Search');
    },

    'align the searchform': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'navbarSearch',
            placeholder: 'Search',
            align: 'left'
        });

        assert($('form.navbar-search', el).hasClass('pull-left'));
    },

    'basic tabs': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'tabs'
        });

        assert.equals($('div.tabbable', el).length, 1);
    },

    'tabs with items': function () {
        var el = $('#viewdiv');

        obviel.view({
            iface: 'dummy',
            obvt: '{content}'
        });
        el.render({
            iface: 'tabs',
            items: [{
                title: 'Tab1',
                content: {
                    iface: 'dummy',
                    content: 'Tab1 Content'
                }
            }, {
                title: 'Tab2',
                content: {
                    iface: 'dummy',
                    content: 'Tab2 Content'
                }
            }]
        });

        assert($('div.tabbable > *:first', el).is('ul'));
        assert($('div.tabbable > *:last', el).is('div'));
        assert.equals($('ul.nav-tabs li', el).length, 2);
        assert.equals($('ul.nav-tabs li:first a', el).html(), 'Tab1');
        assert.equals($('ul.nav-tabs li:first a', el).attr('href'), '#tab1');
        assert($('ul.nav-tabs li:first', el).hasClass('active'));
        assert.equals($('.tab-content .tab-pane', el).length, 2);
        assert.equals($('.tab-pane:first', el).html(), 'Tab1 Content');
        assert.equals($('.tab-pane:first', el).attr('id'), 'tab1');
        assert($('.tab-pane:first', el).hasClass('active'));
    },

    'tabs with second selected': function () {
        var el = $('#viewdiv');

        obviel.view({
            iface: 'dummy',
            obvt: '{content}'
        });
        el.render({
            iface: 'tabs',
            items: [{
                title: 'Tab1',
                content: {
                    iface: 'dummy',
                    content: 'Tab1 Content'
                }
            }, {
                title: 'Tab2',
                content: {
                    iface: 'dummy',
                    content: 'Tab2 Content'
                }
            }],
            active: 1
        });

        assert($('ul.nav-tabs li:last', el).hasClass('active'));
        assert($('.tab-pane:last', el).hasClass('active'));
    },

    'tabs on the left': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'tabs',
            position: 'left'
        });

        assert($('div.tabbable', el).hasClass('tabs-left'));
    },

    'tabs below': function () {
        var el = $('#viewdiv');

        obviel.view({
            iface: 'dummy',
            obvt: '{content}'
        });
        el.render({
            iface: 'tabs',
            position: 'below',
            items: [{
                title: 'Tab1',
                content: {
                    iface: 'dummy',
                    content: 'Tab1 Content'
                }
            }, {
                title: 'Tab2',
                content: {
                    iface: 'dummy',
                    content: 'Tab2 Content'
                }
            }],
            active: 1
        });

        assert($('div.tabbable > *:first', el).is('div'));
        assert($('div.tabbable > *:last', el).is('ul'));
    },

    'document with multiple tabs': function () {
        var el = $('#viewdiv');

        $(document.body).append('<div id="tab1"></div>');

        obviel.view({
            iface: 'dummy',
            obvt: '{content}'
        });
        el.render({
            iface: 'tabs',
            items: [{
                title: 'Tab1',
                content: {
                    iface: 'dummy',
                    content: 'Tab1 Content'
                }
            }]
        });

        assert.equals($('.tab-pane:first', el).attr('id'), 'tab2');
        $('#tab1').remove();
    }
});

buster.testCase("Obviel Bootstrap Image Tests", {
    setUp: function () {
        $(document.body).html('<div id="viewdiv"></div>');
    },

    tearDown: function () {
        $('#viewdiv').remove();
    },

    'container constructor exists': function () {
        assert.isFunction(obviel.bootstrap.Image);
    },

    'basic image': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'image'
        });

        assert.equals($('img', el).length, 1);
    },

    'image with type': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'image',
            type: 'rounded'
        });

        assert($('img', el).hasClass('img-rounded'));
    },

    'image with dimensions': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'image',
            width: 64,
            height: 128
        });

        assert.equals($('img', el).attr('width'), 64);
        assert.equals($('img', el).attr('height'), 128);
    },

    'image with source': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'image',
            src: 'image.jpg'
        });

        assert.equals($('img', el).attr('src'), 'image.jpg');
    },

    'image with title and alt': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'image',
            title: 'Title',
            alt: 'Image'
        });

        assert.equals($('img', el).attr('title'), 'Title');
        assert.equals($('img', el).attr('alt'), 'Image');
    },

    'gravatar image': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'image',
            src: 'joe@gmail.com',
            gravatar: true
        });

        assert.equals($('img', el).attr('src'),
                      'http://www.gravatar.com/avatar/' +
                      '62a051bba95ad2944f5122e274d9147f.jpg');
    },

    'gravatar image with width added': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'image',
            src: 'joe@gmail.com',
            gravatar: true,
            width: 64
        });

        assert.equals($('img', el).attr('src'),
                      'http://www.gravatar.com/avatar/' +
                      '62a051bba95ad2944f5122e274d9147f.jpg?s=64');
    },

    'gravatar image from secure domain': function () {
        var protocol = this.stub(obviel.bootstrap.Image.prototype, "protocol"),
            el = $('#viewdiv');
        protocol.returns('https:');

        el.render({
            iface: 'image',
            src: 'joe@gmail.com',
            gravatar: true
        });

        assert.equals($('img', el).attr('src'),
                      'https://secure.gravatar.com/avatar/' +
                      '62a051bba95ad2944f5122e274d9147f.jpg');
    },

    'gravatar image with fallback added': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'image',
            src: 'joe@gmail.com',
            gravatar: true,
            gravatarDefault: 'blank'
        });

        assert.equals($('img', el).attr('src'),
                      'http://www.gravatar.com/avatar/' +
                      '62a051bba95ad2944f5122e274d9147f.jpg?d=blank');
    },

    'gravatar image with custom fallback added': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'image',
            src: 'joe@gmail.com',
            gravatar: true,
            gravatarDefault: 'http://example.com/blank.jpg'
        });

        assert.equals($('img', el).attr('src'),
                      'http://www.gravatar.com/avatar/' +
                      '62a051bba95ad2944f5122e274d9147f.jpg?d=' +
                      'http%3A%2F%2Fexample.com%2Fblank.jpg');
    },

    'gravatar image with force default': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'image',
            src: 'joe@gmail.com',
            gravatar: true,
            gravatarForceDefault: true
        });

        assert.equals($('img', el).attr('src'),
                      'http://www.gravatar.com/avatar/' +
                      '62a051bba95ad2944f5122e274d9147f.jpg?f=y');
    },

    'gravatar image with rating': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'image',
            src: 'joe@gmail.com',
            gravatar: true,
            gravatarRating: 'pg'
        });

        assert.equals($('img', el).attr('src'),
                      'http://www.gravatar.com/avatar/' +
                      '62a051bba95ad2944f5122e274d9147f.jpg?r=pg');
    },

    'gravatar image with multiple parameters': function () {
        var el = $('#viewdiv');

        el.render({
            iface: 'image',
            src: 'joe@gmail.com',
            gravatar: true,
            gravatarRating: 'pg',
            gravatarForceDefault: true
        });

        assert.equals($('img', el).attr('src'),
                      'http://www.gravatar.com/avatar/' +
                      '62a051bba95ad2944f5122e274d9147f.jpg?f=y&r=pg');
    }
});
