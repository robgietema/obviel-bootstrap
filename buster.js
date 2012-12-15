var config = module.exports;

var linterConf = {
    linter: 'jshint',
        linterOptions: {
            browser: true,
            strict: false
        },
        excludes: [
            "libs"
        ]
};

config["Obviel Bootstrap"] = {
    environment: "browser",
    libs: [
        "libs/jquery/1.8.3/jquery.js",
        "libs/obviel/1.0b3/obviel-template.js",
        "libs/obviel/1.0b3/obviel.js",
        "libs/jshash/2.2/md5.js"
    ],
    sources: [
        "js/obviel-bootstrap.js",
    ],
    tests: [
        "test/test-obviel-bootstrap.js"
    ],
    extensions: [
        require('buster-lint'),
    ],
    "buster-lint": linterConf
}
