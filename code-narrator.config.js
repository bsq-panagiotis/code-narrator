const JenkyllGenerator = require("./src/documentation/plugins/generators/Docusaurus/JenkyllGenerator");

/**
 * @type {ICodeNarratorConfig}
 */
const config = {
    entry_file: "./dist/src/App.js",
    cli_file: "./dist/src/cli.js",
    project_name: "code-narrator",
    config_files: [
        "code-narrator.config.js"
    ],
    readmeRoot:true,
    repository_url: "https://github.com/ingig/code-narrator",
    project_file: "package.json",
    source_path: "src",
    documentation_path: "docs",
    test_path: "__tests__",
    include: [
        "code-narrator.config.js",
        "__tests__/**/**",
        "src/**/*.ts"
    ],
    builders: [
        {
            name: "Prerequisites",
            template: `prerequisites`,
            args: {
                entryFileContent: 'content(./dist/src/cli.js)',
                configFile: 'content(code-narrator.config.js)'
            },
            files: [
                {
                    path: "package.json",
                    jsonPaths: [
                        "$.dependencies",
                        "$.devDependencies",
                        "$.engine"
                    ]
                }
            ],
            type: 'Custom'
        },
        {
            type: "README",
            template:"README",
            name: "ReadMe",
            args : {
                entryFileContent:"content(./src/cli.ts)"
            },
            files : [
                {
                    path:"package.json",
                    JSONPath:[
                        "$.name",
                        "$.description",
                        "$.version",
                        "$.homepage",
                        "$.bugs",
                        "$.author",
                        "$.repository", "$.license"
                    ]
                }
            ]

        },
        {
            type: "howto",
            template: "howto_create_howto",
            name: "How to create HowTo",
            files: [
                {
                    path: "code-narrator.config.js"
                }
            ]
        },
        {
            type: "howto",
            template: "howto_use_cli",
            name: "Use CLI",
            files: [
                {
                    path: "src/cli.ts"
                },
                {
                    path:"package.json",
                    JSONPath: ["$.repository"]
                }
            ]
        },
        {
            type: "howto",
            template: "howto_content_to_long",
            name: "Content to long",
        },
        {
            type: "howto",
            template: "howto_create_custom_builder",
            name: "Create your own custom builder",
            files : [
                {
                    path: 'code-narrator.config.js',
                    extract : 'builders' //You can use natural language to extract, e.g. "first 20 lines", "first paragraph"
                },
                {
                    path: 'src/documentation/builders/UserDefinedBuilderHelper.ts',
                    extract: 'how code parses content(...) and extract()'
                }
            ]
        },
        {
            type:"README",
            template:"overview_readme",
            name:"README",
            path:"howto",
            files : [{
                path: "howto/*.md"
            }
            ]
        }
    ],
    generatorPlugin : [
        JenkyllGenerator
    ],
    sitemap : {
        enable : true,
        url : 'https://ingig.github.io/code-narrator/'
    },
    rootFileName: 'index.html'

};

module.exports = config;