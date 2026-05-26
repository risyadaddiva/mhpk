import crypto from "crypto";

/**
 * Normalisasi nomor anggota dengan menghapus titik (.) dan spasi ( ),
 * serta mengubah huruf menjadi huruf kapital (uppercase).
 * Contoh: "M. 23 36 381 .CN" -> "M2336381CN"
 */
export function normalizeNomorAnggota(no: string): string {
  if (!no) return "";
  return no.replace(/[\s.]/g, "").toUpperCase();
}

/**
 * Mengamankan password menggunakan standard PBKDF2 dengan salt acak 16-byte
 * dan 1000 iterasi algoritma SHA-512.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Memverifikasi kecocokan password dengan hash yang tersimpan di database.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, hash] = storedHash.split(":");
    if (!salt || !hash) return false;
    const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return hash === verifyHash;
  } catch (e) {
    console.error("Gagal memverifikasi password:", e);
    return false;
  }
}

/**
 * Menghasilkan kode OTP 6 digit acak yang aman secara kriptografis.
 */
export function generateOTP(): string {
  return Math.floor(100000 + crypto.randomInt(900000)).toString();
}
