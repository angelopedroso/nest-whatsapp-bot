import { left, right, type Either } from '@/core/either'
import { MessagesRepository } from '../repositories/message-repository'
import { BadRequestException } from '@/core/errors/errors/bad-request'
import { SendMultipleMessage } from '../../enterprise/entities/send-multiple-messages'
import { Injectable } from '@nestjs/common'

export interface SendMultipleMessageRequest {
  message: string
  phones: string[]
}

type SendMultipleMessageResponse = Either<BadRequestException, null>

@Injectable()
export class SendMultipleMessageUseCase {
  constructor(private messageRepository: MessagesRepository) {}

  async execute({
    message,
    phones,
  }: SendMultipleMessageRequest): Promise<SendMultipleMessageResponse> {
    if (!message.trim()) {
      return left(new BadRequestException('message'))
    }

    if (phones.length < 1) {
      return left(new BadRequestException('phones'))
    }

    const messages = SendMultipleMessage.create({ message, phones })

    await this.messageRepository.sendMultiples(messages)

    return right(null)
  }
}
