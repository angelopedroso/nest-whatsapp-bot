import { QrCodeUseCase } from '@/domains/bot/application/use-cases/create-qrcode-use-case'
import { Controller, Get, NotFoundException } from '@nestjs/common'

@Controller('qr')
export class QrCodeController {
  constructor(private qrCodeUseCase: QrCodeUseCase) {}

  @Get()
  async handle() {
    const qrCodeResponse = await this.qrCodeUseCase.execute()

    if (qrCodeResponse.isLeft()) {
      throw new NotFoundException('Qr Code não encontrado')
    }

    const { qrcode } = qrCodeResponse.value

    return {
      qrcode,
    }
  }
}
