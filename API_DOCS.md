# 🔌 BioExplore Nusantara API Documentation

> **Dokumentasi untuk Developer** - Panduan lengkap mengonsumsi data flora & fauna Indonesia

---

## 📦 Sumber Data

Data tersedia dalam format **JSON statis** yang dapat diakses langsung:

| Sumber | URL |
|--------|-----|
| **CDN (Production)** | `https://smartonesda.github.io/bioexplore-nusantara/assets/data/provinsi.json` |
| **Local Development** | `./assets/data/provinsi.json` |

### Quick Start

```javascript
// Fetch data langsung
const response = await fetch('https://smartonesda.github.io/bioexplore-nusantara/assets/data/provinsi.json');
const data = await response.json();
```

---

## 🗂️ Data Structure Overview

```
provinsi.json
└── {NamaProvinsi}              // Key: nama provinsi (38 total)
    ├── flora                   // Flora identitas provinsi
    │   ├── [13 properties]     // Detail lengkap flora utama
    │   └── lainnya[]           // Array 10 flora lainnya
    └── fauna                   // Fauna identitas provinsi
        ├── [8 properties]      // Detail lengkap fauna utama
        └── lainnya[]           // Array 10 fauna lainnya
```

### 🌿 Daftar 38 Provinsi

```javascript
const PROVINSI = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Kepulauan Riau",
  "Jambi", "Sumatera Selatan", "Kepulauan Bangka Belitung", "Bengkulu", "Lampung",
  "DKI Jakarta", "Banten", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta",
  "Jawa Timur", "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur",
  "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", 
  "Kalimantan Timur", "Kalimantan Utara", "Sulawesi Utara", "Gorontalo",
  "Sulawesi Tengah", "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tenggara",
  "Maluku", "Maluku Utara", "Papua Barat", "Papua Barat Daya", 
  "Papua Tengah", "Papua Pegunungan", "Papua Selatan", "Papua"
];
```

---

## 📐 Type Definitions

### TypeScript Interfaces

```typescript
/**
 * Root data structure
 */
interface ProvinsiData {
  [namaProvinsi: string]: {
    flora: FloraIdentitas;
    fauna: FaunaIdentitas;
  };
}

/**
 * Flora Identitas (13 properties)
 */
interface FloraIdentitas {
  nama: string;        // Nama umum tanaman
  namaLain: string;    // Nama daerah/alternatif
  latin: string;       // Nama ilmiah (Latin)
  warna: string;       // Warna bunga/daun
  aroma: string;       // Karakteristik aroma
  tinggi: string;      // Tinggi tanaman
  habitat: string;     // Habitat alami
  simbol: string;      // Makna simbolis
  budaya: string;      // Peran dalam budaya lokal
  manfaat: string;     // Manfaat/kegunaan
  identitas: string;   // Keterangan identitas provinsi
  tips: string;        // Tips budidaya/penanaman
  status: string;      // Status konservasi
  lainnya: FloraLainnya[];
}

/**
 * Fauna Identitas (8 properties)
 */
interface FaunaIdentitas {
  nama: string;        // Nama umum hewan
  namaLain: string;    // Nama daerah/alternatif
  latin: string;       // Nama ilmiah (Latin)
  ukuran: string;      // Ukuran tubuh
  warna: string;       // Warna bulu/kulit
  habitat: string;     // Habitat alami
  identitas: string;   // Keterangan identitas provinsi
  adaptasi: string;    // Info adaptabilitas penangkaran
  status: string;      // Status konservasi
  lainnya: FaunaLainnya[];
}

/**
 * Flora Lainnya (per item dalam array 10 spesies)
 */
interface FloraLainnya {
  nama: string;         // Nama tanaman
  latin: string;        // Nama Latin
  status: string;       // Status: "Umum" | "Langka" | "Rentan" | "Terancam" | "Kritis" | "Budidaya"
  statusDetail: string; // Deskripsi lengkap status IUCN
  habitat: string;      // Lokasi habitat
  deskripsi: string;    // Deskripsi spesies
  ciriKhas: string;     // Ciri-ciri khas
  ancaman: string;      // Ancaman terhadap populasi
}

/**
 * Fauna Lainnya (struktur sama dengan FloraLainnya)
 */
interface FaunaLainnya {
  nama: string;
  latin: string;
  status: string;
  statusDetail: string;
  habitat: string;
  deskripsi: string;
  ciriKhas: string;
  ancaman: string;
}
```

---

## 🎯 Common Use Cases

### 1️⃣ Ambil Data Satu Provinsi

```javascript
async function getProvinsiData(namaProvinsi) {
  const response = await fetch('./assets/data/provinsi.json');
  const data = await response.json();
  
  return data[namaProvinsi]; // { flora: {...}, fauna: {...} }
}

// Usage
const aceh = await getProvinsiData("Aceh");
console.log(aceh.flora.nama);  // "Cempaka Kuning"
console.log(aceh.fauna.nama);  // "Cempala Kuneng"
```

### 2️⃣ Ambil Flora Identitas dari Provinsi

```javascript
async function getFloraIdentitas(namaProvinsi) {
  const provinsi = await getProvinsiData(namaProvinsi);
  
  return {
    nama: provinsi.flora.nama,
    namaLain: provinsi.flora.namaLain,
    latin: provinsi.flora.latin,
    warna: provinsi.flora.warna,
    aroma: provinsi.flora.aroma,
    tinggi: provinsi.flora.tinggi,
    habitat: provinsi.flora.habitat,
    simbol: provinsi.flora.simbol,
    budaya: provinsi.flora.budaya,
    manfaat: provinsi.flora.manfaat,
    identitas: provinsi.flora.identitas,
    tips: provinsi.flora.tips,
    status: provinsi.flora.status
  };
}

// Example output for "Aceh"
{
  nama: "Cempaka Kuning",
  namaLain: "Bungong Jeumpa",
  latin: "Michelia champaca",
  warna: "Kuning jingga",
  aroma: "Sangat harum semerbak",
  tinggi: "15-25 meter",
  habitat: "Hutan dataran rendah hingga 1500 mdpl",
  simbol: "Keharuman & kesucian",
  budaya: "Lagu daerah & upacara adat",
  manfaat: "Minyak wangi, tanaman hias",
  identitas: "Flora Identitas Aceh",
  tips: "Butuh matahari penuh, tanah gembur...",
  status: "Umum - Least Concern (LC)..."
}
```

### 3️⃣ Ambil Fauna Identitas dari Provinsi

```javascript
async function getFaunaIdentitas(namaProvinsi) {
  const provinsi = await getProvinsiData(namaProvinsi);
  
  return {
    nama: provinsi.fauna.nama,
    namaLain: provinsi.fauna.namaLain,
    latin: provinsi.fauna.latin,
    ukuran: provinsi.fauna.ukuran,
    warna: provinsi.fauna.warna,
    habitat: provinsi.fauna.habitat,
    identitas: provinsi.fauna.identitas,
    adaptasi: provinsi.fauna.adaptasi,
    status: provinsi.fauna.status
  };
}
```

### 4️⃣ Ambil Daftar Flora/Fauna Lainnya

```javascript
async function getFloraLainnya(namaProvinsi) {
  const provinsi = await getProvinsiData(namaProvinsi);
  return provinsi.flora.lainnya; // Array of 10 species
}

async function getFaunaLainnya(namaProvinsi) {
  const provinsi = await getProvinsiData(namaProvinsi);
  return provinsi.fauna.lainnya; // Array of 10 species
}

// Example: Get all fauna lainnya from Aceh
const faunaAceh = await getFaunaLainnya("Aceh");
// Returns array of 10 objects with: nama, latin, status, statusDetail, habitat, deskripsi, ciriKhas, ancaman
```

---

## 🔍 Advanced Filtering & Queries

### Filter by Conservation Status

```javascript
const STATUS_LEVELS = {
  UMUM: "Umum",
  BUDIDAYA: "Budidaya",  
  LANGKA: "Langka",
  RENTAN: "Rentan",
  TERANCAM: "Terancam",
  KRITIS: "Kritis"
};

async function filterByStatus(targetStatus, type = 'flora') {
  const response = await fetch('./assets/data/provinsi.json');
  const data = await response.json();
  
  const results = [];
  
  for (const [provinsi, content] of Object.entries(data)) {
    // Check main species
    const mainSpecies = content[type];
    if (mainSpecies.status.includes(targetStatus)) {
      results.push({
        provinsi,
        type: type === 'flora' ? 'Flora Identitas' : 'Fauna Identitas',
        ...mainSpecies
      });
    }
    
    // Check "lainnya" array
    content[type].lainnya.forEach(species => {
      if (species.status === targetStatus) {
        results.push({
          provinsi,
          type: `${type === 'flora' ? 'Flora' : 'Fauna'} Lainnya`,
          ...species
        });
      }
    });
  }
  
  return results;
}

// Example: Get all critically endangered fauna
const kritisSpecies = await filterByStatus("Kritis", "fauna");
```

### Search by Species Name

```javascript
async function searchSpecies(keyword, caseSensitive = false) {
  const response = await fetch('./assets/data/provinsi.json');
  const data = await response.json();
  
  const searchKey = caseSensitive ? keyword : keyword.toLowerCase();
  const results = [];
  
  for (const [provinsi, content] of Object.entries(data)) {
    // Search in flora
    const floraName = caseSensitive ? content.flora.nama : content.flora.nama.toLowerCase();
    if (floraName.includes(searchKey)) {
      results.push({
        provinsi,
        type: 'Flora Identitas',
        data: content.flora
      });
    }
    
    content.flora.lainnya.forEach(species => {
      const name = caseSensitive ? species.nama : species.nama.toLowerCase();
      if (name.includes(searchKey)) {
        results.push({ provinsi, type: 'Flora Lainnya', data: species });
      }
    });
    
    // Search in fauna (same pattern)
    const faunaName = caseSensitive ? content.fauna.nama : content.fauna.nama.toLowerCase();
    if (faunaName.includes(searchKey)) {
      results.push({
        provinsi,
        type: 'Fauna Identitas',
        data: content.fauna
      });
    }
    
    content.fauna.lainnya.forEach(species => {
      const name = caseSensitive ? species.nama : species.nama.toLowerCase();
      if (name.includes(searchKey)) {
        results.push({ provinsi, type: 'Fauna Lainnya', data: species });
      }
    });
  }
  
  return results;
}

// Example: Find all "Harimau" species
const harimaResults = await searchSpecies("harimau");
```

### Get Statistics

```javascript
async function getStatistics() {
  const response = await fetch('./assets/data/provinsi.json');
  const data = await response.json();
  
  const stats = {
    totalProvinsi: 0,
    floraIdentitas: 0,
    faunaIdentitas: 0,
    floraLainnya: 0,
    faunaLainnya: 0,
    byStatus: {
      flora: { Umum: 0, Langka: 0, Rentan: 0, Terancam: 0, Kritis: 0, Budidaya: 0 },
      fauna: { Umum: 0, Langka: 0, Rentan: 0, Terancam: 0, Kritis: 0 }
    }
  };
  
  for (const [provinsi, content] of Object.entries(data)) {
    stats.totalProvinsi++;
    stats.floraIdentitas++;
    stats.faunaIdentitas++;
    stats.floraLainnya += content.flora.lainnya.length;
    stats.faunaLainnya += content.fauna.lainnya.length;
    
    // Count by status
    content.flora.lainnya.forEach(f => {
      if (stats.byStatus.flora[f.status] !== undefined) {
        stats.byStatus.flora[f.status]++;
      }
    });
    
    content.fauna.lainnya.forEach(f => {
      if (stats.byStatus.fauna[f.status] !== undefined) {
        stats.byStatus.fauna[f.status]++;
      }
    });
  }
  
  return stats;
}
```

---

## 🌐 Framework Integration Examples

### React / Next.js

```jsx
import { useState, useEffect } from 'react';

function useProvinsiData(namaProvinsi) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch('/assets/data/provinsi.json');
        const allData = await res.json();
        setData(allData[namaProvinsi]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    if (namaProvinsi) fetchData();
  }, [namaProvinsi]);

  return { data, loading, error };
}

// Usage in component
function FloraCard({ provinsi }) {
  const { data, loading, error } = useProvinsiData(provinsi);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;
  
  return (
    <div className="flora-card">
      <h2>{data.flora.nama}</h2>
      <p><em>{data.flora.latin}</em></p>
      <p>Status: {data.flora.status}</p>
    </div>
  );
}
```

### Vue.js 3

```vue
<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps(['provinsi'])
const flora = ref(null)
const fauna = ref(null)
const loading = ref(true)

async function fetchData() {
  loading.value = true
  try {
    const res = await fetch('/assets/data/provinsi.json')
    const data = await res.json()
    flora.value = data[props.provinsi].flora
    fauna.value = data[props.provinsi].fauna
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
watch(() => props.provinsi, fetchData)
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <h2>{{ flora.nama }}</h2>
    <p>{{ flora.latin }}</p>
  </div>
</template>
```

### Svelte

```svelte
<script>
  export let provinsi;
  
  let data = null;
  
  $: if (provinsi) {
    fetch('/assets/data/provinsi.json')
      .then(r => r.json())
      .then(all => {
        data = all[provinsi];
      });
  }
</script>

{#if data}
  <div class="card">
    <h2>{data.flora.nama}</h2>
    <p><em>{data.flora.latin}</em></p>
    <span class="status">{data.flora.status}</span>
  </div>
{:else}
  <p>Loading...</p>
{/if}
```

---

## 📊 Status Konservasi Reference

| Status | IUCN Code | Severity | Description |
|--------|-----------|----------|-------------|
| **Umum** | LC | 🟢 Low | Least Concern - Populasi stabil |
| **Budidaya** | - | 🟢 Low | Spesies sudah dibudidayakan |
| **Langka** | - | 🟡 Medium | Populasi terbatas, perlu konservasi |
| **Rentan** | VU | 🟠 High | Vulnerable - Risiko kepunahan menengah |
| **Terancam** | EN | 🔴 Very High | Endangered - Risiko kepunahan tinggi |
| **Kritis** | CR | ⚫ Critical | Critically Endangered - Risiko sangat tinggi |

### Status Badge Styling Example

```css
.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.status-umum { background: #dcfce7; color: #166534; }
.status-budidaya { background: #dbeafe; color: #1e40af; }
.status-langka { background: #fef9c3; color: #854d0e; }
.status-rentan { background: #fed7aa; color: #9a3412; }
.status-terancam { background: #fecaca; color: #991b1b; }
.status-kritis { background: #fecdd3; color: #9f1239; }
```

```javascript
function getStatusClass(status) {
  const statusLower = status.toLowerCase();
  if (statusLower.includes('kritis')) return 'status-kritis';
  if (statusLower.includes('terancam')) return 'status-terancam';
  if (statusLower.includes('rentan')) return 'status-rentan';
  if (statusLower.includes('langka')) return 'status-langka';
  if (statusLower.includes('budidaya')) return 'status-budidaya';
  return 'status-umum';
}
```

---

## 📋 Data Summary

| Metric | Count |
|--------|-------|
| Total Provinsi | 38 |
| Flora Identitas | 38 spesies |
| Fauna Identitas | 38 spesies |
| Flora Lainnya | ~380 spesies |
| Fauna Lainnya | ~380 spesies |
| **Total Spesies** | **~836 spesies** |

---

## 🔗 Related Resources

- **Live Demo**: [https://smartonesda.github.io/bioexplore-nusantara/](https://smartonesda.github.io/bioexplore-nusantara/)
- **Repository**: [GitHub - bioexplore-nusantara](https://github.com/smartonesda/bioexplore-nusantara)
- **Data Source**: Peraturan Menteri LHK No. P.106/2018, IUCN Red List

---

## 💡 Tips for Developers

1. **Cache the JSON** - Data bersifat statis, cache di client untuk performa optimal
2. **Implement Search** - Gunakan fungsi search yang sudah disediakan di atas
3. **Handle Case Sensitivity** - Nama provinsi case-sensitive (contoh: "DKI Jakarta", bukan "dki jakarta")
4. **Use TypeScript** - Gunakan interface yang sudah disediakan untuk type safety
5. **Error Handling** - Selalu handle case ketika provinsi tidak ditemukan

```javascript
// Good practice
const provinsiData = data[namaProvinsi];
if (!provinsiData) {
  throw new Error(`Provinsi "${namaProvinsi}" tidak ditemukan`);
}
```

---

<p align="center">
  <strong>Made with 🌿 for Indonesia's Biodiversity</strong><br>
  <em>#SaveIndonesianBiodiversity</em>
</p>
