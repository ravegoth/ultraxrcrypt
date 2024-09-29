# ultraxrcrypt

ultraxrcrypt is an enhanced version of [xrcrypt](https://github.com/ravegoth/xrcrypt), offering improved encryption features and additional functionalities for more secure and confusing encryption.

## Usage example

```py
>>> uxrcrypt("secret", "key")
'ేࢩঝాࢩঢ௷ࢎঝఔࢎड़ఁࢍ\u098eభ࢞ॴౄ\u0897ঔచࡘঠొࢣগొࢨঘఱࢦণౄ࢝ণ\u0c49ࡖঌఴࡘঠొࢣগొࢨঈేࢩঝాࢩঢ௷\u085fঘస\u0891ॻవ࢝ঋ௹ࢦণౄ࢝ণ\u0c49࢝ঠొࢣগొࢨॐఏ\u0897ॗగࢃॶఓࡾ६ు\u086c॒ేࢩঝాࢩঢఱ࢟ঠొࢣগొࢨॐస࢙\u0991షࢁ॒ేࢩঝాࢩঢేࢩঝాࢩঢ௷ࡡ॒ేࢩঝాࢩঢ'
>>> deuxrcrypt('ేࢩঝాࢩঢ௷ࢎঝఔࢎड़ఁࢍ\u098eభ࢞ॴౄ\u0897ঔచࡘঠొࢣগొࢨঘఱࢦণౄ࢝ণ\u0c49ࡖঌఴࡘঠొࢣগొࢨঈేࢩঝాࢩঢ௷\u085fঘస\u0891ॻవ࢝ঋ௹ࢦণౄ࢝ণ\u0c49࢝ঠొࢣগొࢨॐఏ\u0897ॗగࢃॶఓࡾ६ు\u086c॒ేࢩঝాࢩঢఱ࢟ঠొࢣগొࢨॐస࢙\u0991షࢁ॒ేࢩঝాࢩঢేࢩঝాࢩঢ௷ࡡ॒ేࢩঝాࢩঢ', "key")
'secret'
```

## Enhancements

- **Added Noise**: Incorporates random noise into the encryption process to make the encrypted output more confusing and harder to decipher without the key.
- **More stable algorithm**: It's different but it's ... just better >:)

## Playground

An interactive playground is available for testing and experimenting with ultraxrcrypt's encryption and decryption capabilities.
Try it out here: [playground](https://ravegoth.github.io/ultraxrcrypt/)

## Warning

**The hash function provided is not a standard cryptographic hash function and should not be used where cryptographic security is required. For example:**

```python
>>> hash('aaaaaaaaaaaaaaaaaaaaaaaab')
'F7HLRUd1xnOd44JfPg968eyhvcFa8IONA5jvdz2MSIV93Je8gWA6Iq3aVPC3fJDG'
>>> hash('aaaaaaaaaaaaaaaaaaaaaaaba')
'F7HLRUd1xnOd44JfPg968eyKccFa8IONA5jvdz2MSIV93Je8HaA6Iq3aVPC3fJDG'
```

As shown, small changes in the input do not result in completely different hashes, which is a property required for secure hash functions.

### Encrypted Chatrooms Service

There's no need for a database setup. Messages are stored in simple `.txt` files on the server. Host the `gateway.php` anywhere you want then just use the static chatroom to send and receive data from it.
