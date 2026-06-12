import React, { useState, useMemo } from "react";
import { ShoppingBag, Check, HelpCircle, Search, Leaf, Sparkles, Tag, Info, AlertTriangle } from "lucide-react";
import ProceduralFlower from "./ProceduralFlower";
import { DigitalFlower } from "../types";

interface MasterpieceStudioProps {
  onAddCustomToCart: (flower: DigitalFlower) => void;
}

export interface MarketFlower {
  id: string;
  name: string;
  scientificName: string;
  category: "kesme" | "saksi" | "egzotik";
  subtitle: string;
  price: string;
  petalCount: number;
  symmetry: number;
  glowness: number;
  hue: string;
  species: "rose" | "tulip" | "orchid" | "hybrid";
  scentProfile: string;
  lore: string;
  careGuide: string;
  classTag: string;
  image: string;
}

const FLOWERS_DATA: MarketFlower[] = [
  // --- KATEGORİ 1: Kesme Çiçekler ---
  {
    id: "market-rose",
    name: "Gül (Rosa)",
    scientificName: "Rosa",
    category: "kesme",
    subtitle: "Aşkın ve zarafetin zamansın sembolü.",
    price: "150 ₺",
    petalCount: 16,
    symmetry: 0.95,
    glowness: 0.8,
    hue: "#dc2626",
    species: "rose",
    scentProfile: "Geleneksel Isparta gülü; yoğun, tatlı ve pudramsı esans dalgaları.",
    lore: "Yüzyıllardır insanlık tarihinin en zarif duygularına şahitlik eden, mitolojide Afrodit'in gözyaşlarıyla sulanan lüks kraliçe.",
    careGuide: "Vazo suyunu her gün tazeleyin. Sap altlarını 45 derecelik açıyla keserek vazoya yerleştirin.",
    classTag: "İmza Kesme Serisi",
    image: "/src/assets/images/velvet_rose_1781297291083.jpg"
  },
  {
    id: "market-carnation",
    name: "Karanfil (Dianthus caryophyllus)",
    scientificName: "Dianthus caryophyllus",
    category: "kesme",
    subtitle: "Hem çok dayanıklıdır hem de rengarenk çeşitleriyle aranjmanların vazgeçilmezidir.",
    price: "60 ₺",
    petalCount: 24,
    symmetry: 0.88,
    glowness: 0.5,
    hue: "#f43f5e",
    species: "hybrid",
    scentProfile: "Hafif karanfil tomurcuğu baharatılığı, taze yeşil yaprak notaları.",
    lore: "Yunan mitolojisinde 'Tanrıların Çiçeği' olarak da bilinen Dianthus, sadakatin değişmez simgesidir.",
    careGuide: "Direkt güneş ışığından koruyun. Vazo suyuna çeyrek çay kaşığı şeker eklemek canlılığını korur.",
    classTag: "Premium Dolgu Sınıfı",
    image: "/src/assets/images/carnation_flower_1781299958744.jpg"
  },
  {
    id: "market-tulip",
    name: "Lale (Tulipa)",
    scientificName: "Tulipa",
    category: "kesme",
    subtitle: "Özellikle ilkbahar aylarında zarafetiyle büyüleyen, modern ve şık bir tercih.",
    price: "100 ₺",
    petalCount: 6,
    symmetry: 1.0,
    glowness: 0.7,
    hue: "#f59e0b",
    species: "tulip",
    scentProfile: "Taze kesilmiş çimen, çiğ damlası ve narin bahar esintisi.",
    lore: "Doğunun gizemli bahçelerinden Amsterdam kanallarına uzanan yolculuğuyla, zarafet ve lüksün asırlık sembolü.",
    careGuide: "Çok soğuk veya buzlu su tercih eder. Sapları düz kesin ve vazo hizasını az tutun.",
    classTag: "Saray Koleksiyonu",
    image: "/src/assets/images/silk_tulip_1781297310383.jpg"
  },
  {
    id: "market-lily",
    name: "Zambak / Lilyum (Lilium)",
    scientificName: "Lilium",
    category: "kesme",
    subtitle: "Büyük, gösterişli çiçekleri and büyüleyici kokusuyla premium buketlerin yıldızıdır.",
    price: "250 ₺",
    petalCount: 8,
    symmetry: 0.92,
    glowness: 0.9,
    hue: "#fdf2f8",
    species: "orchid",
    scentProfile: "Zengin, baş döndürücü egzotik tatlı parfüm notası.",
    lore: "Asaleti ve saflığı taçlandıran devasa yapraklarıyla, kraliyet saraylarının vazgeçilmez başküratörü.",
    careGuide: "Polen keselerini dikkatlice makasla alın. Bu işlem yaprakların sararmasını önler.",
    classTag: "Haute Couture Buketçi",
    image: "/src/assets/images/lily_flower_1781299973326.jpg"
  },
  {
    id: "market-chrysanthemum",
    name: "Krizantem / Kasımpatı (Chrysanthemum)",
    scientificName: "Chrysanthemum",
    category: "kesme",
    subtitle: "Dolgun yapısı ve zengin renk seçenekleriyle buketlere hacim katar.",
    price: "80 ₺",
    petalCount: 28,
    symmetry: 0.9,
    glowness: 0.6,
    hue: "#db2777",
    species: "hybrid",
    scentProfile: "Hafif otsu, odunsu ve sonbahar yağmurunu andıran toprak aroması.",
    lore: "Uzak Doğu'da uzun ömürlü gelişim ve yenilenmenin simgesi; her yaprağı bir şans mühürüdür.",
    careGuide: "Yaprakların su seviyesinin altında kalmamasına dikkat edin. Suyunu iki günde bir değiştirin.",
    classTag: "Zanaatkar Dolgu",
    image: "/src/assets/images/chrysanthemum_flower_1781299984875.jpg"
  },
  {
    id: "market-gerbera",
    name: "Gerbera (Gerbera jamesonii)",
    scientificName: "Gerbera jamesonii",
    category: "kesme",
    subtitle: "Büyük, renkli papatyalara benzeyen yapısıyla neşeli ve enerjik aranjmanlar için birebirdir.",
    price: "90 ₺",
    petalCount: 18,
    symmetry: 0.98,
    glowness: 0.75,
    hue: "#ea580c",
    species: "hybrid",
    scentProfile: "Son derece hafif taze kır aroması, nötr koku profili.",
    lore: "Sıcak güneş ışınlarını andıran dairesel yapraklarıyla, bulunduğu her odaya neşe ve enerji saçar.",
    careGuide: "Hassas sap yapısı nedeniyle vazo suyunu az doldurun, sapın çürümesini engelleyin.",
    classTag: "Canlı Enerji Sınıfı",
    image: "/src/assets/images/gerbera_flower_1781299996513.jpg"
  },
  {
    id: "market-chamomile",
    name: "Papatya (Matricaria chamomilla)",
    scientificName: "Matricaria chamomilla",
    category: "kesme",
    subtitle: "Doğallığı, samimiyeti ve masumiyeti simgeleyen, her dönem alıcısı olan klasik.",
    price: "70 ₺",
    petalCount: 14,
    symmetry: 0.95,
    glowness: 0.65,
    hue: "#eab308",
    species: "hybrid",
    scentProfile: "Yumuşak elma tatlılığı içeren yatıştırıcı papatya çayı kokusu.",
    lore: "Baharın gelişiyle kırlara yayılan çocuksu saflık ve duruluğun, doğanın uyanışına attığı neşeli imza.",
    careGuide: "Güneş alan aydınlık ortamları sever, vazo suyunu sık sık değiştirmek ömrünü iki katına çıkarır.",
    classTag: "Bölgeler Arası Doğal",
    image: "/src/assets/images/chamomile_flower_1781300010160.jpg"
  },
  {
    id: "market-hydrangea",
    name: "Ortanca (Hydrangea)",
    scientificName: "Hydrangea",
    category: "kesme",
    subtitle: "Devasa ve yoğun çiçek toplarıyla hem tek başına hem de büyük aranjmanlarda çok lüks durur.",
    price: "400 ₺",
    petalCount: 30,
    symmetry: 0.85,
    glowness: 0.85,
    hue: "#2563eb",
    species: "rose",
    scentProfile: "Hafif nemli orman altı serinliği, taze yağmur esansı.",
    lore: "Adını antik su tanrıçalarından alan, toprağın asit oranına göre rengi mordan maviye dönen büyüleyici orman simyası.",
    careGuide: "Suyu çok sever. Yapraklarına temiz su püskürtmek taze kalmasını destekler.",
    classTag: "Lüks Küresel Formlar",
    image: "/src/assets/images/underwater_purple_1781297326251.jpg"
  },
  {
    id: "market-peony",
    name: "Şakayık (Paeonia)",
    scientificName: "Paeonia",
    category: "kesme",
    subtitle: "Bahar döneminde açan, katmerli yapısıyla gelin buketlerinin ve özel tasarımların en gözde çiçeğidir.",
    price: "350 ₺",
    petalCount: 22,
    symmetry: 0.9,
    glowness: 0.8,
    hue: "#f472b6",
    species: "rose",
    scentProfile: "Romantik pudralı pembe gül aroması ve narenciye alt notaları.",
    lore: "Tarihte Çin imparatorlarının saray bahçelerini süsleyen, zenginlik ve onurun en üst kademe simgesi.",
    careGuide: "Tomurcuklar açılmıyorsa ılık suda bekleterek yaprakların nefes almasını sağlayabilirsiniz.",
    classTag: "Saray Başkahramanı",
    image: "/src/assets/images/peony_flower_1781300021366.jpg"
  },
  {
    id: "market-gypsophila",
    name: "Gipsofilya / Cipso (Gypsophila)",
    scientificName: "Gypsophila",
    category: "kesme",
    subtitle: "Halk arasında 'bebek nefesi' de denir; diğer ana çiçeklerin arasını dolduran mini beyaz çiçeklerdir.",
    price: "90 ₺",
    petalCount: 32,
    symmetry: 0.8,
    glowness: 0.7,
    hue: "#f1f5f9",
    species: "hybrid",
    scentProfile: "Hafif ve nötr balımsı tatlı kır kokusu.",
    lore: "Büyük çiçeklerin sert tonlarını kıran, aranjmanlara bulutsu bir zarafet ve rüya katmanı ekleyen narin doku.",
    careGuide: "Kuruduktan sonra da estetiğini kaybetmez, vazo suyu bittikten sonra kuru çiçek olarak saklanabilir.",
    classTag: "Düşsel Tamamlayıcı",
    image: "/src/assets/images/gypsophila_flower_1781300041265.jpg"
  },

  // --- KATEGORİ 2: Saksı ve İç Mekan Çiçekleri ---
  {
    id: "market-orchid",
    name: "Orkide (Phalaenopsis)",
    scientificName: "Phalaenopsis",
    category: "saksi",
    subtitle: "Çiçekçilerde en çok satılan, asaleti ve lüksü temsil eden hediye saksı çiçeği.",
    price: "750 ₺",
    petalCount: 6,
    symmetry: 0.94,
    glowness: 0.9,
    hue: "#a855f7",
    species: "orchid",
    scentProfile: "Hafif vanilyamsı, egzotik ve tatlı koku profili.",
    lore: "Tropik ağaç gövdelerinde asılı kalarak havadan beslenen, doğadaki en asil ve gizemli üreme taktiklerine sahip kraliçe.",
    careGuide: "Haftada bir kez saksıyı daldırma sulama yöntemiyle sulayın. Şeffaf saksıda köklerin ışık almasını sağlayın.",
    classTag: "Elite Salon Saksısı",
    image: "/src/assets/images/featured_orchid_1781297268537.jpg"
  },
  {
    id: "market-anthurium",
    name: "Antoryum / Flamingo Çiçeği (Anthurium)",
    scientificName: "Anthurium",
    category: "saksi",
    subtitle: "Plastikimsi parlak kırmızı yapraklarıyla çok dayanıklı ve dikkat çekici bir salon bitkisidir.",
    price: "450 ₺",
    petalCount: 5,
    symmetry: 0.85,
    glowness: 0.75,
    hue: "#ef4444",
    species: "orchid",
    scentProfile: "Yatay spatasında koku barındırmaz, tamamen nötr dikey duruş odaklıdır.",
    lore: "Kalp şeklindeki parlak spatası ile misafirperverlik ve tükenmez yaşama sevincinin tropikal fırça darbesi.",
    careGuide: "Yaprakları nemli bezle silin. Dolaylı ışık alan sıcak bir köşe onun için idealdir.",
    classTag: "Tropikal Salon Grubu",
    image: "/src/assets/images/anthurium_flower_1781300053452.jpg"
  },
  {
    id: "market-peace-lily",
    name: "Barış Çiçeği / Yelken Çiçeği (Spathiphyllum)",
    scientificName: "Spathiphyllum",
    category: "saksi",
    subtitle: "Parlak yeşil yaprakları ve beyaz zarif çiçekleriyle hem bakımı kolaydır hem de havayı temizler.",
    price: "350 ₺",
    petalCount: 4,
    symmetry: 0.9,
    glowness: 0.8,
    hue: "#ffffff",
    species: "tulip",
    scentProfile: "Sabah saatlerinde hissedilen taze sabunsu temizlik esansı.",
    lore: "NASA tarafından havayı en çok temizleyen bitkilerden biri seçilen, barış ve huzuru simgeleyen yelken çiçekleri.",
    careGuide: "Toprağı kurudukça sulayın. Yaprakları bükülürse susuz kaldığını haber veriyor demektir.",
    classTag: "Hava Temizleyici",
    image: "/src/assets/images/peace_lily_flower_1781300066229.jpg"
  },
  {
    id: "market-poinsettia",
    name: "Atatürk Çiçeği / Ponsetya (Euphorbia pulcherrima)",
    scientificName: "Euphorbia pulcherrima",
    category: "saksi",
    subtitle: "Özellikle kış aylarına ve yılbaşı dönemine kırmızı-yeşil yapraklarıyla damga vurur.",
    price: "300 ₺",
    petalCount: 12,
    symmetry: 0.92,
    glowness: 0.7,
    hue: "#dc2626",
    species: "rose",
    scentProfile: "Hafif otsu taze süt reçinesi aroması.",
    lore: "Gazi Mustafa Kemal Atatürk'ün ülkemize getirilip yayılmasına öncülük ettiği, asil kış yapraklarına sahip ulusal miras.",
    careGuide: "Aşırı sulamadan kaçının, kök çürümesine hassastır. Cereyandan kesinlikle koruyun.",
    classTag: "Kış Güzeli Sınıfı",
    image: "/src/assets/images/poinsettia_flower_1781300079426.jpg"
  },
  {
    id: "market-cyclamen",
    name: "Sıklamen (Cyclamen)",
    scientificName: "Cyclamen",
    category: "saksi",
    subtitle: "Soğuk havayı seven, sonbahar ve kış aylarında dükkanı renklendiren canlı saksı çiçeği.",
    price: "180 ₺",
    petalCount: 8,
    symmetry: 0.95,
    glowness: 0.6,
    hue: "#db2777",
    species: "orchid",
    scentProfile: "Hafif taze nergis ve çuha çiçeği esintisi.",
    lore: "Karların altından bile fışkırabilen mucizevi yumrulu gövdesiyle, zor şartlarda baş kaldıran narin direnç.",
    careGuide: "Suyu üstten değil, saksı altlığından verin. Sıcak odalardan uzak tutup balkonda serinletin.",
    classTag: "Dirençli Kış Yumrusu",
    image: "/src/assets/images/cyclamen_flower_1781300091498.jpg"
  },
  {
    id: "market-kalanchoe",
    name: "Kalanşo (Kalanchoe)",
    scientificName: "Kalanchoe",
    category: "saksi",
    subtitle: "Sukulent ailesinden olduğu için çok az su isteyen, rengarenk mini çiçekler açan popüler bir saksı bitkisi.",
    price: "120 ₺",
    petalCount: 16,
    symmetry: 0.88,
    glowness: 0.55,
    hue: "#e11d48",
    species: "hybrid",
    scentProfile: "Tamamen kokusuz, saf oksijen odaklı bitki yaprağı.",
    lore: "Eski kültürlerde refah, bereket ve kalıcı dostluk hediyesi olarak elden ele aktarılan dayanıklı yeşil dost.",
    careGuide: "Toprağı kupkuru olmadan sulamayın. Bol bol güneş ışığı alan pencerelere koyun.",
    classTag: "Mini Masa Süsü",
    image: "/src/assets/images/kalanchoe_flower_1781300104255.jpg"
  },
  {
    id: "market-violet",
    name: "Menekşe (Saintpaulia)",
    scientificName: "Saintpaulia",
    category: "saksi",
    subtitle: "Ev hanımlarının geleneksel favorisi, kadifemsi yapraklarıyla sıcak ve samimi bir hediye seçeneği.",
    price: "90 ₺",
    petalCount: 10,
    symmetry: 0.96,
    glowness: 0.5,
    hue: "#6d28d9",
    species: "rose",
    scentProfile: "Hafif pudralı nostaljik sabun kokusu.",
    lore: "Anadolu evlerinin pencerelerindeki dantel örtülerle bütünleşen, aile sıcaklığının ve samimi sohbetlerin kadife sesi.",
    careGuide: "Yapraklarına kesinlikle su değdirmeyin, leke yapar. Alttan sulama yapıp süzdürün.",
    classTag: "Geleneksel Kadife",
    image: "/src/assets/images/violet_flower_1781300118232.jpg"
  },

  // --- KATEGORİ 3: Egzotik ve Trend Çiçekler ---
  {
    id: "market-lisianthus",
    name: "Lisianthus (Eustoma)",
    scientificName: "Eustoma",
    category: "egzotik",
    subtitle: "Güle benzeyen ama daha ince ve tül gibi katmanları olan, son yılların en trend elit kesme çiçeği.",
    price: "180 ₺",
    petalCount: 14,
    symmetry: 0.9,
    glowness: 0.75,
    hue: "#c084fc",
    species: "rose",
    scentProfile: "Çok narin taze çay ve ıhlamur yaprağı aroması.",
    lore: "Görkemli ama mütevazı ipeksiliğiyle, modern düğünlerin ve şık butik masaların yeni gözbebeği.",
    careGuide: "Sapları çok hassastır, vazo suyunu temiz tutmak için bakteriyel koruyucu ekleyebilirsiniz.",
    classTag: "Trend Elit Kesme",
    image: "/src/assets/images/lisianthus_flower_1781300132149.jpg"
  },
  {
    id: "market-strelitzia",
    name: "Cennet Kuşu / Starliçe (Strelitzia)",
    scientificName: "Strelitzia",
    category: "egzotik",
    subtitle: "Turuncu-mavi sıra dışı formuyla tropikal ve modern tasarımlar arayanlar için mükemmeldir.",
    price: "500 ₺",
    petalCount: 7,
    symmetry: 0.8,
    glowness: 0.9,
    hue: "#f97316",
    species: "orchid",
    scentProfile: "Hafif tropikal meyvemsi ve nötr otsu koku.",
    lore: "Afrika vahşi ormanlarından süzülen, uçuşa hazır görkemli bir cennet kuşunun kanatlarını andıran muhteşem mimari.",
    careGuide: "Güneş alan pencereleri çok sever. Büyük yapraklarını ayda bir nemli bezle silin.",
    classTag: "Tropikal Tasarım Devleri",
    image: "/src/assets/images/strelitzia_flower_1781300145491.jpg"
  },
  {
    id: "market-eucalyptus",
    name: "Okaliptüs (Eucalyptus)",
    scientificName: "Eucalyptus",
    category: "egzotik",
    subtitle: "Dükkanın kokusunu değiştiren ve tüm modern buketlere o soluk yeşil estetiği katan en önemli yeşilliktir.",
    price: "120 ₺",
    petalCount: 5,
    symmetry: 0.85,
    glowness: 0.4,
    hue: "#10b981",
    species: "tulip",
    scentProfile: "Olağanüstü taze mentollü, canlandırıcı okaliptol terapi kokusu.",
    lore: "Bulunduğu ortamın enerjisini ve nefes kalitesini saniyeler içinde tazeleyen efsanevi Avustralya şifacısı.",
    careGuide: "Vazo suyunda uzun süre dayanır. Kuruduktan sonra da odanın havasını tazelemeye devam eder.",
    classTag: "Şifacı Okaliptol",
    image: "/src/assets/images/eucalyptus_leaves_1781300157537.jpg"
  }
];

export default function MasterpieceStudio({ onAddCustomToCart }: MasterpieceStudioProps) {
  const [activeTab, setActiveTab] = useState<"kesme" | "saksi" | "egzotik">("kesme");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("market-rose");
  const [buyQuantity, setBuyQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState<boolean>(false);
  const [userNote, setUserNote] = useState<string>("");
  const [viewMode, setViewMode] = useState<"photo" | "canvas">("photo");

  // Filter & Search the 20 varieties in memory
  const filteredFlowers = useMemo(() => {
    return FLOWERS_DATA.filter((flower) => {
      const matchTab = flower.category === activeTab;
      const matchSearch =
        flower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flower.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flower.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [activeTab, searchQuery]);

  // Retrieve current active item object
  const activeFlower = useMemo(() => {
    return FLOWERS_DATA.find((f) => f.id === selectedId) || FLOWERS_DATA[0];
  }, [selectedId]);

  // Dynamic cart adder maps to DigitalFlower type flawlessly
  const handlePurchase = () => {
    if (!activeFlower) return;

    const mappedFlower: DigitalFlower = {
      id: `${activeFlower.id}-${Date.now()}`, // unique id instance
      name: activeFlower.name,
      species: activeFlower.species,
      subtitle: `${activeFlower.scientificName} · Butik Taze Seçim`,
      image: activeFlower.image,
      classTag: activeFlower.classTag,
      price: activeFlower.price,
      petalCount: activeFlower.petalCount,
      symmetry: activeFlower.symmetry,
      glowness: activeFlower.glowness,
      hue: activeFlower.hue,
      scentProfile: activeFlower.scentProfile,
      lore: activeFlower.lore,
      careGuide: activeFlower.careGuide
    };

    // Add specified quantity to cart (using application's callback loop)
    for (let i = 0; i < buyQuantity; i++) {
      onAddCustomToCart({
        ...mappedFlower,
        id: `${activeFlower.id}-${Date.now()}-${i}`
      });
    }

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
    setUserNote("");
  };

  return (
    <section id="mastermaster" className="py-24 px-6 md:px-16 bg-canvas border-b border-ink">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Market Title Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6" id="studio-header">
          <div className="text-left max-w-2xl">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#c5a880] mb-3 font-bold block">
              VALENTINO BUTİK SEÇKİSİ
            </span>
            <h2 className="font-serif text-[34px] md:text-[45px] font-bold text-neutral-dark tracking-tight leading-tight">
              Taze Çiçek & Saksı Marketi
            </h2>
            <p className="font-sans text-[14px] text-neutral-dark/60 leading-relaxed mt-3 font-light">
              Piyasanın en seçkin kesme, saksı ve egzotik çiçek türlerini keşfedin. Her tırnağın botanik simetrisi ve canlandırıcı koku analizi yapay zeka atölyemizde gerçek zamanlı olarak simüle edilir.
            </p>
          </div>

          {/* Luxury Search Bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Çiçek ara (örn: Gül, Orkide...)"
              className="w-full bg-neutral-dark/[0.02] hover:bg-neutral-dark/[0.04] focus:bg-canvas border border-ink text-xs py-3 pl-9 pr-4 rounded-none outline-none transition-all placeholder:text-neutral-dark/35"
            />
            <span className="absolute left-3 top-3.5 text-neutral-dark/40">
              <Search className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex border-b border-ink mb-12 overflow-x-auto scroller-hidden">
          <button
            onClick={() => {
              setActiveTab("kesme");
              const firstCat = FLOWERS_DATA.find(f => f.category === "kesme");
              if (firstCat) setSelectedId(firstCat.id);
            }}
            className={`pb-4 px-6 text-[11px] font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${
              activeTab === "kesme" ? "text-neutral-dark" : "text-neutral-dark/40 hover:text-neutral-dark"
            }`}
          >
            Sınıf I: Kesme & Klasik Çiçekler
            {activeTab === "kesme" && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-dark" />}
          </button>
          
          <button
            onClick={() => {
              setActiveTab("saksi");
              const firstCat = FLOWERS_DATA.find(f => f.category === "saksi");
              if (firstCat) setSelectedId(firstCat.id);
            }}
            className={`pb-4 px-6 text-[11px] font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${
              activeTab === "saksi" ? "text-neutral-dark" : "text-neutral-dark/40 hover:text-neutral-dark"
            }`}
          >
            Sınıf II: Saksı & Ev Çiçekleri
            {activeTab === "saksi" && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-dark" />}
          </button>

          <button
            onClick={() => {
              setActiveTab("egzotik");
              const firstCat = FLOWERS_DATA.find(f => f.category === "egzotik");
              if (firstCat) setSelectedId(firstCat.id);
            }}
            className={`pb-4 px-6 text-[11px] font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${
              activeTab === "egzotik" ? "text-neutral-dark" : "text-neutral-dark/40 hover:text-neutral-dark"
            }`}
          >
            Sınıf III: Trend & Egzotik Yapraklar
            {activeTab === "egzotik" && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-dark" />}
          </button>
        </div>

        {/* Split Grid Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start" id="studio-workspace">
          
          {/* Left Block: Search Results / Selected tab items list */}
          <div className="lg:col-span-6 flex flex-col space-y-3" id="shop-items-panel">
            {filteredFlowers.length === 0 ? (
              <div className="border border-ink p-12 text-center text-neutral-dark/40">
                <AlertTriangle className="w-6 h-6 mx-auto mb-3 opacity-60" />
                <p className="font-serif text-[15px] italic">Aradığınız kriterde çiçek bulunamadı.</p>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="mt-4 font-sans text-[10px] font-bold uppercase tracking-wider underline hover:text-neutral-dark"
                >
                  Aramayı Temizle
                </button>
              </div>
            ) : (
              filteredFlowers.map((flower) => (
                <div
                  key={flower.id}
                  onClick={() => {
                    setSelectedId(flower.id);
                    setBuyQuantity(1);
                  }}
                  className={`border p-5 text-left flex items-center justify-between cursor-pointer transition-all ${
                    selectedId === flower.id
                      ? "border-neutral-dark bg-neutral-dark/[0.02]"
                      : "border-ink bg-transparent hover:bg-neutral-dark/[0.01] hover:border-neutral-dark/30"
                  }`}
                >
                  <div className="flex items-center space-x-4 max-w-[70%]">
                    {/* Small Colored Circle representation of the flower hue */}
                    <div 
                      className="w-5 h-5 flex-shrink-0" 
                      style={{ 
                        backgroundColor: flower.hue, 
                        border: "1px solid rgba(26,26,26,0.1)",
                        boxShadow: `0 0 10px ${flower.hue}30`
                      }} 
                    />
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-serif text-md font-bold text-neutral-dark leading-tight">{flower.name}</span>
                        <span className="font-mono text-[9px] text-[#c5a880] uppercase tracking-wider font-semibold">
                          ({flower.scientificName})
                        </span>
                      </div>
                      <p className="font-sans text-xs text-neutral-dark/60 mt-1 line-clamp-1 font-light">
                        {flower.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="font-mono text-xs font-bold text-neutral-dark/90 tracking-wider">
                      {flower.price}
                    </span>
                    <div 
                      className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                        selectedId === flower.id 
                          ? "bg-neutral-dark border-neutral-dark text-canvas" 
                          : "border-ink text-transparent"
                      }`}
                    >
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Info Footer Callout for Turkish Physical Delivery */}
            <div className="border border-ink bg-neutral-dark/[0.01] p-5 text-left flex items-start space-x-3.5 mt-4">
              <Info className="w-4 h-4 text-[#c5a880] mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#c5a880]">Kargo ve Teslimat Bilgisi</span>
                <p className="font-sans text-xs text-neutral-dark/60 leading-relaxed font-light">
                  Kesme çiçekler soğuk zincir korumalı sepetlerde günlük taze kesim olarak, saksı çiçekleri ise korunaklı özel kutularda 24 saat içinde İstanbul genelinde adresinize teslim edilir.
                </p>
              </div>
            </div>
          </div>

          {/* Right Block: Live Procedural Flower Visual & Certificate Card */}
          <div className="lg:col-span-6 flex flex-col space-y-6 h-full" id="studio-visual-panel">
            
            {/* Upper Interactive Viewport with Editorial Frame representing chosen flower */}
            <div className="bg-canvas border border-ink p-6 rounded-none flex flex-col items-center justify-center aspect-[5/4] relative overflow-hidden group">
              
              <div className="absolute top-5 left-5 flex items-center space-x-2 font-mono text-[9px] text-neutral-dark/40 uppercase z-10 bg-canvas/80 backdrop-blur-sm px-2.5 py-1 border border-ink/45">
                <Leaf className="w-3.5 h-3.5 text-[#c5a880]/60" />
                <span>{viewMode === "photo" ? "Gerçek Ürün Fotoğrafı" : "Yapay Zeka Analiz Modeli"}</span>
              </div>

              {/* Advanced viewmode tabs */}
              <div className="absolute top-5 right-5 flex border border-ink rounded-none bg-canvas z-10 overflow-hidden text-[9px] font-mono shadow-sm">
                <button
                  type="button"
                  onClick={() => setViewMode("photo")}
                  className={`px-3 py-1.5 transition-all font-bold tracking-wider ${
                    viewMode === "photo"
                      ? "bg-neutral-dark text-canvas"
                      : "text-neutral-dark/60 hover:text-neutral-dark hover:bg-neutral-dark/5"
                  }`}
                >
                  FOTOĞRAF
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("canvas")}
                  className={`px-3 py-1.5 transition-all font-bold tracking-wider ${
                    viewMode === "canvas"
                      ? "bg-neutral-dark text-canvas"
                      : "text-neutral-dark/60 hover:text-neutral-dark hover:bg-neutral-dark/5"
                  }`}
                >
                  SİMÜLASYON
                </button>
              </div>

              <div className="w-full h-full flex items-center justify-center pt-8">
                {viewMode === "photo" && activeFlower?.image ? (
                  <div className="relative w-full h-full flex items-center justify-center p-2" style={{ animation: "fadeIn 0.4s ease-out" }}>
                    <img
                      src={activeFlower.image}
                      alt={activeFlower.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover border border-ink max-h-[240px] max-w-[340px] transition-transform duration-500 ease-out hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=600";
                      }}
                    />
                  </div>
                ) : (
                  activeFlower && (
                    <ProceduralFlower
                      species={activeFlower.species}
                      petalCount={activeFlower.petalCount}
                      symmetry={activeFlower.symmetry}
                      glowness={activeFlower.glowness}
                      hue={activeFlower.hue}
                      className="w-full h-full max-w-[250px] max-h-[250px]"
                      isSpinning={true}
                    />
                  )
                )}
              </div>
            </div>

            {/* Detailed Spec Card and Purchase Area */}
            {activeFlower && (
              <div 
                className="bg-canvas border border-neutral-dark p-8 rounded-none text-left relative"
                style={{ animation: "scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
                id="curated-certificate"
              >
                {/* Security seal with active category stamp */}
                <div className="absolute top-8 right-8 w-14 h-14 border border-ink flex items-center justify-center font-mono text-[8px] tracking-wide uppercase text-neutral-dark/30 text-center leading-tight">
                  VALENTINO
                  <br />
                  {activeFlower.category.toUpperCase()}
                </div>

                <span className="font-sans text-[9px] tracking-[0.25em] text-[#c5a880] font-bold block mb-2">
                  BOTANİK SİCİLİ VE DEĞER ANALİZİ
                </span>

                <h4 className="font-serif text-[26px] font-bold text-neutral-dark mb-1 leading-tight">
                  {activeFlower.name}
                </h4>

                <div className="flex items-center space-x-3 text-xs mb-5 font-light">
                  <span className="font-mono font-bold text-neutral-dark">{activeFlower.price} / Adet</span>
                  <span className="text-neutral-dark/25">•</span>
                  <span className="font-sans text-neutral-dark/50">{activeFlower.classTag}</span>
                </div>

                {/* Body metadata lists */}
                <div className="space-y-4 font-sans text-xs border-y border-ink py-5 mb-6">
                  <div>
                    <span className="font-bold text-[#844e5f] block uppercase tracking-wider text-[9px] mb-1">Doğal Koku Profili</span>
                    <p className="text-neutral-dark/75 font-light leading-relaxed">{activeFlower.scentProfile}</p>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-dark block uppercase tracking-wider text-[9px] mb-1">Kültür ve Arkaplan</span>
                    <p className="text-neutral-dark/70 leading-relaxed font-light">{activeFlower.lore}</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#526442] block uppercase tracking-wider text-[9px] mb-1">Dijital & Fiziksel Bakım Kılavuzu</span>
                    <p className="text-neutral-dark/60 italic font-light">{activeFlower.careGuide}</p>
                  </div>
                </div>

                {/* Purchase Configuration Controls */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
                  
                  {/* Quantity selector */}
                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <span className="font-sans text-xs text-neutral-dark/60">Adet Seçimi:</span>
                    <div className="flex items-center border border-ink bg-canvas p-1">
                      <button
                        onClick={() => setBuyQuantity(q => Math.max(1, q - 1))}
                        className="w-8 h-8 font-bold text-sm hover:bg-neutral-dark/5 flex items-center justify-center transition-all"
                      >
                        -
                      </button>
                      <span className="px-4 font-mono font-bold text-xs select-none">
                        {buyQuantity}
                      </span>
                      <button
                        onClick={() => setBuyQuantity(q => Math.min(24, q + 1))}
                        className="w-8 h-8 font-bold text-sm hover:bg-neutral-dark/5 flex items-center justify-center transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal calculation */}
                  <div className="text-right w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 border-ink pt-3 sm:pt-0">
                    <span className="font-sans text-xs text-neutral-dark/50">Ara Toplam:</span>
                    <span className="font-mono text-md font-bold text-neutral-dark">
                      {(parseInt(activeFlower.price.replace(/[^\d]/g, ""), 10) * buyQuantity).toLocaleString("tr-TR")} ₺
                    </span>
                  </div>

                </div>

                {/* Add to basket CTA trigger */}
                <button
                  onClick={handlePurchase}
                  className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all ${
                    justAdded 
                      ? "bg-[#526442] text-white" 
                      : "bg-neutral-dark hover:bg-neutral-dark/95 text-canvas cursor-pointer"
                  }`}
                  id="add-custom-btn"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{activeFlower.name} Rezervasyonu Sepete Eklendi!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Rezervasyon Sepetine Ekle</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
