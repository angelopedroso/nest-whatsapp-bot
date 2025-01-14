import { MessagesRepository } from '@/domains/bot/application/repositories/message-repository'
import { BotService } from '../bot.service'
import { SendMessage } from '@/domains/bot/enterprise/entities/send-message'
import { SendMultipleMessage } from '@/domains/bot/enterprise/entities/send-multiple-messages'
import WAWebJS from 'whatsapp-web.js'
import { Injectable } from '@nestjs/common'
import { delay } from '../utils/delay'

@Injectable()
export class BotMessagesRepository implements MessagesRepository {
  constructor(private bot: BotService) {}

  async send({ message, phone }: SendMessage): Promise<void> {
    const phoneNumberId = await this.numberIsValid(phone)

    if (phoneNumberId) {
      const recipient = await this.bot.getContactById(phoneNumberId._serialized)

      const templatedMessage = this.templateMessage(recipient, message)

      await this.bot.sendMessage(phoneNumberId._serialized, templatedMessage)
    }
  }

  async sendMultiples({ message, phones }: SendMultipleMessage): Promise<void> {
    const sendTasks = phones.map(async (phone) => {
      const randomTimeout = Math.round(Math.random() * 6 + 1) * 1000

      const validPhone = await this.numberIsValid(phone)

      if (validPhone) {
        const contact = await this.bot.getContactById(validPhone._serialized)

        const templatedMessage = this.templateMessage(contact, message)

        await delay(randomTimeout)

        await this.bot.sendMessage(validPhone._serialized, templatedMessage)
      }
    })

    await Promise.allSettled(sendTasks)
  }

  private templateMessage(contact: WAWebJS.Contact, message: string) {
    const name = contact.name ?? contact.pushname ?? contact.shortName ?? ''

    const formattedName = name ? ' ' + name : name

    return `*Olá${formattedName}*\n\n${message}`
  }

  private async numberIsValid(
    phone: string,
  ): Promise<WAWebJS.ContactId | null> {
    const phoneWithoutNine =
      phone.length === 13 ? phone.slice(0, 4) + phone.slice(5) : null

    const phoneWithNine =
      phone.length === 12 ? phone.slice(0, 4) + '9' + phone.slice(4) : null

    const [validPhone, validPhoneWithoutNine, validPhoneWithNine] =
      await Promise.all([
        this.bot.getNumberId(phone),
        phoneWithoutNine ? this.bot.getNumberId(phoneWithoutNine) : null,
        phoneWithNine ? this.bot.getNumberId(phoneWithNine) : null,
      ])

    return validPhone || validPhoneWithoutNine || validPhoneWithNine || null
  }
}
