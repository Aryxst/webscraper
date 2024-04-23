// Define error types
type LogTypes = 'w' | 'e' | 'i' | 'r' | 'd';
// Bind each log type to a color
const LogBinds: Record<LogTypes, string> = {
 w: '\x1b[33m[WARN]\x1b[0m',
 e: '\x1b[31m[ERROR]\x1b[0m',
 i: '\x1b[36m[INFO]\x1b[0m',
 r: '\x1b[32m[READY]\x1b[0m',
 d: '\x1b[90m[DEBUG]\x1b[0m',
};
export default <Log>(type: LogTypes, msg: Log, ...args: Array<any>) => console.log(`${LogBinds[type]} - ${msg}`, ...args, `| ${new Date().toLocaleTimeString()}`);
