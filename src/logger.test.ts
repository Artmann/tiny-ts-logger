import { beforeEach, describe, expect, test, vi } from 'vitest'

import { Colors, Logger } from './logger'
import chalk from 'chalk'

describe('Logger', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2024, 8, 31))
  })

  test('properly logs trace messages to the console.', () => {
    const spy = vi.spyOn(console, 'log')

    const logger = new Logger()

    logger.trace('Entering processOrder function with orderId=12345')

    const expectedMessage = `[${chalk.hex(Colors.LightGray)('TRACE')}] ${chalk.hex(Colors.LightGray)('2024-09-30T22:00:00.000Z')} Entering processOrder function with orderId=12345`

    expect(spy).toHaveBeenCalledWith(expectedMessage)
  })

  test('properly logs debug messages to the console.', () => {
    const spy = vi.spyOn(console, 'log')

    const logger = new Logger()

    logger.debug('Processing order with orderId=12345')

    const expectedMessage = `[${chalk.hex(Colors.LightGray)('DEBUG')}] ${chalk.hex(Colors.LightGray)('2024-09-30T22:00:00.000Z')} Processing order with orderId=12345`

    expect(spy).toHaveBeenCalledWith(expectedMessage)
  })

  test('properly logs info messages to the console.', () => {
    const spy = vi.spyOn(console, 'log')

    const logger = new Logger()

    logger.info('Order processed successfully')

    const expectedMessage = `[${chalk.hex(Colors.LightGray)('INFO')}] ${chalk.hex(Colors.LightGray)('2024-09-30T22:00:00.000Z')} Order processed successfully`

    expect(spy).toHaveBeenCalledWith(expectedMessage)
  })

  test('properly logs warn messages to the console.', () => {
    const spy = vi.spyOn(console, 'log')

    const logger = new Logger()

    logger.warn('Order with orderId=12345 is missing a delivery address')

    const expectedMessage = `[${chalk.hex(Colors.LightGray)('WARN')}] ${chalk.hex(Colors.LightGray)('2024-09-30T22:00:00.000Z')} Order with orderId=12345 is missing a delivery address`

    expect(spy).toHaveBeenCalledWith(expectedMessage)
  })

  test('properly logs error messages to the console.', () => {
    const spy = vi.spyOn(console, 'log')

    const logger = new Logger()

    logger.error('Failed to process order with orderId=12345')

    const expectedMessage = `[${chalk.hex(Colors.LightGray)('ERROR')}] ${chalk.hex(Colors.LightGray)('2024-09-30T22:00:00.000Z')} Failed to process order with orderId=12345`

    expect(spy).toHaveBeenCalledWith(expectedMessage)
  })

  test('properly logs fatal messages to the console.', () => {
    const spy = vi.spyOn(console, 'log')

    const logger = new Logger()

    logger.fatal('Failed to start the application')

    const expectedMessage = `[${chalk.hex(Colors.LightGray)('FATAL')}] ${chalk.hex(Colors.LightGray)('2024-09-30T22:00:00.000Z')} Failed to start the application`

    expect(spy).toHaveBeenCalledWith(expectedMessage)
  })

  test('does not log messages when no message is provided.', () => {
    const spy = vi.spyOn(console, 'log')

    const logger = new Logger()

    logger.info()

    expect(spy).not.toHaveBeenCalled()
  })

  test('logs messages with multiple arguments.', () => {
    const spy = vi.spyOn(console, 'log')

    const logger = new Logger()

    logger.info('Order processed successfully', 'orderId=12345')

    const expectedMessage = `[${chalk.hex(Colors.LightGray)('INFO')}] ${chalk.hex(Colors.LightGray)('2024-09-30T22:00:00.000Z')} Order processed successfully`

    expect(spy).toHaveBeenCalledWith(expectedMessage, 'orderId=12345')
  })

  test('logs messages with a message object.', () => {
    const spy = vi.spyOn(console, 'log')

    const logger = new Logger()

    logger.info({ orderId: 12345 }, 'Order processed successfully')

    expect(spy).toHaveBeenCalledWith(
      `[${chalk.hex(Colors.LightGray)('INFO')}] ${chalk.hex(Colors.LightGray)('2024-09-30T22:00:00.000Z')} `,
      { orderId: 12345 },
      'Order processed successfully'
    )
  })
})
