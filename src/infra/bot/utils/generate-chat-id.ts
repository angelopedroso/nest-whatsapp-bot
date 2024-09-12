export function generateChatId(phone: string) {
  const formattedPhone = phone.replace(/[^a-zA-Z0-9]/g, '')

  return `${formattedPhone}@c.us`
}
