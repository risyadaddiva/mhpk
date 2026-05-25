import PublicLayout from "@/components/layout/PublicLayout";
import { History, Target, Users, Sparkles, Compass, ShieldAlert, Heart, Laugh, Award, Leaf, HeartHandshake } from "lucide-react";

export default function ProfilPage() {
  const hakikatList = [
    { text: "MAHAPEKA itu sahabat sesama manusia dan saudara bagi tiap-tiap MAHAPEKA lainnya.", icon: Sparkles, color: "text-red-500 bg-red-50 dark:bg-red-950/30" },
    { text: "MAHAPEKA itu sabar dan riang gembira.", icon: Laugh, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30" },
    { text: "MAHAPEKA itu sanggup menolong sesama hidup.", icon: HeartHandshake, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" },
    { text: "MAHAPEKA itu terbuka, jujur dan ikhlas dalam berbakti.", icon: Award, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
    { text: "MAHAPEKA itu berjiwa petualang.", icon: Compass, color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30" },
    { text: "MAHAPEKA itu mencintai kelestarian alam.", icon: Leaf, color: "text-orange-500 bg-orange-50 dark:bg-orange-950/30" },
  ];

  return (
    <PublicLayout>
      <div className="bg-neutral-50 dark:bg-neutral-950 py-16 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-4">
              Profil MAHAPEKA
            </h1>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-6" />
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Mahasiswa Pencinta Kelestarian Alam UIN Sunan Gunung Djati Bandung
            </p>
          </div>

          {/* Sejarah Section */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 md:p-12 shadow-sm border border-neutral-200 dark:border-neutral-800 mb-12 transition-colors duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500 rounded-xl">
                <History className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Sejarah Pendirian</h2>
            </div>
            <div className="prose dark:prose-invert prose-neutral max-w-none text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-6">
              <p>
                <strong>MAHAPEKA</strong> atau Mahasiswa Pencinta Kelestarian Alam Universitas Islam Negeri (UIN) Sunan Gunung Djati Bandung, pertama kali didirikan pada tanggal <strong>07 Maret 1984</strong>, bertepatan dengan tanggal <strong>4 Jumadil Akhir 1404 H</strong>, di Bandung. Berawal dari keinginan untuk dapat berkumpul dan berkelompok dengan orang-orang yang memiliki hobi dan tujuan yang sama. Keinginan atau hasrat tersebut selain karena hobi petualangan, juga terdorong oleh kenyataan kondisi kampus saat itu yang memang sudah saatnya memiliki orang-orang yang sadar dan peduli terhadap lingkungan sekitar, khususnya lingkungan kampus Universitas Islam Negeri Sunan Gunung Djati Bandung. Saat itulah timbul suatu gagasan untuk memformulasikan hasrat tersebut dalam suatu wadah yang konstruktif dan terorganisir.
              </p>
              <p>
                Menyadari hal itu, maka beberapa gelintir Mahasiswa Universitas Islam Negeri (UIN) Sunan Gunung Djati Bandung memprakarsai untuk membentuk suatu kelompok, yang pada waktu kemudian berdirilah organisasi yang bernotabene Pecinta Alam, maka saat itulah 7 Maret 1984, lahir embrio organisasi Pecinta Alam, yang sampai saat ini menamakan diri MAHAPEKA.
              </p>
              <p>
                Pada awalnya MAHAPEKA hanya melakukan kegiatan-kegiatan berupa perambahan hutan dan penjelajahan gunung-gunung, kemudian dilanjutkan dengan kegiatan kebersihan dan penghijauan di lingkungan kampus dan kawasan hutan. Alhamdulillah sampai saat ini partisipasi MAHAPEKA dalam upaya kebersihan, keindahan kampus dan upaya penghijauan lahan kritis masih tetap berlangsung dan Insya Allah akan senantiasa terus ditumbuhkan di hati setiap anggota MAHAPEKA.
              </p>
              <p>
                MAHAPEKA, dalam merefleksikan kegiatan-kegiatannya mencoba menjadikan alam terbuka sebagai arena Dakwah disamping sebagai tempat bertafakur. Melalui alam terbuka, MAHAPEKA mencoba merealisasikan ayat-ayat Allah yang menyebutkan bahwa <em>"Manusia itu diciptakan sebagai khalifah di muka bumi"</em> (Al-Baqarah:30, Shaad:26) dan sebagai pemakmur bumi (Hud:61). Untuk itu, biarkan kami berbicara tentang misi, penghayatan, dan pengalaman agama dengan cara kami sendiri.
              </p>
              <p>
                Waktu berjalan bagai air di sungai yang tiada mengenal henti, dan MAHAPEKA pun terus melangkahkan kaki-kakinya yang kekar ke arah yang lebih jauh. Berbagai kegiatan selalu gencar dilaksanakan, mulai dari yang sifatnya rutin (yakni Tata Ruang Kampus dan Penghijauan dimanapun dan siapa saja) sampai pada kegiatan-kegiatan yang sifatnya pengembangan minat dan bakat serta petualangan (seperti Gunung Hutan, Panjat Tebing, Olahraga Arus Deras, Susur Goa, Konservasi, dst) dan peningkatan kualitas anggota (seperti pengiriman anggota MAHAPEKA untuk mengikuti pelatihan atau sekolah SAR, Gunung Hutan, Panjat Tebing, Olahraga Arus Deras, Susur Gua, KSDA, Seminar Lingkungan maupun pendidikan di tingkat nasional). Selain itu juga MAHAPEKA memiliki kegiatan rutinan setiap tahunnya dari tahun 1990 (yakni Bakti Sosial) dan desa binaan di kawasan Banten (daerah kawasan pemukiman Baduy Luar).
              </p>
              <p>
                Jaringan yang dibangun oleh MAHAPEKA sampai saat ini meliputi internal dan external kampus diantaranya ikut serta dalam berbagai forum dan kegiatan, bersama FP2KC (Forum Pemuda Peduli Karst Citatah), FK3I (Forum Komunikasi Kader Konservasi Indonesia), KBPA (Keluarga Besar Pecinta Alam Bandung Raya), FPTI KBB (Federasi Panjat Tebing Indonesia), Laskar Bumi BJB, Lingkar Hijau, dll.
              </p>
            </div>
          </div>

          {/* Motto Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-8 md:p-12 text-center text-white mb-12 shadow-lg">
            <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full border border-white/20">Motto MAHAPEKA</span>
            <blockquote className="mt-6 text-2xl md:text-3xl font-extrabold italic tracking-wide">
              " BIARKAN KAMI BERKIPRAH DENGAN CARA KAMI SENDIRI "
            </blockquote>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Visi */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-500 rounded-xl">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Visi</h2>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
                Terciptanya mahasiswa/i Universitas Islam Negeri Sunan Gunung Djati Bandung yang mampu meningkatkan profesionalisme organisasi peka terhadap masalah sosial dan lingkungan hidup serta melestarikan alam bagi kesejahteraan umat manusia.
              </p>
            </div>

            {/* Misi */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500 rounded-xl">
                  <Users className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Misi</h2>
              </div>
              <ol className="list-decimal list-inside text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-3">
                <li>
                  Menghimpun, membina, menyalurkan minat dan bakat mahasiswa UIN Sunan Gunung Djati Bandung, sesuai dengan tujuan MAHAPEKA UIN Sunan Gunung Djati Bandung serta peraturan perundang-undangan yang berlaku.
                </li>
                <li>
                  Membangun potensi kreatifitas keilmuan, kealaman, sosial dan budaya.
                </li>
                <li>
                  Berperan aktif dalam dunia kepecinta-alaman dan kemahasiswaan untuk menopang pembangunan berwawasan lingkungan dengan partisipasi yang konstruktif, kreatif dan inovatif.
                </li>
              </ol>
            </div>
          </div>

          {/* Hakikat MAHAPEKA */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 md:p-12 shadow-sm border border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">Hakikat MAHAPEKA</h2>
              <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mt-2">
                UNIVERSITAS ISLAM NEGERI SUNAN GUNUNG DJATI BANDUNG
              </p>
              <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mt-4" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {hakikatList.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={index}
                    className="flex gap-4 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/20 hover:border-orange-500/30 transition-all duration-300"
                  >
                    <div className={`p-3 rounded-xl shrink-0 h-12 w-12 flex items-center justify-center ${item.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex items-center">
                      <p className="text-neutral-700 dark:text-neutral-300 font-medium text-sm leading-relaxed">
                        <span className="font-bold text-orange-500 mr-1.5">{index + 1}.</span> {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
