import { left, right, type Either } from '@/core/either'
import { MessagesRepository } from '../repositories/message-repository'
import { BadRequestException } from '@/core/errors/errors/bad-request'
import { SendMessage } from '../../enterprise/entities/send-message'
import { Injectable } from '@nestjs/common'

export interface SendMessageUseCaseRequest {
  message: string
  phone: string
}

type SendMessageUseCaseResponse = Either<BadRequestException, null>

@Injectable()
export class SendMessageUseCase {
  constructor(private messagesRepository: MessagesRepository) {}

  async execute({
    message,
    phone,
  }: SendMessageUseCaseRequest): Promise<SendMessageUseCaseResponse> {
    if (!message) {
      return left(new BadRequestException('message'))
    }

    if (!phone) {
      return left(new BadRequestException('phone'))
    }

    const finishedMessage = SendMessage.create({ message, phone })

    await this.messagesRepository.send(finishedMessage)

    return right(null)
  }
}
