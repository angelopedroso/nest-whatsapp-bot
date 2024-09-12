import type { MessagesRepository } from '@/domains/bot/application/repositories/message-repository'
import type { SendMessage } from '@/domains/bot/enterprise/entities/send-message'
import type { SendMultipleMessage } from '@/domains/bot/enterprise/entities/send-multiple-messages'

export class InMemoryMessagesRepository implements MessagesRepository {
  public messages: string[] = []

  async send({ message, phone }: SendMessage): Promise<void> {
    this.messages.push(`${phone} - ${message}`)
  }

  async sendMultiples({ message, phones }: SendMultipleMessage): Promise<void> {
    phones.map((phone) => this.messages.push(`${phone} - ${message}`))
  }
}
