import { QrCode } from '@/domains/bot/enterprise/entities/qrcode'

export class BotQrCodeMapper {
  static toDomain(qrcode: string): QrCode {
    return QrCode.create({
      qrcode,
    })
  }
}
