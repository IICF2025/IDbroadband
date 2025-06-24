// Dashboard JavaScript functionality

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeNavigation();
    initializeCharts();
    initializeModals();
    updateClock();
    setInterval(updateClock, 1000);
    
    // Initialize Feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const subLinks = document.querySelectorAll('.nav-sublink');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');

    // Handle nav item expansion
    navItems.forEach(item => {
        const navLink = item.querySelector('.nav-link');
        navLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Toggle expansion
            navItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('expanded');
                    otherItem.querySelector('.nav-link').classList.remove('active');
                }
            });
            
            item.classList.toggle('expanded');
            navLink.classList.toggle('active');
        });
    });

    // Handle sublink clicks
    subLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active state from all sublinks
            subLinks.forEach(otherLink => {
                otherLink.classList.remove('active');
            });
            
            // Add active state to clicked link
            link.classList.add('active');
            
            // Show corresponding page
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
            
            // Close mobile menu
            if (sidebar) {
                sidebar.classList.remove('open');
            }
        });
    });

    // Mobile menu toggle
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            sidebar && !sidebar.contains(e.target) && 
            sidebarToggle && !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });

    // Set default active states
    const firstNavItem = document.querySelector('.nav-item[data-section="executive"]');
    const firstSubLink = document.querySelector('.nav-sublink[data-page="kpi-overview"]');
    
    if (firstNavItem) {
        firstNavItem.classList.add('expanded');
        const firstNavLink = firstNavItem.querySelector('.nav-link');
        if (firstNavLink) {
            firstNavLink.classList.add('active');
        }
    }
    
    if (firstSubLink) {
        firstSubLink.classList.add('active');
    }
}

// Page switching functionality
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Re-initialize modals for the new page
        setTimeout(() => {
            initializePageModals();
            initializePageCharts(pageId);
        }, 100);
    }
}

// Initialize page-specific charts
function initializePageCharts(pageId) {
    switch(pageId) {
        case 'regional-comparison':
            if (!document.getElementById('aseanChart').hasAttribute('data-initialized')) {
                createAseanChart();
            }
            break;
    }
}

// Clock functionality
function updateClock() {
    const now = new Date();
    const options = { 
        timeZone: 'Asia/Jakarta',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const timeString = now.toLocaleDateString('id-ID', options);
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Charts functionality
function initializeCharts() {
    // Add small delay to ensure DOM is ready
    setTimeout(() => {
        createPalapaChart();
        create5GChart();
    }, 100);
}

function createPalapaChart() {
    const ctx = document.getElementById('palapaChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Palapa Ring Barat', 'Palapa Ring Tengah', 'Palapa Ring Timur'],
            datasets: [{
                data: [69, 44, 41],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

function create5GChart() {
    const ctx = document.getElementById('deployment5gChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Lainnya'],
            datasets: [{
                label: 'Jumlah BTS 5G',
                data: [245, 98, 87, 76, 65, 404],
                backgroundColor: '#1FB8CD',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createAseanChart() {
    const ctx = document.getElementById('aseanChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Singapura', 'Malaysia', 'Vietnam', 'Thailand', 'Indonesia'],
            datasets: [{
                label: 'Kecepatan Mobile (Mbps)',
                data: [129.13, 105.36, 86.96, 65.47, 28.94],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    ctx.setAttribute('data-initialized', 'true');
}

// Modal functionality
function initializeModals() {
    // Clear any existing event listeners
    document.removeEventListener('keydown', handleEscapeKey);
    
    // Initialize modals for the current page
    initializePageModals();
    
    // Add global escape key listener
    document.addEventListener('keydown', handleEscapeKey);
}

function initializePageModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');

    if (!modalOverlay || !modalClose) {
        console.error('Modal elements not found');
        return;
    }

    // Remove existing event listeners by cloning and replacing the close button
    const newModalClose = modalClose.cloneNode(true);
    modalClose.parentNode.replaceChild(newModalClose, modalClose);
    
    // Add click event listener to the new close button
    newModalClose.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
    });

    // Add click listeners to all modal triggers
    modalTriggers.forEach(trigger => {
        // Remove existing listeners by cloning
        const newTrigger = trigger.cloneNode(true);
        trigger.parentNode.replaceChild(newTrigger, trigger);
        
        // Add fresh click listener
        newTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const modalId = newTrigger.getAttribute('data-modal');
            showModal(modalId);
        });
        
        // Add visual indication that items are clickable
        newTrigger.style.cursor = 'pointer';
        newTrigger.setAttribute('tabindex', '0');
        
        // Add keyboard support
        newTrigger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const modalId = newTrigger.getAttribute('data-modal');
                showModal(modalId);
            }
        });
    });

    // Add overlay click handler to close modal
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

function showModal(modalId) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (!modalOverlay || !modalTitle || !modalBody) {
        console.error('Modal elements not found');
        return;
    }

    const content = getModalContent(modalId);
    modalTitle.textContent = content.title;
    modalBody.innerHTML = content.body;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    setTimeout(() => {
        const closeBtn = document.getElementById('modal-close');
        if (closeBtn) {
            closeBtn.focus();
        }
    }, 50);
}

function closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Modal content data
function getModalContent(modalId) {
    const modalData = {
        'internet-penetration': {
            title: 'Penetrasi Internet Indonesia',
            body: `
                <h4>Analisis Penetrasi Internet 2024</h4>
                <p>Indonesia mencapai tingkat penetrasi internet 79.5% pada tahun 2024, menunjukkan peningkatan signifikan 2.3% dari tahun sebelumnya.</p>
                
                <h4>Faktor Pendorong:</h4>
                <ul>
                    <li>Ekspansi infrastruktur telekomunikasi ke daerah terpencil</li>
                    <li>Program literasi digital pemerintah</li>
                    <li>Peningkatan affordability perangkat mobile</li>
                    <li>Pertumbuhan layanan digital dan e-commerce</li>
                </ul>
                
                <h4>Target 2030:</h4>
                <p>Mencapai penetrasi internet 95% untuk universal meaningful connectivity sesuai target ITU dan SDGs.</p>
                
                <h4>Tantangan:</h4>
                <ul>
                    <li>Kesenjangan digital urban-rural masih signifikan</li>
                    <li>Infrastruktur di daerah 3T perlu diperkuat</li>
                    <li>Peningkatan digital skills masyarakat</li>
                </ul>
            `
        },
        'broadband-speed': {
            title: 'Kecepatan Broadband Indonesia',
            body: `
                <h4>Performa Kecepatan 2024</h4>
                <p><strong>Mobile Broadband:</strong> 28.94 Mbps (rata-rata nasional)<br>
                <strong>Fixed Broadband:</strong> 32.07 Mbps (rata-rata nasional)</p>
                
                <h4>Distribusi Regional:</h4>
                <ul>
                    <li>Jakarta & sekitarnya: 45-60 Mbps</li>
                    <li>Kota-kota besar Jawa: 35-45 Mbps</li>
                    <li>Kota-kota besar luar Jawa: 25-35 Mbps</li>
                    <li>Daerah rural: 10-20 Mbps</li>
                </ul>
                
                <h4>Benchmarking ASEAN:</h4>
                <p>Indonesia berada di posisi ke-5 dari 5 negara ASEAN utama, masih tertinggal dari target regional.</p>
                
                <h4>Strategi Peningkatan:</h4>
                <ul>
                    <li>Implementasi 5G di 56 kota prioritas</li>
                    <li>Optimalisasi Palapa Ring untuk backbone</li>
                    <li>Investasi fiber to the home (FTTH)</li>
                    <li>Teknologi HAPS untuk daerah sulit dijangkau</li>
                </ul>
            `
        },
        'digital-skills': {
            title: 'Keterampilan Digital Masyarakat',
            body: `
                <h4>Status Digital Skills 2024</h4>
                <p>43.7% populasi dewasa Indonesia memiliki keterampilan digital dasar, menunjukkan gap yang perlu diatasi untuk transformasi digital nasional.</p>
                
                <h4>Kategori Keterampilan:</h4>
                <ul>
                    <li><strong>Basic Digital Literacy:</strong> 43.7%</li>
                    <li><strong>Intermediate Skills:</strong> 24.3%</li>
                    <li><strong>Advanced Skills:</strong> 8.1%</li>
                    <li><strong>Professional ICT Skills:</strong> 3.2%</li>
                </ul>
                
                <h4>Program Pemerintah:</h4>
                <ul>
                    <li>Digital Talent Scholarship (DTS) - 100,000 peserta/tahun</li>
                    <li>Gerakan Nasional 1000 Startup Digital</li>
                    <li>Program Digital Literacy di sekolah</li>
                    <li>Pelatihan UMKM Go Digital</li>
                </ul>
                
                <h4>Target 2030:</h4>
                <p>Mencapai 80% populasi dengan basic digital skills dan 25% dengan advanced skills untuk mendukung ekonomi digital.</p>
            `
        },
        'cybersecurity-index': {
            title: 'Indeks Cybersecurity Indonesia',
            body: `
                <h4>Skor Cybersecurity 2024</h4>
                <p>Indonesia meraih skor 6.2 dari 10 dalam Global Cybersecurity Index (GCI), menunjukkan perlunya peningkatan signifikan.</p>
                
                <h4>Breakdown Skor:</h4>
                <ul>
                    <li><strong>Legal Framework:</strong> 7.1/10</li>
                    <li><strong>Technical Measures:</strong> 6.8/10</li>
                    <li><strong>Organizational:</strong> 5.9/10</li>
                    <li><strong>Capacity Building:</strong> 5.8/10</li>
                    <li><strong>Cooperation:</strong> 6.1/10</li>
                </ul>
                
                <h4>Ancaman Utama:</h4>
                <ul>
                    <li>Ransomware attacks - naik 300% di 2024</li>
                    <li>Data breaches sektor finansial</li>
                    <li>Serangan pada infrastruktur kritis</li>
                    <li>Social engineering dan phishing</li>
                </ul>
                
                <h4>Strategi Penguatan:</h4>
                <ul>
                    <li>Implementasi Cyber Security Framework Nasional</li>
                    <li>Pembentukan SOC (Security Operations Center) regional</li>
                    <li>Sertifikasi wajib untuk sektor kritis</li>
                    <li>Peningkatan awareness cybersecurity</li>
                </ul>
            `
        },
        'palapa-utilization': {
            title: 'Utilisasi Palapa Ring',
            body: `
                <h4>Status Palapa Ring 2024</h4>
                <p>Infrastruktur backbone fiber optik nasional dengan total panjang 112,743 km menunjukkan utilisasi yang bervariasi antar wilayah.</p>
                
                <h4>Utilisasi per Wilayah:</h4>
                <ul>
                    <li><strong>Palapa Ring Barat:</strong> 69% - Jawa, Sumatera, Kalimantan Barat</li>
                    <li><strong>Palapa Ring Tengah:</strong> 44% - Kalimantan Timur, Sulawesi, Nusa Tenggara</li>
                    <li><strong>Palapa Ring Timur:</strong> 41% - Maluku, Papua</li>
                </ul>
                
                <h4>Dampak Ekonomi:</h4>
                <ul>
                    <li>Pengurangan biaya internet hingga 30% di daerah terlayani</li>
                    <li>Peningkatan kualitas layanan broadband</li>
                    <li>Dukungan untuk smart city dan digital government</li>
                    <li>Enabler untuk ekonomi digital regional</li>
                </ul>
                
                <h4>Rencana Optimalisasi:</h4>
                <ul>
                    <li>Peningkatan kapasitas link congested corridors</li>
                    <li>Integrasi dengan jaringan internasional</li>
                    <li>Pengembangan edge computing nodes</li>
                    <li>Redundancy dan resilience enhancement</li>
                </ul>
            `
        },
        '5g-deployment': {
            title: 'Deployment 5G Indonesia',
            body: `
                <h4>Status Deployment 5G 2024</h4>
                <p>Indonesia telah memiliki 975 Base Transceiver Station (BTS) 5G yang tersebar di 56 kota dengan fokus pada area urban dan komersial.</p>
                
                <h4>Distribusi BTS 5G:</h4>
                <ul>
                    <li><strong>Jakarta & Satelit:</strong> 245 BTS (25%)</li>
                    <li><strong>Surabaya:</strong> 98 BTS (10%)</li>
                    <li><strong>Bandung:</strong> 87 BTS (9%)</li>
                    <li><strong>Medan:</strong> 76 BTS (8%)</li>
                    <li><strong>Semarang:</strong> 65 BTS (7%)</li>
                    <li><strong>Kota Lainnya:</strong> 404 BTS (41%)</li>
                </ul>
                
                <h4>Use Cases Prioritas:</h4>
                <ul>
                    <li>Enhanced Mobile Broadband (eMBB)</li>
                    <li>Industrial IoT dan Industry 4.0</li>
                    <li>Smart city applications</li>
                    <li>Autonomous vehicles pilot</li>
                    <li>AR/VR applications</li>
                </ul>
                
                <h4>Target 2025-2030:</h4>
                <ul>
                    <li>2025: 5,000 BTS di 100 kota</li>
                    <li>2030: 50,000 BTS coverage nasional</li>
                    <li>Focus on industry 4.0 dan smart cities</li>
                </ul>
            `
        },
        'asean-comparison': {
            title: 'Benchmarking ASEAN',
            body: `
                <h4>Perbandingan Kecepatan Mobile Broadband</h4>
                <p>Indonesia berada di posisi terakhir dalam kecepatan mobile broadband di antara 5 negara ASEAN utama.</p>
                
                <h4>Ranking ASEAN 2024:</h4>
                <ul>
                    <li><strong>1. Singapura:</strong> 129.13 Mbps (+346% vs Indonesia)</li>
                    <li><strong>2. Malaysia:</strong> 105.36 Mbps (+264% vs Indonesia)</li>
                    <li><strong>3. Vietnam:</strong> 86.96 Mbps (+200% vs Indonesia)</li>
                    <li><strong>4. Thailand:</strong> 65.47 Mbps (+126% vs Indonesia)</li>
                    <li><strong>5. Indonesia:</strong> 28.94 Mbps (baseline)</li>
                </ul>
                
                <h4>Faktor Penyebab Gap:</h4>
                <ul>
                    <li>Geografis kepulauan yang kompleks</li>
                    <li>Investasi infrastruktur per kapita lebih rendah</li>
                    <li>Regulasi dan perizinan yang belum optimal</li>
                    <li>Kompetisi operator yang perlu diperkuat</li>
                </ul>
                
                <h4>Strategi Catching Up:</h4>
                <ul>
                    <li>Akselerasi 5G deployment</li>
                    <li>Optimalisasi spektrum allocation</li>
                    <li>Infrastructure sharing policy</li>
                    <li>Investment incentives untuk operator</li>
                </ul>
            `
        },
        'coverage-target': {
            title: 'Target Cakupan 2030',
            body: `
                <h4>Progress Cakupan Universal</h4>
                <p>Saat ini 78% dari target cakupan 95% telah tercapai, dengan fokus pada meaningful connectivity.</p>
                
                <h4>Status Cakupan Saat Ini:</h4>
                <ul>
                    <li><strong>Urban:</strong> 89.2% population coverage</li>
                    <li><strong>Rural:</strong> 45.3% population coverage</li>
                    <li><strong>Remote areas:</strong> 23.1% coverage</li>
                    <li><strong>Overall:</strong> 73.8% population coverage</li>
                </ul>
                
                <h4>Definisi Meaningful Connectivity:</h4>
                <ul>
                    <li>Minimum 10 Mbps download speed</li>
                    <li>Unlimited data atau high data caps</li>
                    <li>Affordability < 2% of monthly income</li>
                    <li>Accessible devices and digital skills</li>
                </ul>
                
                <h4>Strategi Pencapaian 2030:</h4>
                <ul>
                    <li>HAPS deployment untuk remote areas</li>
                    <li>Satellite constellation untuk universal coverage</li>
                    <li>Community networks dan sharing economy</li>
                    <li>Subsidi akses untuk masyarakat kurang mampu</li>
                </ul>
            `
        },
        'speed-target': {
            title: 'Target Kecepatan 2030',
            body: `
                <h4>Progress Kecepatan Nasional</h4>
                <p>48% dari target kecepatan minimum 60 Mbps telah tercapai dengan kecepatan rata-rata saat ini 28.94 Mbps.</p>
                
                <h4>Target Kecepatan ITU 2030:</h4>
                <ul>
                    <li><strong>Mobile Broadband:</strong> 60 Mbps minimum</li>
                    <li><strong>Fixed Broadband:</strong> 100 Mbps minimum</li>
                    <li><strong>Low latency:</strong> < 20ms untuk aplikasi real-time</li>
                    <li><strong>High reliability:</strong> 99.9% uptime</li>
                </ul>
                
                <h4>Roadmap Peningkatan:</h4>
                <ul>
                    <li><strong>2025:</strong> 45 Mbps rata-rata mobile</li>
                    <li><strong>2027:</strong> 55 Mbps rata-rata mobile</li>
                    <li><strong>2030:</strong> 65 Mbps rata-rata mobile</li>
                </ul>
                
                <h4>Investasi Diperlukan:</h4>
                <ul>
                    <li>USD 6.0 billion untuk infrastruktur</li>
                    <li>Focus pada fiber densification</li>
                    <li>5G massive deployment</li>
                    <li>Network optimization dan modernization</li>
                </ul>
            `
        },
        'haps-coverage': {
            title: 'Cakupan HAPS per Platform',
            body: `
                <h4>High Altitude Platform Systems (HAPS)</h4>
                <p>Setiap platform HAPS dapat memberikan cakupan area hingga 7,500 km² pada ketinggian operasi 17-24 km.</p>
                
                <h4>Spesifikasi Teknis:</h4>
                <ul>
                    <li><strong>Altitude:</strong> 17-24 km (stratosfer)</li>
                    <li><strong>Coverage diameter:</strong> ~100 km per platform</li>
                    <li><strong>Capacity:</strong> Hingga 1 Gbps aggregate</li>
                    <li><strong>Endurance:</strong> 24/7 operation capability</li>
                </ul>
                
                <h4>Keunggulan HAPS:</h4>
                <ul>
                    <li>Deployment cepat untuk area sulit dijangkau</li>
                    <li>Biaya operasional lebih rendah vs terrestrial</li>
                    <li>Fleksibilitas coverage sesuai kebutuhan</li>
                    <li>Disaster recovery dan emergency communications</li>
                </ul>
                
                <h4>Partnership Mitratel-Aalto:</h4>
                <ul>
                    <li>Target commercial operation 2026</li>
                    <li>Phase 1: 10 platforms untuk Kalimantan & Papua</li>
                    <li>Phase 2: Expansion ke seluruh Indonesia timur</li>
                    <li>Integration dengan existing network Telkomsel</li>
                </ul>
            `
        },
        'haps-latency': {
            title: 'Latency HAPS Ultra-Low',
            body: `
                <h4>Performa Latency HAPS</h4>
                <p>Teknologi HAPS menawarkan latency ultra-low 5-10ms, mendekati performa jaringan terrestrial dengan jangkauan yang lebih luas.</p>
                
                <h4>Perbandingan Latency:</h4>
                <ul>
                    <li><strong>HAPS:</strong> 5-10ms (target)</li>
                    <li><strong>LEO Satellite:</strong> 20-40ms</li>
                    <li><strong>GEO Satellite:</strong> 500-600ms</li>
                    <li><strong>Terrestrial 4G:</strong> 30-50ms</li>
                    <li><strong>Terrestrial 5G:</strong> 1-10ms</li>
                </ul>
                
                <h4>Aplikasi Ultra-Low Latency:</h4>
                <ul>
                    <li>Industrial IoT dan automation</li>
                    <li>Autonomous vehicle communications</li>
                    <li>Real-time gaming dan AR/VR</li>
                    <li>Telemedicine dan remote surgery</li>
                    <li>Financial trading applications</li>
                </ul>
                
                <h4>Teknologi Pendukung:</h4>
                <ul>
                    <li>Edge computing di platform HAPS</li>
                    <li>Advanced antenna systems</li>
                    <li>Optimized routing protocols</li>
                    <li>Integration dengan 5G core network</li>
                </ul>
            `
        }
    };
    
    return modalData[modalId] || {
        title: 'Informasi',
        body: '<p>Konten tidak tersedia untuk item ini.</p>'
    };
}

// Utility functions
function formatNumber(num) {
    return new Intl.NumberFormat('id-ID').format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(num);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Alt + M to toggle mobile menu
    if (e.altKey && e.key === 'm') {
        e.preventDefault();
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
    }
});

// Performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Optimize resize handling
window.addEventListener('resize', debounce(() => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar && window.innerWidth > 768) {
        sidebar.classList.remove('open');
    }
}, 250));

// Error handling for charts
window.addEventListener('error', (e) => {
    console.warn('Chart error handled:', e.message);
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});