import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { BotModule } from '@/infra/bot/bot.module'

import { QrCodeController } from './controllers/bot-qrcode/bot-qrcode.controller'
import { QrCodeUseCase } from '@/domains/bot/application/use-cases/create-qrcode-use-case'
import { BotSendMessageController } from './controllers/bot-send-message/bot-send-message.controller'
import { SendMessageUseCase } from '@/domains/bot/application/use-cases/send-message-use-case'
import { BotSendMultipleMessageController } from './controllers/bot-send-multiple-message/bot-send-multiple-message.controller'
import { SendMultipleMessageUseCase } from '@/domains/bot/application/use-cases/send-multiple-messages-use-case'
import { ClientStateMiddleware } from './middleware/client-state/client-state.middleware'

@Module({
  imports: [BotModule],
  controllers: [
    QrCodeController,
    BotSendMessageController,
    BotSendMultipleMessageController,
  ],
  providers: [QrCodeUseCase, SendMessageUseCase, SendMultipleMessageUseCase],
})
export class HttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ClientStateMiddleware)
      .forRoutes(BotSendMessageController, BotSendMultipleMessageController)
  }
}
