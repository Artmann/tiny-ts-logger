import { log } from '.'

console.log('\n\n\n\n\n\n')

console.log('\n')

log.trace(
  'Starting HTTP request to /api/v1/users with headers: { Authorization: Bearer b396be96dab4e9f909e21982180243ff }'
)

console.log('\n')

log.debug('User data processed, preparing to save to database.')

console.log('\n')

log.info('User successfully created with ID: 2e814b77-31fa-4b90-9f82-9766507b3a7a.')

console.log('\n')

log.warn('User account creation took longer than expected.')

console.log('\n')

log.error('Failed to create user due to database connection timeout.')

console.log('\n')

log.fatal(
  'Critical error - Unable to connect to primary database, application shutting down'
)

console.log('\n\n\n\n')