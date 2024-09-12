import { right, type Either } from '@/core/either'
import { BadRequestException } from '@/core/errors/errors/bad-request'
import { QrCodeRepository } from '../repositories/qrcode-repository'
import { Injectable } from '@nestjs/common'

type QrCodeUseCaseResponse = Either<
  BadRequestException,
  {
    qrcode: string
  }
>

@Injectable()
export class QrCodeUseCase {
  constructor(private qrCodeRepository: QrCodeRepository) {}

  async execute(): Promise<QrCodeUseCaseResponse> {
    const { qrcode } = await this.qrCodeRepository.create()

    return right({
      qrcode,
    })
  }
}
