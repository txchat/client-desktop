import { arrayToHex } from 'enc-utils'
import { seed } from '@33cn/wallet-base'
import { Account } from '@/types/user-account'

export function generateAccount(mnemonic: string): Account {
    const wallet = seed.newWalletFromMnemonic(mnemonic)
    const account = wallet.newAccount()

    const publicKey: Uint8Array = account.publicKey
    const privateKey: Uint8Array = account.privateKey
    const publicKeyHex: string = arrayToHex(account.publicKey)
    const privateKeyHex: string = account.hexPrivateKey
    const address: string = account.address

    return { mnemonic, address, privateKey, privateKeyHex, publicKey, publicKeyHex }
}
