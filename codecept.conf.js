const {setHeadlessWhen, setWindowSize} = require('@codeceptjs/configure');
const chromePaths = require('chrome-paths');
let toBoolean = require('to-boolean');
require('dotenv').config({path: '.env'});
// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run
setHeadlessWhen(process.env.HEADLESS);
setWindowSize(1920, 1080);
exports.config = {
    tests: 'Applications/Acceptance/**/*.js',
    output: process.env.REPORT_DIR,
    helpers: {
        Puppeteer: {
            show: toBoolean(process.env.SHOW),
            restart: true,
            windowSize: '1200x900',
            waitForAction: 2000,
            pageload_timeout: 30000,
            connection_timeout: 30000,
            request_timeout: 30000,
            chrome: {
                executablePath: chromePaths.chrome,
                ignoreHTTPSErrors:true
            }

        },
        
        StepFile: {
            require: './Libraries/steps_file.js',
        },

    },
    include: require('./Interfaces/CServicePagePath.js'),
    bootstrap: null,
    mocha: require('./Libraries/CExecutionReporter.js'),
    name: 'Predict',
    plugins: {
        allure: {
            enabled: true
        },
        screenshotOnFail: {
            enabled: true
        }
    }
}

