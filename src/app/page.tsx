import PublicLayout from "@/components/layout/PublicLayout";
import Link from "next/link";
import { ArrowRight, Mountain, Waves } from "lucide-react";

const CaveIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    viewBox="0 0 291 297" 
    fill="currentColor" 
    {...props}
  >
    <g transform="matrix(1,0,0,1,-0.889313,12.166042)">
      <path d="M288.999,217.5L288.999,242.5C288.882,242.565 288.497,241.822 283.852,245.907C282.276,247.292 280.739,248.722 279.127,250.066C275.227,253.319 271.382,251.557 262.367,248.974C247.812,244.804 247.636,246.183 232.5,246.062C226.273,246.013 227.033,248.197 218.306,253.159C217.157,253.812 217.189,254.932 185.497,254.694C173.941,254.607 185.227,235.44 182.376,233.8C182.015,233.592 110.882,233.764 105.5,233.709C103.65,233.69 100.117,232.244 102.275,236.589C104.419,240.907 93.934,248.884 86.5,248.887C63.116,248.898 62.999,249.22 53.599,246.145C51.432,245.437 34.508,250.762 29.577,251.822C28.765,251.996 28.342,253.24 7.683,244.078C2.447,241.756 3.18,239.307 5.803,215.532C6.492,209.286 8.522,210.439 11.276,207.319C12.429,206.012 21.711,142.102 23.348,133.47C24.688,126.407 27.361,128.334 46.568,118.613C50.695,116.524 49.828,89.866 58.54,93.413C60.547,94.23 62.969,95.216 56.039,120.381C55.076,123.878 54.735,124.206 36.281,133.047C30.866,135.642 31.432,136.517 30.588,142.513C22.943,196.788 19.283,201.272 23.426,199.318C28.709,196.828 29.034,197.646 46.434,201.764C57.209,204.314 55.803,206.751 62.012,215.838C65.133,220.406 66.206,217.624 70.407,215.311C74.699,212.948 88.097,220.668 90.437,220.284C92.423,219.958 102.275,173.864 103.841,170.657C105.601,167.056 150.169,136.462 150.453,136.368C154.009,135.188 154.835,135.909 185.033,167.954C190.815,174.09 192.232,186.602 189.167,189.06C182.464,194.436 181.378,176.822 179.393,174.586C177.705,172.683 152.683,146.795 152.419,146.626C150.326,145.284 134.358,158.681 113.762,172.874C111.047,174.745 110.837,175.082 102.063,212.399C99.931,221.469 96.576,225.155 103.5,225.15C181.712,225.091 181.686,225.726 188.459,225.152C191.889,224.862 187.198,212.186 186.115,203.55C185.407,197.9 190.478,197.274 192.369,198.694C193.616,199.631 194.44,200.249 197.607,217.479C198.722,223.549 201.034,218.884 203.829,216.971C207.635,214.366 209.564,217.665 211.487,217.431C213.785,217.151 213.242,216.166 231.031,196.088C235.711,190.805 239.71,194.9 247.409,198.683C251.211,200.551 258.845,199.593 260.386,199.997C264.497,201.078 276.072,211.75 277.325,212.905C279.72,215.114 278.891,209.759 278.845,209.462C278.518,207.348 270.052,145.737 270.029,145.599C269.424,142.089 242.765,123.638 239.841,118.323C231.064,102.365 233.391,100.593 234.625,99.653C240.077,95.5 243.71,106.928 243.894,107.305C248.444,116.664 249.44,115.952 257.303,122.734C275.707,138.607 277.671,137.66 278.562,144.492C279.312,150.246 287.888,215.984 287.979,216.415C288.081,216.901 288.897,217.014 288.999,217.5ZM260.627,240.047C271.122,242.651 272.764,246.165 280.096,238.166C281.071,237.102 276.291,222.874 272.379,219.645C258.718,208.366 258.068,208.352 256.509,208.32C247.039,208.125 247.055,207.701 238.48,203.544C235.607,202.151 233.647,205.903 223.807,216.774C223.572,217.034 218.239,222.176 219.587,223.434C220.799,224.566 222.228,225.441 223.536,226.461C226.686,228.92 224.374,237.793 229.493,237.829C248.814,237.966 248.926,236.851 260.627,240.047ZM61.599,240.172C65.88,240.741 96.738,242.744 91.374,235.591C85.631,227.935 85.561,227.672 76.528,224.421C75.313,223.984 71.565,222.635 61.645,230.679C60.166,231.878 58.769,236.94 58.61,237.516C58.331,238.527 61.313,240.029 61.599,240.172ZM13.922,217.571C12.598,230.272 10.6,236.187 14.677,238.085C31.722,246.022 32.273,242.427 32.466,242.376C40.381,240.301 49.32,238.725 50.207,236.371C52.629,229.941 51.655,229.439 56.087,224.169C56.817,223.302 57.527,222.458 49.09,211.851C48.2,210.732 29.809,205.199 26.411,207.365C15.089,214.581 14.391,216.369 13.922,217.571ZM218.094,235.59C216.832,231.4 216.47,231.53 212.746,229.118C208.414,226.312 207.834,224.61 203.855,227.903C192.665,237.16 188.076,240.595 189.526,245.489C190.05,247.258 212.213,246.454 213.673,245.984C220.09,243.92 219.291,242.198 218.094,235.59Z" />
    </g>
    <g transform="matrix(1,0,0,1,-0.889313,12.166042)">
      <path d="M146.516,17.941C150.293,18.664 150.133,19.14 185.719,37.078C215.744,52.214 216.853,51.428 219.792,57.36C227.835,73.593 227.651,73.61 231.863,82.321C232.204,83.026 236.716,92.357 229.476,91.808C223.545,91.357 214.949,61.833 210.208,58.986C210.147,58.949 150.358,28.638 148.387,27.778C145.828,26.662 145.812,28.124 113.224,50.073C98.796,59.791 89.77,58.569 70.603,64.826C65.871,66.371 67.402,83.869 61.587,84.905C54.964,86.085 56.446,78.686 60.787,61.586C62.001,56.803 70.982,55.913 95.398,49.122C111.528,44.636 135.089,22.204 146.516,17.941Z" />
    </g>
  </svg>
);

const CarabinerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    viewBox="0 0 60 60" 
    fill="currentColor" 
    {...props}
  >
    <path d="M47.323,5.28C44.835,1.925,41.012,0,36.834,0h-9.679c-7.2,0-13.059,5.858-13.059,13.059v2.964c-1.12,0.115-2,1.053-2,2.203
      v1.809c-1.128,0.168-2,1.134-2,2.309v3.313c0,0.501,0.161,0.963,0.429,1.344c-0.268,0.381-0.429,0.843-0.429,1.344v3.313
      c0,1.175,0.872,2.141,2,2.309v8.809c0,1.15,0.88,2.088,2,2.203v1.964C14.097,54.142,19.955,60,27.155,60
      c5.791,0,10.813-3.723,12.501-9.281l9.674-33.867C50.543,12.854,49.812,8.636,47.323,5.28z M14.097,18.226
      c0-0.125,0.102-0.226,0.226-0.226h5.549c0.124,0,0.226,0.101,0.226,0.226V20h-6V18.226z M14.097,42.774V34h6v8.774
      c0,0.125-0.102,0.226-0.226,0.226h-5.549C14.198,43,14.097,42.899,14.097,42.774z M12.097,31.656v-3.313
      c0-0.189,0.154-0.344,0.344-0.344h9.312c0.189,0,0.344,0.154,0.344,0.344v3.313c0,0.189-0.154,0.344-0.344,0.344H12.44
      C12.251,32,12.097,31.846,12.097,31.656z M20.097,44.977c1.12-0.115,2-1.053,2-2.203v-8.809c1.128-0.168,2-1.134,2-2.309v-3.313
      c0-0.501-0.161-0.963-0.429-1.344c0.268-0.381,0.429-0.843,0.429-1.344v-3.313c0-1.175-0.872-2.141-2-2.309v-1.809
      c0-1.15-0.88-2.088-2-2.203v-2.964C20.097,9.167,23.263,6,27.155,6h9.679c2.259,0,4.325,1.041,5.67,2.854
      c1.345,1.814,1.74,4.094,1.08,6.27l-9.692,33.93C32.992,52.013,30.285,54,27.155,54c-3.893,0-7.059-3.167-7.059-7.059V44.977z
      M12.097,22.344c0-0.189,0.154-0.344,0.344-0.344h9.312c0.189,0,0.344,0.154,0.344,0.344v3.313c0,0.189-0.154,0.344-0.344,0.344
      H12.44c-0.189,0-0.344-0.154-0.344-0.344V22.344z M47.411,16.287l-9.674,33.867C36.312,54.847,32.06,58,27.155,58
      c-6.098,0-11.059-4.961-11.059-11.059V45h2v1.941c0,4.995,4.063,9.059,9.059,9.059c4.017,0,7.493-2.557,8.655-6.379l9.692-33.931
      c0.841-2.773,0.333-5.699-1.393-8.026C42.385,5.335,39.732,4,36.834,4h-9.679c-4.995,0-9.059,4.063-9.059,9.059V16h-2v-2.941
      C16.097,6.961,21.058,2,27.155,2h9.679c3.538,0,6.775,1.63,8.883,4.472C47.824,9.314,48.443,12.886,47.411,16.287z" />
  </svg>
);

export default function Home() {
  const divisions = [
    { title: "Gunung Hutan", icon: Mountain, desc: "Eksplorasi dan navigasi darat di alam liar.", color: "bg-emerald-500" },
    { title: "Susur Goa", icon: CaveIcon, desc: "Eksplorasi keindahan dan misteri di bawah tanah.", color: "bg-neutral-600" },
    { title: "Panjat Tebing", icon: CarabinerIcon, desc: "Menaklukkan tebing vertikal dengan teknik dan kekuatan.", color: "bg-orange-500" },
    { title: "ORAD", icon: Waves, desc: "Olahraga Arus Deras menyusuri sungai-sungai menantang.", color: "bg-blue-500" },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Placeholder background with gradient overlay */}
        <div className="absolute inset-0 bg-neutral-900">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-900/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 text-orange-400 text-sm font-semibold tracking-wider mb-4 border border-orange-500/30">
              MAHASISWA PENCINTA KELESTARIAN ALAM BANDUNG
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Biarkan kami berkiprah dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">cara kami sendiri</span>.
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl leading-relaxed">
              Sebuah wadah bagi mahasiswa yang memiliki kepedulian terhadap alam dan lingkungan, serta semangat petualangan yang tak pernah padam.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/profil" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 hover:gap-4 shadow-lg shadow-orange-500/30"
              >
                Kenali Kami Lebih Dekat <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/berita" 
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
              >
                Kegiatan Terbaru
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Divisions Section */}
      <section className="py-24 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">Divisi MAHAPEKA</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full mb-6" />
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
              Empat pilar utama kegiatan alam bebas yang menjadi fokus pembinaan dan penjelajahan anggota MAHAPEKA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {divisions.map((div, index) => (
              <div 
                key={index} 
                className="group p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-xl ${div.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">{div.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                  {div.desc}
                </p>
                <Link href="/divisi" className="inline-flex items-center text-orange-500 font-medium hover:text-orange-600 transition-colors group-hover:underline underline-offset-4">
                  Pelajari <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini CTA / Info Section */}
      <section className="py-20 relative overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-40 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-0 -right-40 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Mountain className="w-16 h-16 text-orange-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Jadilah Bagian dari Sejarah</h2>
          <p className="text-xl text-neutral-300 mb-10">
            MAHAPEKA selalu membuka pintu bagi jiwa-jiwa petualang yang peduli pada kelestarian alam dan lingkungan hidup.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
