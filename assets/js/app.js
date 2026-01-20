/**
 * Ensiklopedia Biodiversitas Nusantara
 * Main Application JavaScript
 */

// Global state
let database = {};
let currentProvince = 'Aceh';

// DOM Elements
const provinceSelect = document.getElementById('provinceSelect');
const loadingEl = document.getElementById('loading');
const contentEl = document.getElementById('content');
const modalEl = document.getElementById('speciesModal');

// Initialize App
async function initApp() {
    try {
        await loadData();
        populateProvinceSelect();
        renderContent();
        setupModalEvents();
    } catch (error) {
        console.error('Failed to initialize app:', error);
    }
}

// Load JSON Data
async function loadData() {
    const response = await fetch('./assets/data/provinsi.json');
    if (!response.ok) throw new Error('Failed to load data');
    database = await response.json();
}

// Populate Province Dropdown
function populateProvinceSelect() {
    const sortedProvinces = Object.keys(database).sort();

    sortedProvinces.forEach(prov => {
        const option = document.createElement('option');
        option.value = prov;
        option.text = prov;
        provinceSelect.appendChild(option);
    });

    provinceSelect.value = currentProvince;
    provinceSelect.addEventListener('change', () => {
        currentProvince = provinceSelect.value;
        renderContent();
    });
}

// Get Badge Class
function getBadgeClass(status) {
    const dangerKeywords = ['Kritis', 'Terancam', 'Punah', 'Langka', 'Dilindungi'];
    const warningKeywords = ['Rentan', 'Hampir'];

    if (dangerKeywords.some(k => status.includes(k))) return 'danger';
    if (warningKeywords.some(k => status.includes(k))) return 'warning';
    return 'safe';
}

// Render Others Grid with Click Handlers
function renderOthersGrid(items, type) {
    return items.map((item, index) => {
        // Handle both string and object format
        const isObject = typeof item === 'object';
        const name = isObject ? item.nama : item.split(' (')[0];
        const displayName = isObject ? item.nama : item;

        return `<div class="others-item ${type}" onclick="showSpeciesDetail(${index}, '${type}')" data-index="${index}">
            <span>${displayName}</span>
        </div>`;
    }).join('');
}

// Show Species Detail Modal
function showSpeciesDetail(index, type) {
    const data = database[currentProvince];
    if (!data) return;

    const items = type === 'flora' ? data.flora.lainnya : data.fauna.lainnya;
    const item = items[index];

    // Handle both string and object format
    const isObject = typeof item === 'object';

    if (isObject) {
        // New detailed format
        document.getElementById('modalTitle').textContent = item.nama;
        document.getElementById('modalSubtitle').textContent = item.latin || '-';
        document.getElementById('modalHabitat').textContent = item.habitat || '-';
        document.getElementById('modalDesc').textContent = item.deskripsi || '-';
        document.getElementById('modalCiri').textContent = item.ciriKhas || '-';
        document.getElementById('modalAncaman').textContent = item.ancaman || '-';

        const statusEl = document.getElementById('modalStatus');
        statusEl.textContent = item.statusDetail || item.status || '-';
        statusEl.className = `modal-status ${getBadgeClass(item.status || '')}`;
    } else {
        // Old string format - extract info from string like "Harimau Sumatera (Kritis)"
        const match = item.match(/^(.+?)\s*\(([^)]+)\)$/);
        const name = match ? match[1] : item;
        const status = match ? match[2] : 'Tidak diketahui';

        document.getElementById('modalTitle').textContent = name;
        document.getElementById('modalSubtitle').textContent = 'Data detail belum tersedia';
        document.getElementById('modalHabitat').textContent = `Tersebar di wilayah ${currentProvince}`;
        document.getElementById('modalDesc').textContent = `${name} merupakan salah satu spesies ${type === 'flora' ? 'tumbuhan' : 'hewan'} yang dapat ditemukan di ${currentProvince}. Spesies ini memiliki peran penting dalam ekosistem lokal.`;
        document.getElementById('modalCiri').textContent = '-';
        document.getElementById('modalAncaman').textContent = status.includes('Kritis') || status.includes('Terancam') ? 'Perburuan, deforestasi, dan perubahan habitat' : '-';

        const statusEl = document.getElementById('modalStatus');
        statusEl.textContent = status;
        statusEl.className = `modal-status ${getBadgeClass(status)}`;
    }

    // Update modal header color
    const modalHeader = document.getElementById('modalHeader');
    modalHeader.className = `modal-header ${type}`;

    // Show modal
    modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
    modalEl.classList.remove('active');
    document.body.style.overflow = '';
}

// Setup Modal Events
function setupModalEvents() {
    // Close on overlay click
    modalEl.addEventListener('click', (e) => {
        if (e.target === modalEl) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// Render Content
function renderContent() {
    const data = database[currentProvince];
    if (!data) return;

    // Show loading
    contentEl.style.opacity = '0';
    loadingEl.classList.add('active');

    setTimeout(() => {
        // Flora
        document.getElementById('floraName').textContent = data.flora.nama;
        document.getElementById('floraLatin').textContent = data.flora.latin;
        document.getElementById('f_alias').textContent = data.flora.namaLain || '-';
        document.getElementById('f_color').textContent = data.flora.warna || '-';
        document.getElementById('f_scent').textContent = data.flora.aroma || '-';
        document.getElementById('f_height').textContent = data.flora.tinggi || '-';
        document.getElementById('f_habitat').textContent = data.flora.habitat || '-';
        document.getElementById('f_symbol').textContent = data.flora.simbol || '-';
        document.getElementById('f_culture').textContent = data.flora.budaya || '-';
        document.getElementById('f_use').textContent = data.flora.manfaat || '-';
        document.getElementById('f_identity').textContent = data.flora.identitas || '-';
        document.getElementById('f_tips').textContent = data.flora.tips || '-';

        const fStatus = document.getElementById('f_status');
        fStatus.textContent = data.flora.status;
        fStatus.className = `badge badge-${getBadgeClass(data.flora.status)}`;

        // Flora Others
        document.getElementById('floraOthers').innerHTML = renderOthersGrid(data.flora.lainnya, 'flora');

        // Fauna
        document.getElementById('faunaName').textContent = data.fauna.nama;
        document.getElementById('faunaLatin').textContent = data.fauna.latin;
        document.getElementById('a_alias').textContent = data.fauna.namaLain || '-';
        document.getElementById('a_size').textContent = data.fauna.ukuran || '-';
        document.getElementById('a_color').textContent = data.fauna.warna || '-';
        document.getElementById('a_habitat').textContent = data.fauna.habitat || '-';
        document.getElementById('a_identity').textContent = data.fauna.identitas || '-';
        document.getElementById('a_adapt').textContent = data.fauna.adaptasi || '-';

        const aStatus = document.getElementById('a_status');
        aStatus.textContent = data.fauna.status;
        aStatus.className = `badge badge-${getBadgeClass(data.fauna.status)}`;

        // Fauna Others
        document.getElementById('faunaOthers').innerHTML = renderOthersGrid(data.fauna.lainnya, 'fauna');

        // Show content
        loadingEl.classList.remove('active');
        contentEl.style.opacity = '1';
    }, 300);
}

// Start app when DOM ready
document.addEventListener('DOMContentLoaded', initApp);
