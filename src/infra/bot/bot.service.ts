import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Client as WppClient, LocalAuth } from 'whatsapp-web.js'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class BotService extends WppClient implements OnModuleInit {
  private readonly logger = new Logger(BotService.name)

  constructor(private eventEmitter: EventEmitter2) {
    super({
      authStrategy: new LocalAuth(),
      puppeteer: {
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--aggressive-cache-discard',
          '--disable-cache',
          '--disable-application-cache',
          '--disable-offline-load-stale-cache',
          '--disk-cache-size=0',
        ],
      },
    })
  }

  onModuleInit() {
    super.on('qr', (qr) => {
      this.logger.log(`QrCode`)

      this.eventEmitter.emit('qrcode.created', qr)
    })

    super.on('ready', () => {
      this.logger.log('Back online again!')
    })

    super.on('message', (msg) => {
      this.logger.verbose(`${msg.from}: ${msg.body}`)
      super.sendSeen(msg.from)
    })

    super.on('disconnected', async (reason) => {
      this.logger.warn(`Disconnected: ${reason}`)
    })

    super.initialize()
  }

  @Cron(CronExpression.EVERY_6_HOURS)
  async handleRestart() {
    const session = await super.getState()

    if (session) {
      super.destroy()
      super.initialize()
    }
  }
}
