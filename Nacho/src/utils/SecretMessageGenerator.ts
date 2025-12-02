export const potentialMessages: string[] = [
  "Shh it's a secret",
  "SECRET VIDEO \\o/",
  "REDACTED",
  "{ Packet Lost }",
  "Cubbie paid me to hide this",
  "Daisy stole it",
  "Hidden in one of Cohoe's pockets",
  "Anna's sleeping on it",
  "It's in the fridge",
  "AI Overview - Sorry I don't know that",
  "1-877-Kars-4-Kids"
]

export const getSecretMessage = (): string => {
  return potentialMessages[Math.floor(Math.random()*potentialMessages.length)]
}

export default getSecretMessage;