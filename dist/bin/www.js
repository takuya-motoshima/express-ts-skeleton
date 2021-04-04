"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const app_1 = __importDefault(require("~/app"));
const debug_1 = __importDefault(require("debug"));
const http_1 = __importDefault(require("http"));
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    // Cast port to integer type.
    const port = parseInt(val.toString(), 10);
    // named pipe
    if (isNaN(port))
        return val;
    // port number
    if (port >= 0)
        return port;
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen')
        throw error;
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    // Handle specific listen errors with friendly messages.
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    function bind() {
        const addr = server.address();
        if (addr === null)
            return '';
        else if (typeof addr === 'string')
            return `pipe ${addr}`;
        else if ('port' in addr)
            return `port ${addr.port}`;
        else
            return '';
    }
    debug(`Listening on ${bind()}`);
}
// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || 3000);
app_1.default.set('port', port);
// Create HTTP server.
const server = http_1.default.createServer(app_1.default);
// Debugger
const debug = debug_1.default('app');
// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
