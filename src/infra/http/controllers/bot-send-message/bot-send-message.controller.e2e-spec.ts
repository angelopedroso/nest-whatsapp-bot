import { Test } from '@nestjs/testing'
import { AppModule } from '@/infra/app.module'
import type { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { MakeMessage } from 'test/factories/make-message'

describe('Send Message (E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[POST] /send', async () => {
    const { message, phone } = MakeMessage({ phone: '5551997561207' })

    const response = await request(app.getHttpServer()).post('/send').send({
      message,
      phone,
    })

    expect(response.statusCode).toBe(201)
  })
})
