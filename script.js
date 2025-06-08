document.addEventListener('DOMContentLoaded', function() {
    const landingPage = document.getElementById('landing-page');
    const mainContent = document.getElementById('main-content');
    const decryptButton = document.getElementById('decrypt-button');
    const audioPermissionMessage = document.getElementById('audio-permission-message'); // Elemen pesan audio
    const backgroundAudio = document.getElementById('background-audio'); // Elemen audio

    const textElement = document.getElementById('typing-text');
    const textToType = 'Connecting to HADZIQIYYAH_NETWORK... Access Granted.';
    let i = 0;
    let speed = 70; // Kecepatan ketikan untuk header

    // Fungsi untuk efek ketikan di header utama
    function typeWriter() {
        if (i < textToType.length) {
            textElement.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            textElement.style.borderRight = 'none'; // Hapus cursor berkedip setelah selesai
        }
    }

    // Tampilkan pesan audio setelah beberapa detik (misalnya, setelah teks terminal muncul)
    setTimeout(() => {
        audioPermissionMessage.classList.add('visible');
    }, 3000); // Tampil setelah 3 detik

    // Event listener untuk tombol decrypt
    decryptButton.addEventListener('click', function() {
        // Coba putar audio saat tombol diklik
        const playPromise = backgroundAudio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Audio berhasil diputar
                console.log("Audio started successfully.");
            }).catch(error => {
                // Autoplay diblokir atau error lainnya.
                // Informasikan pengguna secara halus jika audio tidak bisa diputar
                console.error("Audio playback blocked or failed:", error);
                // Anda bisa menambahkan pesan di UI jika audio tidak bisa diputar
                // audioPermissionMessage.innerHTML = "<p>Playback blocked. Please enable media autoplay or click anywhere to play.</p>";
                // audioPermissionMessage.classList.add('visible');
            });
        }

        // Lanjutkan transisi halaman seperti sebelumnya
        landingPage.style.opacity = '0';
        landingPage.addEventListener('transitionend', function() {
            landingPage.classList.add('hidden');

            setTimeout(() => {
                mainContent.classList.remove('hidden');
                mainContent.classList.add('visible');
                typeWriter();
            }, 100);
        }, { once: true });
    });
});
