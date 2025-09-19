import {createLogger, transports, format} from 'winston';
import path from 'path';

const logsDir = path.join(process.cwd(), 'logs');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.errors({stack: true}),
        format.splat(),
        format.json()
    ),
    transports: [
        new transports.File({filename: path.join(logsDir, 'errors.log'), level: 'error'}),
        new transports.File({filename: path.join(logsDir, 'combined.log')}),
        new transports.Console({format: format.combine(format.prettyPrint())})
    ]
});

export default logger;