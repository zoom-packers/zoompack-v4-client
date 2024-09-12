const childProcess = require('child_process');
const {requireGlobal} = require("../utils/requireGlobal");
requireGlobal("ts-node");
requireGlobal("typescript");

childProcess.execSync('ts-node main.ts', {cwd: __dirname, stdio: 'inherit'});
