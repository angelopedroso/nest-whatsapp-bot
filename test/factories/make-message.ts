import type { SendMessageProps } from '@/domains/bot/enterprise/entities/send-message'
import { faker } from '@faker-js/faker'

export function MakeMessage(override?: Partial<SendMessageProps>) {
  const message = {
    message: faker.lorem.sentence(),
    phone: faker.phone
      .number({ style: 'international' })
      .replace(/[^a-zA-Z0-9]/g, ''),
    ...override,
  }

  return message
}
