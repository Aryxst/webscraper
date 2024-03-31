import chalk from 'chalk';
// Define error types
type LogTypes = 'w' | 'e' | 'i' | 'r' | 'd';
// Bind each log type to a color
const LogBinds: Record<LogTypes, string> = {
 w: chalk.yellow('[WARN]'),
 e: chalk.red('[ERROR]'),
 i: chalk.cyan('[INFO]'),
 r: chalk.green('[READY]'),
 d: chalk.gray('[DEBUG]'),
};
export default <Log>(type: LogTypes, msg: Log, ...args: Array<any>) => console.log(`${LogBinds[type]} - ${msg}`, ...args, `| ${new Date().toLocaleTimeString()}`);
