export default class Crypto {
  constructor(private text: string) {}

  normalizePlaintext(): string {
    return this.text.replace(/[&/\\#,+()$~%.'":*?<>{}^! ]/g, '').toLowerCase()
  }

  size(): number {
    const root = Math.sqrt(this.normalizePlaintext().length)
    return Number.isInteger(root) ? root : Math.floor(root) + 1
  }

  plaintextSegments(): string[] {
    const normalized = this.normalizePlaintext()
    const size = this.size()
    const segments = []

    for (let i = 0; i < normalized.length; i += size) {
      segments.push(normalized.slice(i, i + size))
    }

    return segments
  }

  ciphertext(): string {
    const cipher: string[] = []

    for (let i = 0; i < this.size(); i++) {
      for (const segment of this.plaintextSegments()) {
        cipher.push(segment[i])
      }
    }

    return cipher.join('')
  }
}
