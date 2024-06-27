import {createCipheriv} from 'node:crypto'
export default async function() {
  function encryptValue(originalString) {
    const encryptionKey = 'testkeys'
    const bufferKey = Buffer.from(encryptionKey, 'utf8')
    let cipher = createCipheriv('DES-ECB', bufferKey, null)
    cipher.setAutoPadding(false)
    let bufferString = Buffer.from(originalString, 'utf8')
    let paddingSize = bufferKey.length - (bufferString.length % bufferKey.length)
    let paddedStr = Buffer.concat([
      bufferString,
      Buffer.alloc(paddingSize, 0)
    ])
    let encryptedValue = cipher.update(paddedStr).toString('base64').replace(/\+/g, '-')
    cipher.final()
    return encryptedValue
  }
  return Response.json({
    string: encryptValue('testing')
  })
}
