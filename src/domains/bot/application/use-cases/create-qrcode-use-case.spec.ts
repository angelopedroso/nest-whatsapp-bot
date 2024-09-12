import { InMemoryQrCodeRepository } from 'test/repositories/in-memory-qrcode-repository'
import { QrCodeUseCase } from './create-qrcode-use-case'

let inMemoryQrCodeRepository: InMemoryQrCodeRepository
let sut: QrCodeUseCase

describe('Create QrCode', () => {
  beforeEach(() => {
    inMemoryQrCodeRepository = new InMemoryQrCodeRepository()

    sut = new QrCodeUseCase(inMemoryQrCodeRepository)
  })

  it('should be able to create a qrcode string', async () => {
    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({ qrcode: expect.any(String) })
  })
})
