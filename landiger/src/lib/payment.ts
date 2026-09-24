/**
 * Bank account that receives plan payments, shown as a VietQR code.
 * TODO: replace with Landiger's real account before going live.
 */
export const PAYMENT_ACCOUNT = {
  bankName: 'MB Bank',
  /** NAPAS bank identifier (BIN): MB Bank = 970422 */
  bankBin: '970422',
  accountNo: '0000000000',
  accountName: 'CONG TY LANDIGER',
};

/** Unique transfer note, e.g. "LDG7K2QXA". Admins match incoming transfers against it. */
export function newPaymentCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I to avoid misreading
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return 'LDG' + [...bytes].map((b) => alphabet[b % alphabet.length]).join('');
}

const tlv = (id: string, value: string) => id + String(value.length).padStart(2, '0') + value;

// CRC-16/CCITT-FALSE, as required by EMVCo QR.
function crc16(s: string) {
  let crc = 0xffff;
  for (let i = 0; i < s.length; i++) {
    crc ^= s.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/** VietQR (NAPAS 247) payload that banking apps fill in with the account, amount and note. */
export function vietQrPayload({ amount, note }: { amount: number; note: string }) {
  const { bankBin, accountNo } = PAYMENT_ACCOUNT;
  const merchant =
    tlv('00', 'A000000727') + tlv('01', tlv('00', bankBin) + tlv('01', accountNo)) + tlv('02', 'QRIBFTTA');
  const body =
    tlv('00', '01') +
    tlv('01', '12') +
    tlv('38', merchant) +
    tlv('53', '704') +
    tlv('54', String(amount)) +
    tlv('58', 'VN') +
    tlv('62', tlv('08', note)) +
    '6304';
  return body + crc16(body);
}
