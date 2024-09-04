import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { Logger } from './logger'

vi.mock('chalk', async () => ({
  default: {
    dim: (text: string) => text,
    hex: () => (text: string) => text
  }
}))

describe('Logger', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-09-30T22:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('properly logs trace messages to the console.', () => {
    const spy = vi.spyOn(console, 'log')

    const logger = new Logger()

    logger.trace('Entering processOrder function with orderId=12345.')

    const expectedMessage = `[TRACE] 2024-09-30T22:00:00.000Z Entering processOrder function with orderId=12345.`

    expect(spy).toHaveBeenCalledWith(expectedMessage)
  })

  test('properly logs debug messages to the console.', () => {
    const spy = vi.spyOn(console, 'log')

    const logger = new Logger()

    logger.debug('Processing order with orderId=12345.')

    const expectedMessage = `[DEBUG] 2024-09-30T22:00:00.000Z Processing order with orderId=12345.`

    expect(spy).toHaveBeenCalledWith(expectedMessage)
  })

  test('properly logs info messages to the console.', () => {
    const spy = vi.spyOn(console, 'log')

    const logger = new Logger()

    logger.info('Order processed successfully.')

    const expectedMessage = `[INFO] 2024-09-30T22:00:00.000Z Order processed successfully.`

    expect(spy).toHaveBeenCalledWith(expectedMessage)
  })

  test('properly logs warn messages to the console.', () => {
    const spy = vi.spyOn(console, 'log')

    const logger = new Logger()

    logger.warn('Order with orderId=12345 is missing a delivery address.')

    const expectedMessage = `[WARN] 2024-09-30T22:00:00.000Z Order with orderId=12345 is missing a delivery address.`

    expect(spy).toHaveBeenCalledWith(expectedMessage)
  })

  test('properly logs error messages to the console.', () => {
    const spy = vi.spyOn(console, 'log')

    const logger = new Logger()

    logger.error('Failed to process order with orderId=12345.')

    const expectedMessage = `[ERROR] 2024-09-30T22:00:00.000Z Failed to process order with orderId=12345.`

    expect(spy).toHaveBeenCalledWith(expectedMessage)
  })

  test('properly logs fatal messages to the console.', () => {
    const spy = vi.spyOn(console, 'log')

    const logger = new Logger()

    logger.fatal('Failed to start the application.')

    const expectedMessage = `[FATAL] 2024-09-30T22:00:00.000Z Failed to start the application.`

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

    logger.info('Order processed successfully.', 'orderId=12345')

    const expectedMessage = `[INFO] 2024-09-30T22:00:00.000Z Order processed successfully.`

    expect(spy).toHaveBeenCalledWith(expectedMessage, 'orderId=12345')
  })

  test('logs messages with a message object.', () => {
    const spy = vi.spyOn(console, 'log')

    const logger = new Logger()

    logger.info({ orderId: 12345 }, 'Order processed successfully.')

    expect(spy).toHaveBeenCalledWith(
      `[INFO] 2024-09-30T22:00:00.000Z `,
      { orderId: 12345 },
      'Order processed successfully.'
    )
  })
})
