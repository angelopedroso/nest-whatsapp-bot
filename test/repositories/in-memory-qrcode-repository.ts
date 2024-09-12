import { QrCodeRepository } from '@/domains/bot/application/repositories/qrcode-repository'
import { QrCode } from '@/domains/bot/enterprise/entities/qrcode'
import { faker } from '@faker-js/faker'

export class InMemoryQrCodeRepository implements QrCodeRepository {
  async create(): Promise<QrCode | null> {
    const randomQR = faker.string.uuid()

    const qrcode = QrCode.create({ qrcode: randomQR })

    if (!qrcode) {
      return null
    }

    return qrcode
  }
}
