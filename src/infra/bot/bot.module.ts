import { Module } from '@nestjs/common'
import { BotService } from './bot.service'
import { BotQrCodeRepository } from './repositories/bot-qrcode-repository'
import { QrCodeRepository } from '@/domains/bot/application/repositories/qrcode-repository'
import { MessagesRepository } from '@/domains/bot/application/repositories/message-repository'
import { BotMessagesRepository } from './repositories/bot-message-repository'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    BotService,
    { provide: QrCodeRepository, useClass: BotQrCodeRepository },
    { provide: MessagesRepository, useClass: BotMessagesRepository },
  ],
  exports: [BotService, QrCodeRepository, MessagesRepository],
})
export class BotModule {}
