const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

console.log("=== Memulai Import Database Anggota ===");

// 1. Membaca dan memparsing .env.local
const envPath = path.join(__dirname, "../.env.local");
if (!fs.existsSync(envPath)) {
  console.error("Kesalahan: File .env.local tidak ditemukan! Pastikan Anda sudah membuatnya.");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf8");
const env = {};
envContent.split("\n").forEach((line) => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return;
  const index = trimmed.indexOf("=");
  if (index !== -1) {
    const key = trimmed.substring(0, index).trim();
    const val = trimmed.substring(index + 1).trim();
    env[key] = val;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Kesalahan: NEXT_PUBLIC_SUPABASE_URL atau NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY tidak didefinisikan di .env.local");
  process.exit(1);
}

console.log("Menghubungkan ke Supabase di URL:", supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

// 2. Membaca dan memparsing nomor anggota.csv
const csvPath = path.join(__dirname, "../public/nomor anggota.csv");
if (!fs.existsSync(csvPath)) {
  console.error("Kesalahan: File public/nomor anggota.csv tidak ditemukan!");
  process.exit(1);
}

const csvContent = fs.readFileSync(csvPath, "utf8");
const lines = csvContent.split(/\r?\n/);
console.log(`Membaca CSV: Ditemukan total ${lines.length} baris.`);

const members = [];
// Baris pertama (index 0) adalah header: "NAMA ANGGOTA;NAMA LAPANGAN;NOMOR ANGGOTA"
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  const parts = line.split(";");
  if (parts.length >= 3) {
    const nama_anggota = parts[0].trim();
    const nama_lapangan = parts[1].trim() || null;
    const nomor_anggota = parts[2].trim();

    // Normalisasi: hilangkan spasi dan titik, ubah ke uppercase (misal: "M2336381CN")
    const nomor_anggota_normalized = nomor_anggota.replace(/[\s.]/g, "").toUpperCase();

    // Pastikan nama_anggota dan nomor_anggota tidak kosong
    if (nama_anggota && nomor_anggota_normalized) {
      members.push({
        nama_anggota,
        nama_lapangan,
        nomor_anggota,
        nomor_anggota_normalized,
      });
    }
  }
}

console.log(`Hasil parsing CSV: Siap mengunggah ${members.length} data anggota.`);

// 3. Mengunggah ke Supabase secara batch (ukuran batch = 100)
async function uploadData() {
  const chunkSize = 100;
  let successCount = 0;

  for (let i = 0; i < members.length; i += chunkSize) {
    const chunk = members.slice(i, i + chunkSize);
    console.log(`Mengunggah batch ${Math.floor(i / chunkSize) + 1} (${chunk.length} data)...`);

    const { data, error } = await supabase
      .from("anggota")
      .upsert(chunk, { onConflict: "nomor_anggota_normalized" });

    if (error) {
      console.error(`Gagal mengunggah batch ke-${Math.floor(i / chunkSize) + 1}:`, error.message);
      console.error("Detail error:", error);
      console.log("\n[TIP] Pastikan Anda sudah membuat tabel 'anggota' di Dashboard Supabase SQL Editor dengan struktur SQL berikut:");
      console.log(`
CREATE TABLE IF NOT EXISTS anggota (
    id BIGSERIAL PRIMARY KEY,
    nama_anggota TEXT NOT NULL,
    nama_lapangan TEXT,
    nomor_anggota TEXT NOT NULL,
    nomor_anggota_normalized TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
      `);
      process.exit(1);
    }

    successCount += chunk.length;
  }

  console.log(`\n🎉 SELESAI! Berhasil mengunggah ${successCount} dari ${members.length} data anggota ke Supabase.`);
}

uploadData().catch((err) => {
  console.error("Error tidak terduga:", err);
});
