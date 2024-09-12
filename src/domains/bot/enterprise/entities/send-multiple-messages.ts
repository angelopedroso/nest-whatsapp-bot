import { Entity } from '@/core/entities/entity'

export interface SendMultipleMessageProps {
  message: string
  phones: string[]
}

export class SendMultipleMessage extends Entity<SendMultipleMessageProps> {
  get message() {
    return this.props.message
  }

  get phones() {
    return this.props.phones
  }

  static create(props: SendMultipleMessageProps) {
    const sendMessages = new SendMultipleMessage(props)

    return sendMessages
  }
}
