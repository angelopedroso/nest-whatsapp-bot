import { Entity } from '@/core/entities/entity'

export interface SendMessageProps {
  message: string
  phone: string
}

export class SendMessage extends Entity<SendMessageProps> {
  get message() {
    return this.props.message
  }

  get phone() {
    return this.props.phone
  }

  static create(props: SendMessageProps) {
    const sendMessage = new SendMessage(props)

    return sendMessage
  }
}
