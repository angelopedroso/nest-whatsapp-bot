import { BotService } from '@/infra/bot/bot.service'
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export class ClientStateMiddleware implements NestMiddleware {
  constructor(private bot: BotService) {}

  async use(_: never, __: never, next: () => void) {
    try {
      const state = await this.bot.getState()

      if (!state) {
        throw new UnauthorizedException(
          'Sessão expirada. Por favor, leia o Qr Code novamente!',
        )
      }

      next()
    } catch (error) {
      throw new UnauthorizedException(
        'Sessão expirada. Por favor, leia o Qr Code novamente!',
      )
    }
  }
}
