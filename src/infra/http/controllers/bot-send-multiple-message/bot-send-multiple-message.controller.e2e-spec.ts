import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Send Multiple Message (E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[POST] /send-multiple', async () => {
    const response = await request(app.getHttpServer())
      .post('/send-multiple')
      .send({
        message: 'Vilma MOchaixiciaxninixc',
        phones: ['5551997561207', '555136262066'],
      })

    expect(response.statusCode).toBe(201)
  })
})
