import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe'
import { z } from 'zod'
import { SendMessageUseCase } from '@/domains/bot/application/use-cases/send-message-use-case'

const sendMessageSchema = z.object({
  phone: z.string({
    required_error: 'É necessário fornecer um telefone para enviar a mensagem',
  }),
  message: z.string({
    required_error: 'É necessário fornecer uma mensagem para ser enviada',
  }),
})

type SendMessageBody = z.infer<typeof sendMessageSchema>

@Controller('send')
export class BotSendMessageController {
  constructor(private sendMessage: SendMessageUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(sendMessageSchema))
  async handle(@Body() body: SendMessageBody) {
    const { phone, message } = body

    await this.sendMessage.execute({ message, phone })
  }
}
