import chalk from 'chalk'

export enum LogLevel {
  Trace = 10,
  Debug = 20,
  Info = 30,
  Warn = 40,
  Error = 50,
  Fatal = 60
}

const logLevelToName: Record<LogLevel, string> = {
  [LogLevel.Trace]: 'trace',
  [LogLevel.Debug]: 'debug',
  [LogLevel.Info]: 'info',
  [LogLevel.Warn]: 'warn',
  [LogLevel.Error]: 'error',
  [LogLevel.Fatal]: 'fatal'
}

export enum Colors {
  LightGray = '#C7C8CC'
}

const logLevelToColor: Record<LogLevel, string> = {
  [LogLevel.Trace]: Colors.LightGray,
  [LogLevel.Debug]: Colors.LightGray,
  [LogLevel.Info]: Colors.LightGray,
  [LogLevel.Warn]: Colors.LightGray,
  [LogLevel.Error]: Colors.LightGray,
  [LogLevel.Fatal]: Colors.LightGray
}

export class Logger {
  debug(...items: any[]): void {
    this.log(LogLevel.Debug, ...items)
  }

  error(...items: any[]): void {
    this.log(LogLevel.Error, ...items)
  }

  fatal(...items: any[]): void {
    this.log(LogLevel.Fatal, ...items)
  }

  info(...items: any[]): void {
    this.log(LogLevel.Info, ...items)
  }

  log(level: LogLevel, ...items: any[]): void {
    if (items.length === 0) {
      return
    }

    const message = this.isString(items[0]) ? items.shift() : ''

    const formatedMessage = this.formatMessage(level, message)

    console.log(formatedMessage, ...items)
  }

  trace(...items: any[]): void {
    this.log(LogLevel.Trace, ...items)
  }

  warn(...items: any[]): void {
    this.log(LogLevel.Warn, ...items)
  }

  private formatMessage(level: LogLevel, message: string): string {
    const date = new Date().toISOString()
    const formatedDate = chalk.hex(Colors.LightGray)(date)

    const logLevelName = logLevelToName[level] ?? 'unknown'
    const logLevelColor = logLevelToColor[level] ?? Colors.LightGray
    const logLevel = chalk.hex(logLevelColor)(logLevelName.toUpperCase())
    const formatedLogLevel = `[${logLevel}]`

    const formatedMessage = [formatedLogLevel, formatedDate, message].join(' ')

    return formatedMessage
  }

  private isString(value: any): value is string {
    return typeof value === 'string'
  }
}
