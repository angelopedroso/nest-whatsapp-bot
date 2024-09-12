import { QrCode } from '../../enterprise/entities/qrcode'

export abstract class QrCodeRepository {
  abstract create(): Promise<QrCode | null>
}
