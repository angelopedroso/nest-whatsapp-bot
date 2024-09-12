import { QrCodeRepository } from '@/domains/bot/application/repositories/qrcode-repository'
import { QrCode } from '@/domains/bot/enterprise/entities/qrcode'
import { OnEvent } from '@nestjs/event-emitter'
import { BotQrCodeMapper } from '../mappers/bot-qrcode-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class BotQrCodeRepository implements QrCodeRepository {
  private qrCode: string

  async create(): Promise<QrCode | null> {
    const qrcode = BotQrCodeMapper.toDomain(this.qrCode)

    if (!qrcode) {
      return null
    }

    return qrcode
  }

  @OnEvent('qrcode.created')
  private handleGenerateQrCode(qrCode: string) {
    this.qrCode = qrCode
  }
}
