import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe'
import { z } from 'zod'
import { SendMessageUseCase } from '@/domains/bot/application/use-cases/send-message-use-case'

const sendMessageSchema = z.object({
  phone: z
    .string({
      required_error:
        'É necessário fornecer um telefone para enviar a mensagem',
    })
    .min(10, 'É necessário fornecer um telefone para ser enviada')
    .regex(
      /^(?:\+?55)?(?:\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}|\d{12,13}$/,
      'Telefone inválido',
    )
    .transform((phone) => {
      const phoneWithoutSpecial = phone.replace(/[^\d]/g, '')

      const formattedPhone = phoneWithoutSpecial.startsWith('55')
        ? phoneWithoutSpecial
        : '55' + phoneWithoutSpecial

      return formattedPhone
    }),
  message: z
    .string({
      required_error: 'É necessário fornecer uma mensagem para ser enviada',
    })
    .min(5, 'Mensagem deve conter pelo menos 5 caracteres'),
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
