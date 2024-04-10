export const potentialMessages: string[] = [
  "Shh it's a secret",
  "SECRET VIDEO \\o/",
  "REDACTED",
  "{ Packet Lost }",
]

export const getSecretMessage = (): string => {
  return potentialMessages[Math.floor(Math.random()*potentialMessages.length)]
}