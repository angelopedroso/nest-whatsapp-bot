import { InMemoryMessagesRepository } from 'test/repositories/in-memory-messages-repository'
import { SendMessageUseCase } from './send-message-use-case'
import { MakeMessage } from 'test/factories/make-message'

let inMemoryMessagesRepository: InMemoryMessagesRepository
let sut: SendMessageUseCase

describe('Send Message Use Case', () => {
  beforeEach(() => {
    inMemoryMessagesRepository = new InMemoryMessagesRepository()

    sut = new SendMessageUseCase(inMemoryMessagesRepository)
  })

  it('should be able to send a message to an specific phone number', async () => {
    const message = MakeMessage()

    await sut.execute(message)

    expect(inMemoryMessagesRepository.messages[0]).toBe(
      `${message.phone} - ${message.message}`,
    )
  })
})
