import { expect, test } from 'vitest'
import {getSecretMessage, potentialMessages} from '../../src/utils/SecretMessageGenerator'

const acceptedMessages: string[] = [
  "Shh it's a secret",
  "SECRET VIDEO \\o/",
  "REDACTED",
  "{ Packet Lost }",
  "Cubbie paid me to hide this",
  "Daisy stole it",
  "Hidden in one of Cohoe's pockets",
  "Anna's sleeping on it",
]

test('Secret Message List', ()=> {
    expect(potentialMessages).toEqual(acceptedMessages);
})

test('Get Secret Message', () => {
  expect(acceptedMessages).toContain(getSecretMessage());
})