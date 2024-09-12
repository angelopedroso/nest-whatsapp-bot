import { Entity } from '@/core/entities/entity'

export interface QrCodeProps {
  qrcode: string
}

export class QrCode extends Entity<QrCodeProps> {
  get qrcode() {
    return this.props.qrcode
  }

  static create(props: QrCodeProps) {
    const qrcode = new QrCode(props)

    return qrcode
  }
}
