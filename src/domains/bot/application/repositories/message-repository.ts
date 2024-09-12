import type { SendMessage } from '../../enterprise/entities/send-message'
import type { SendMultipleMessage } from '../../enterprise/entities/send-multiple-messages'

export abstract class MessagesRepository {
  abstract send(recipientMessage: SendMessage): Promise<void>
  abstract sendMultiples(recipientMessage: SendMultipleMessage): Promise<void>
}
