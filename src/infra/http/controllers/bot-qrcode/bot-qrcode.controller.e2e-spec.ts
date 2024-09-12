import { QrCodeRepository } from '@/domains/bot/application/repositories/qrcode-repository'
import { QrCode } from '@/domains/bot/enterprise/entities/qrcode'
import { faker } from '@faker-js/faker'
import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from 'src/infra/app.module'
import request from 'supertest'

describe('Qr Code (E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const mockedQrCode = QrCode.create({ qrcode: faker.string.nanoid(30) })

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(QrCodeRepository)
      .useValue({
        create: vi.fn().mockReturnValue(mockedQrCode),
      })
      .compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  test('[GET] /qr', async () => {
    const response = await request(app.getHttpServer()).get('/qr').send()

    expect(response.body).toEqual({
      qrcode: expect.any(String),
    })
  })
})
