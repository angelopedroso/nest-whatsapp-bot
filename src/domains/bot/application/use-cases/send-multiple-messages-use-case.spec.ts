import { InMemoryMessagesRepository } from 'test/repositories/in-memory-messages-repository'
import { SendMultipleMessageUseCase } from './send-multiple-messages-use-case'
import { BadRequestException } from '@/core/errors/errors/bad-request'

let inMemoryMessagesRepository: InMemoryMessagesRepository
let sut: SendMultipleMessageUseCase

describe('Send Multiple Messages', () => {
  beforeEach(() => {
    inMemoryMessagesRepository = new InMemoryMessagesRepository()

    sut = new SendMultipleMessageUseCase(inMemoryMessagesRepository)
  })

  it('should be able to send multiple messages', async () => {
    const phones = []

    for (let message = 1; message <= 10; message++) {
      phones.push(message)
    }

    await sut.execute({ message: 'hello world', phones })

    expect(inMemoryMessagesRepository.messages.length).toEqual(10)
  })

  it('should not be able to send multiples messages, cause phone is empty', async () => {
    const phones = []

    const result = await sut.execute({ message: 'hello world', phones })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(BadRequestException)
    expect(inMemoryMessagesRepository.messages).toEqual(
      expect.arrayContaining([]),
    )
  })
})
