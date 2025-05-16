export const potentialMessages: string[] = [
  "Shh it's a secret",
  "SECRET VIDEO \\o/",
  "REDACTED",
  "{ Packet Lost }",
  "Cubbie paid me to hide this",
  "Daisy stole it",
  "Hidden in one of Cohoe's pockets",
  "Anna's sleeping on it",
  "It's in the fridge"
]

export const getSecretMessage = (): string => {
  return potentialMessages[Math.floor(Math.random()*potentialMessages.length)]
}