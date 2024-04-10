import { expect, test } from 'vitest'
import {getSecretMessage, potentialMessages} from '../../src/utils/SecretMessageGenerator'

const acceptedMessages: string[] = [
    "Shh it's a secret",
    "SECRET VIDEO \\o/",
    "REDACTED",
    "{ Packet Lost }",
]

test('Secret Message List', ()=> {
    expect(potentialMessages).toEqual(acceptedMessages);
})

test('Get Secret Message', () => {
  expect(acceptedMessages).toContain(getSecretMessage());
})