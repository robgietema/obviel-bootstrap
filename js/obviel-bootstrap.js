/*global obviel: false, hex_md5: false */

obviel.bootstrap = {};

(function ($, obviel, module) {

    // App
    obviel.iface('app');

    module.App = function (settings) {
        settings = settings || {};
        var d = {
            iface: 'app',
            name: 'default',
            obvt:
                '<div data-if="parts" data-each="parts" data-view="@."></div>'
        };
        $.extend(d, settings);
        obviel.View.call(this, d);
    };

    module.App.prototype = new obviel.View();

    obviel.view(new module.App());

    // Container
    obviel.iface('container');

    module.Container = function (settings) {
        settings = settings || {};
        var d = {
            iface: 'container',
            name: 'default',
            obvt:
                '<div data-func="layout">' +
                '  <div data-if="parts"' +
                '       data-each="parts"' +
                '       data-view="@."></div>' +
                '</div>',
            layout: function (el) {
                if (this.obj.fluid) {
                    el.addClass('container-fluid');
                } else {
                    el.addClass('container');
                }
            }
        };
        $.extend(d, settings);
        obviel.View.call(this, d);
    };

    module.Container.prototype = new obviel.View();

    obviel.view(new module.Container());

    // Grid
    obviel.iface('grid');

    module.Grid = function (settings) {
        settings = settings || {};
        var d = {
            iface: 'grid',
            name: 'default',
            obvt:
                '<div data-if="rows" data-each="rows" data-func="row">' +
                '  <div data-if="columns" data-each="columns" ' +
                'data-func="column" data-view="@."></div>' +
                '</div>',
            row: function (el, variable) {
                if (variable('fluid')) {
                    el.addClass('row-fluid');
                } else {
                    el.addClass('row');
                }
            },
            column: function (el, variable) {
                if (variable('span')) {
                    el.addClass('span' + variable('span'));
                } else {
                    el.addClass('span1');
                }
                if (variable('offset')) {
                    el.addClass('offset' + variable('offset'));
                }
            }
        };
        $.extend(d, settings);
        obviel.View.call(this, d);
    };

    module.Grid.prototype = new obviel.View();

    obviel.view(new module.Grid());

    // Table
    obviel.iface('table');

    module.Table = function (settings) {
        settings = settings || {};
        var d = {
            iface: 'table',
            name: 'default',
            obvt:
                '<table class="table" data-func="optionals">' +
                '  <caption data-if="table.caption">' +
                '    {table.caption}' +
                '  </caption>' +
                '  <thead data-if="table.headers">' +
                '    <tr>' +
                '      <th data-each="table.headers" data-view="@."></th>' +
                '    </tr>' +
                '  </thead>' +
                '  <tfoot data-if="table.footer">' +
                '    <tr>' +
                '      <th data-each="table.headers" data-view="@."></th>' +
                '    </tr>' +
                '  </tfoot>' +
                '  <tbody data-if="table.rows">' +
                '    <tr data-each="table.rows" data-func="rowclass">' +
                '      <td data-each="cells" data-view="@."></td>' +
                '    </tr>' +
                '  </tbody>' +
                '</table>',
            optionals: function (el) {
                if (this.obj.table.striped) {
                    el.addClass('table-striped');
                }
                if (this.obj.table.bordered) {
                    el.addClass('table-bordered');
                }
                if (this.obj.table.hover) {
                    el.addClass('table-hover');
                }
                if (this.obj.table.condensed) {
                    el.addClass('table-condensed');
                }
            },
            rowclass: function (el, variable) {
                if (variable('classname')) {
                    el.addClass(variable('classname'));
                }
            }
        };
        $.extend(d, settings);
        obviel.View.call(this, d);
    };

    module.Table.prototype = new obviel.View();

    obviel.view(new module.Table());

    // Cell
    obviel.iface('cell');

    module.Cell = function (settings) {
        settings = settings || {};
        var d = {
            name: 'default'
        };
        $.extend(d, settings);
        obviel.View.call(this, d);
    };

    module.Cell.prototype = new obviel.View();

    module.Cell.prototype.render = function () {
        var self = this,
            obj = self.obj;

        if (obj.icon) {
            self.el.prepend('<i class="icon-' + obj.icon + '"></i> ');
        }

        if (obj.emphasis) {
            switch (obj.emphasis) {
            case 'warning':
            case 'error':
            case 'info':
            case 'succes':
                self.el.addClass('text-' + obj.emphasis);
                break;
            case 'muted':
                self.el.addClass(obj.emphasis);
                break;
            default:
                break;
            }
        }
    };

    // TextLineCell
    obviel.iface('textlineCell', 'cell');

    module.TextLineCell = function (settings) {
        settings = settings || {};
        var d = {
            iface: 'textlineCell',
            obvt: '{value}'
        };
        $.extend(d, settings);
        module.Cell.call(this, d);
    };

    module.TextLineCell.prototype = new module.Cell();

    obviel.view(new module.TextLineCell());

    // LinkCell
    obviel.iface('linkCell', 'cell');

    module.LinkCell = function (settings) {
        settings = settings || {};
        var d = {
            iface: 'linkCell',
            obvt: '<a href="{link}">{value}</a>'
        };
        $.extend(d, settings);
        module.Cell.call(this, d);
    };

    module.LinkCell.prototype = new module.Cell();

    obviel.view(new module.LinkCell());

    // Breadcrumbs
    obviel.iface('breadcrumbs');

    module.Breadcrumbs = function (settings) {
        settings = settings || {};
        var d = {
            iface: 'breadcrumbs',
            name: 'default',
            obvt: '<ul class="breadcrumb">' +
                  '<li data-if="items" data-each="items" ' +
                  'data-func="itemclass">' +
                  '<a href="#" data-if="!@each.last">{@.}</a>' +
                  '<span data-if="!@each.last" class="divider">/</span>' +
                  '<span data-unwrap="" data-if="@each.last">{@.}</span>' +
                  '</li>' +
                  '</ul>',
            itemclass: function (el, variable) {
                if (variable('@each.number') === variable('@each.length')) {
                    el.addClass('active');
                }
            }
        };

        $.extend(d, settings);
        obviel.View.call(this, d);
    };

    module.Breadcrumbs.prototype = new obviel.View();

    obviel.view(new module.Breadcrumbs());

    // Alert
    obviel.iface('alert');

    module.Alert = function (settings) {
        settings = settings || {};
        var d = {
            iface: 'alert',
            name: 'default',
            obvt: '<div data-func="alertclass" class="alert">' +
                  '<button type="button" class="close" data-dismiss="alert">' +
                  '×</button>' +
                  '<div data-if="title" data-unwrap="">' +
                  '<strong data-if="!block">{title}</strong>' +
                  '<h4 data-if="block">{title}</h4>' +
                  '</div>' +
                  '<span data-unwrap="" data-if="description">' +
                  ' {description}</span>' +
                  '</div>',
            alertclass: function (el) {
                if (this.obj.block) {
                    el.addClass('alert-block');
                }
                if (this.obj.type) {
                    el.addClass('alert-' + this.obj.type);
                }
            }
        };

        $.extend(d, settings);
        obviel.View.call(this, d);
    };

    module.Alert.prototype = new obviel.View();

    obviel.view(new module.Alert());

    // Navbar
    obviel.iface('navbar');

    module.Navbar = function (settings) {
        settings = settings || {};
        var d = {
            iface: 'navbar',
            name: 'default',
            obvt:
                '<div class="navbar" data-func="optionals">' +
                '  <div class="navbar-inner">' +
                '    <div class="container">' +
                '      <a class="btn btn-navbar"' +
                '         data-toggle="collapse"' +
                '         data-target=".nav-collapse">' +
                '        <span class="icon-bar"></span>' +
                '        <span class="icon-bar"></span>' +
                '        <span class="icon-bar"></span>' +
                '      </a>' +
                '      <a href="#"' +
                '         class="brand"' +
                '         data-if="navbar.brand">{navbar.brand}</a>' +
                '      <div class="nav-collapse"' +
                '           data-if="navbar.parts"' +
                '           data-each="navbar.parts"' +
                '           data-view="@."></div>' +
                '    </div>' +
                '  </div>' +
                '</div>',
            optionals: function (el) {
                if (this.obj.navbar) {
                    if (this.obj.navbar.position) {
                        el.addClass('navbar-' + this.obj.navbar.position);
                    }
                    if (this.obj.navbar.inverse) {
                        el.addClass('navbar-inverse');
                    }
                }
            }
        };

        $.extend(d, settings);
        obviel.View.call(this, d);
    };

    module.Navbar.prototype = new obviel.View();

    obviel.view(new module.Navbar());

    // Tabs
    obviel.iface('tabs');

    module.Tabs = function (settings) {
        settings = settings || {};
        var d = {
            iface: 'tabs',
            name: 'default',
            obvt:
                '<div class="tabbable" data-func="position">' +
                '  <ul class="nav nav-tabs" data-if="items">' +
                '    <li data-each="items" data-func="active">' +
                '      <a data-toggle="tab"' +
                '         href="#{id}">{title}</a>' +
                '    </li>' +
                '  </ul>' +
                '  <div class="tab-content" data-if="items">' +
                '    <div data-each="items"' +
                '         data-view="content"' +
                '         class="tab-pane"' +
                '         data-func="active"' +
                '         data-id="{id}"></div>' +
                '  </div>' +
                '</div>',
            active: function (el, variable) {
                if (this.obj.active === variable('@each.index')) {
                    el.addClass('active');
                }
            },
            position: function (el) {
                if (this.obj.position) {
                    el.addClass('tabs-' + this.obj.position);
                }
            }
        };

        $.extend(d, settings);
        obviel.View.call(this, d);
    };

    module.Tabs.prototype = new obviel.View();

    module.Tabs.prototype.before = function () {
        var i = 1;

        while ($('#tab' + i).length > 0) {
            i += 1;
        }

        if (this.obj.items) {
            $.each(this.obj.items, function (index, value) {
                if (!value.id) {
                    value.id = 'tab' + i;
                    i += 1;
                }
            });
        }

        if (!this.obj.active) {
            this.obj.active = 0;
        }
    };

    module.Tabs.prototype.render = function () {
        if (this.obj.position && this.obj.position === 'below') {
            this.el.find('div.tabbable > div.tab-content').after(
                this.el.find('div.tabbable > ul'));
        }
    };

    obviel.view(new module.Tabs());

    // Nav
    obviel.iface('nav');

    module.Nav = function (settings) {
        settings = settings || {};
        var d = {
            iface: 'nav',
            name: 'default',
            obvt:
                '<ul class="nav" data-func="optionals">' +
                '  <li data-if="items"' +
                '      data-each="items"' +
                '      data-view="@."></li>' +
                '</ul>',
            optionals: function (el) {
                if (this.obj.align) {
                    el.addClass('pull-' + this.obj.align);
                }
                if (this.obj.type) {
                    el.addClass('nav-' + this.obj.type);
                }
                if (this.obj.stacked) {
                    el.addClass('nav-stacked');
                }
            }
        };

        $.extend(d, settings);
        obviel.View.call(this, d);
    };

    module.Nav.prototype = new obviel.View();

    obviel.view(new module.Nav());

    // NavLink
    obviel.iface('navLink');

    module.NavLink = function (settings) {
        settings = settings || {};
        var d = {
            iface: 'navLink',
            name: 'default',
            obvt:
                '<a href="{link}">{title}</a>' +
                '<ul data-if="items"' +
                '    class="dropdown-menu">' +
                '  <li data-if="items"' +
                '      data-each="items"' +
                '      data-view="@."></li>' +
                '</ul>',
        };

        $.extend(d, settings);
        obviel.View.call(this, d);
    };

    module.NavLink.prototype = new obviel.View();

    module.NavLink.prototype.render = function () {
        var self = this,
            obj = self.obj;

        if (obj.active) {
            self.el.addClass('active');
        }
        if (obj.disabled) {
            self.el.addClass('disabled');
        }
        if (obj.items) {
            self.el.addClass('dropdown-submenu');
        }
    };

    obviel.view(new module.NavLink());

    // NavDropdown
    obviel.iface('navDropdown');

    module.NavDropdown = function (settings) {
        settings = settings || {};
        var d = {
            iface: 'navDropdown',
            name: 'default',
            obvt:
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown">' +
                '  {title} <b class="caret"></b>' +
                '</a>' +
                '<ul data-if="items"' +
                '    data-func="align"' +
                '    class="dropdown-menu">' +
                '  <li data-if="items"' +
                '      data-each="items"' +
                '      data-view="@."></li>' +
                '</ul>',
            align: function (el) {
                if (this.obj.align) {
                    el.addClass('pull-' + this.obj.align);
                }
            }
        };

        $.extend(d, settings);
        obviel.View.call(this, d);
    };

    module.NavDropdown.prototype = new obviel.View();

    module.NavDropdown.prototype.render = function () {
        this.el.addClass('dropdown');
    };

    obviel.view(new module.NavDropdown());

    // NavDivider
    obviel.iface('navDivider');

    module.NavDivider = function (settings) {
        settings = settings || {};
        var d = {
            iface: 'navDivider',
            name: 'default'
        };

        $.extend(d, settings);
        obviel.View.call(this, d);
    };

    module.NavDivider.prototype = new obviel.View();

    module.NavDivider.prototype.render = function () {
        if (this.el.parent().hasClass('dropdown-menu')) {
            this.el.addClass('divider');
        } else {
            this.el.addClass('divider-vertical');
        }
    };

    obviel.view(new module.NavDivider());

    // NavHeader
    obviel.iface('navHeader');

    module.NavHeader = function (settings) {
        settings = settings || {};
        var d = {
            iface: 'navHeader',
            name: 'default',
            obvt: '{title}'
        };

        $.extend(d, settings);
        obviel.View.call(this, d);
    };

    module.NavHeader.prototype = new obviel.View();

    module.NavHeader.prototype.render = function () {
        this.el.addClass('nav-header');
    };

    obviel.view(new module.NavHeader());

    // NavbarSearch
    obviel.iface('navbarSearch');

    module.NavbarSearch = function (settings) {
        settings = settings || {};
        var d = {
            iface: 'navbarSearch',
            name: 'default',
            obvt:
                '<form class="navbar-search" data-func="align">' +
                '  <input type="text"' +
                '         class="search-query"' +
                '         placeholder="{placeholder}" />' +
                '</form>',
            align: function (el) {
                if (this.obj.align) {
                    el.addClass('pull-' + this.obj.align);
                }
            }
        };

        $.extend(d, settings);
        obviel.View.call(this, d);
    };

    module.NavbarSearch.prototype = new obviel.View();

    obviel.view(new module.NavbarSearch());

    // Image
    obviel.iface('image');

    module.Image = function (settings) {
        settings = settings || {};
        var self = this,
            d = {
            iface: 'image',
            name: 'default',
            obvt: '<img data-func="optionals"/>',
            optionals: function (el) {
                var src, params = [];
                if (this.obj.type) {
                    el.addClass('img-' + this.obj.type);
                }
                if (this.obj.width) {
                    el.attr('width', this.obj.width);
                }
                if (this.obj.height) {
                    el.attr('height', this.obj.height);
                }
                if (this.obj.src) {
                    if (this.obj.gravatar) {
                        if (self.protocol() === 'https:') {
                            src = 'https://secure.gravatar.com/avatar/';
                        } else {
                            src = 'http://www.gravatar.com/avatar/';
                        }
                        src += hex_md5(this.obj.src) + '.jpg';
                        if (this.obj.width) {
                            params.push({name: 's', value: this.obj.width});
                        }
                        if (this.obj.gravatarDefault) {
                            params.push({name: 'd',
                                         value: this.obj.gravatarDefault});
                        }
                        if (this.obj.gravatarForceDefault) {
                            params.push({name: 'f', value: 'y'});
                        }
                        if (this.obj.gravatarRating) {
                            params.push({name: 'r',
                                         value: this.obj.gravatarRating});
                        }
                        if (params.length > 0) {
                            src += '?' + $.param(params);
                        }
                        el.attr('src', src);
                    } else {
                        el.attr('src', this.obj.src);
                    }
                }
                if (this.obj.title) {
                    el.attr('title', this.obj.title);
                }
                if (this.obj.alt) {
                    el.attr('alt', this.obj.alt);
                }
            }
        };
        $.extend(d, settings);
        obviel.View.call(this, d);
    };

    module.Image.prototype = new obviel.View();

    module.Image.prototype.protocol = function () {
        return document.location.protocol;
    };

    obviel.view(new module.Image());

}(jQuery, obviel, obviel.bootstrap));
