import { SendMultipleMessageUseCase } from '@/domains/bot/application/use-cases/send-multiple-messages-use-case'
import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe'

const sendMultipleSchema = z.object({
  phones: z
    .array(z.string())
    .min(1, 'É necessário fornecer ao menos 1 número de celular'),
  message: z
    .string({
      required_error: 'É necessário fornecer alguma mensagem a ser enviada',
    })
    .min(5, 'Mensagem deve conter pelo menos 5 caracteres'),
})

type SendMultipleT = z.infer<typeof sendMultipleSchema>

@Controller('send-multiple')
export class BotSendMultipleMessageController {
  constructor(private sendMultiple: SendMultipleMessageUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(sendMultipleSchema))
  async handle(@Body() body: SendMultipleT) {
    const { message, phones } = body

    await this.sendMultiple.execute({ message, phones })
  }
}
