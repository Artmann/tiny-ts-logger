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
  Lavender = '#ECD5E3',
  LightCoral = '#FFB6B6',
  LightGray = '#f1f5f9',
  PastelBlue = '#ABDEE6',
  PastelGreen = '#97C1A9',
  PastelYellow = '#FDFD96',
  PastelRed = '#FF6961'
}

const logLevelToColor: Record<LogLevel, string> = {
  [LogLevel.Trace]: Colors.Lavender,
  [LogLevel.Debug]: Colors.PastelBlue,
  [LogLevel.Info]: Colors.PastelGreen,
  [LogLevel.Warn]: Colors.PastelYellow,
  [LogLevel.Error]: Colors.LightCoral,
  [LogLevel.Fatal]: Colors.PastelRed
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

    const formattedMessage = this.formatMessage(level, message)

    console.log(formattedMessage, ...items)
  }

  trace(...items: any[]): void {
    this.log(LogLevel.Trace, ...items)
  }

  warn(...items: any[]): void {
    this.log(LogLevel.Warn, ...items)
  }

  private formatMessage(level: LogLevel, message: string): string {
    const date = new Date().toISOString()
    const formattedDate = chalk.dim(date)

    const logLevelName = logLevelToName[level] ?? 'unknown'
    const logLevelColor = logLevelToColor[level] ?? Colors.LightGray
    const logLevel = chalk.hex(logLevelColor)(logLevelName.toUpperCase())
    const formattedLogLevel = `[${logLevel}]`

    const formattedMessage = [formattedLogLevel, formattedDate, message].join(
      ' '
    )

    return formattedMessage
  }

  private isString(value: any): value is string {
    return typeof value === 'string'
  }
}
