  (function() {

            // ---------- AUTO-TYPE INFINITE LOOP ----------
            const words = ["Web Development", "Frontend Dev", "Full Stack", "UI/UX Design"];
            let wordIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            const typeSpan = document.getElementById('autoTypeText');

            function typeEffect() {
                const currentWord = words[wordIndex];
                if (isDeleting) {
                    typeSpan.textContent = currentWord.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typeSpan.textContent = currentWord.substring(0, charIndex + 1);
                    charIndex++;
                }

                let speed = isDeleting ? 50 : 100;

                if (!isDeleting && charIndex === currentWord.length) {
                    speed = 1800;
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    speed = 300;
                }
                setTimeout(typeEffect, speed);
            }
            typeEffect();

            // ---------- DOM REFS ----------
            const form = document.getElementById('registerForm');
            const fullName = document.getElementById('fullName');
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const confirmPw = document.getElementById('confirmPassword');
            const dob = document.getElementById('dob');
            const course = document.getElementById('course');
            const phone = document.getElementById('phone');
            const address = document.getElementById('address');
            const genderRadios = document.querySelectorAll('input[name="gender"]');

            const nameErr = document.getElementById('fullNameError');
            const emailErr = document.getElementById('emailError');
            const passErr = document.getElementById('passwordError');
            const confirmErr = document.getElementById('confirmError');
            const dobErr = document.getElementById('dobError');
            const courseErr = document.getElementById('courseError');
            const phoneErr = document.getElementById('phoneError');
            const addressErr = document.getElementById('addressError');
            const genderErr = document.getElementById('genderError');

            const strengthFill = document.getElementById('strengthFill');
            const strengthText = document.getElementById('strengthText');

            const themeToggle = document.getElementById('themeToggle');
            const togglePwBtn = document.getElementById('togglePassword');
            const toggleConfirmBtn = document.getElementById('toggleConfirmPassword');
            const popup = document.getElementById('successPopup');

            // ---------- THEME TOGGLE ----------
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark');
                const icon = this.querySelector('i');
                const span = this.querySelector('span');
                if (document.body.classList.contains('dark')) {
                    icon.className = 'fas fa-sun';
                    span.textContent = 'Light';
                } else {
                    icon.className = 'fas fa-moon';
                    span.textContent = 'Dark';
                }
            });

            // ---------- PASSWORD SHOW/HIDE (main) ----------
            togglePwBtn.addEventListener('click', function() {
                const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
                password.setAttribute('type', type);
                this.querySelector('i').classList.toggle('fa-eye');
                this.querySelector('i').classList.toggle('fa-eye-slash');
            });

            // ---------- CONFIRM PASSWORD SHOW/HIDE ----------
            toggleConfirmBtn.addEventListener('click', function() {
                const type = confirmPw.getAttribute('type') === 'password' ? 'text' : 'password';
                confirmPw.setAttribute('type', type);
                this.querySelector('i').classList.toggle('fa-eye');
                this.querySelector('i').classList.toggle('fa-eye-slash');
            });

            // ---------- PASSWORD STRENGTH ----------
            password.addEventListener('input', function() {
                const val = this.value;
                let strength = 0;
                if (val.length >= 8) strength++;
                if (/[a-z]/.test(val) && /[A-Z]/.test(val)) strength++;
                if (/\d/.test(val)) strength++;
                if (/[^a-zA-Z0-9]/.test(val)) strength++;

                const fill = strengthFill;
                const text = strengthText;
                if (val.length === 0) {
                    fill.style.width = '0%';
                    fill.style.background = '#e74c3c';
                    text.textContent = 'weak';
                    return;
                }
                if (strength === 0 || strength === 1) {
                    fill.style.width = '25%';
                    fill.style.background = '#e74c3c';
                    text.textContent = 'weak';
                } else if (strength === 2) {
                    fill.style.width = '50%';
                    fill.style.background = '#f39c12';
                    text.textContent = 'medium';
                } else if (strength === 3) {
                    fill.style.width = '75%';
                    fill.style.background = '#2ecc71';
                    text.textContent = 'strong';
                } else {
                    fill.style.width = '100%';
                    fill.style.background = '#27ae60';
                    text.textContent = 'very strong';
                }
            });

            // ---------- VALIDATION ----------
            function clearErrors() {
                [nameErr, emailErr, passErr, confirmErr, dobErr, courseErr, phoneErr, addressErr, genderErr].forEach(e => e
                    .textContent = '');
            }

            function setError(el, msg) {
                el.textContent = msg;
            }

            form.addEventListener('submit', function(e) {
                e.preventDefault();
                clearErrors();
                let isValid = true;

                if (!fullName.value.trim()) {
                    setError(nameErr, 'Full name is required');
                    isValid = false;
                }

                const emailVal = email.value.trim();
                if (!emailVal) {
                    setError(emailErr, 'Email is required');
                    isValid = false;
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
                    setError(emailErr, 'Enter a valid email');
                    isValid = false;
                }

                const pw = password.value;
                if (!pw) {
                    setError(passErr, 'Password is required');
                    isValid = false;
                } else if (pw.length < 8) {
                    setError(passErr, 'Minimum 8 characters');
                    isValid = false;
                } else if (!/[a-zA-Z]/.test(pw) || !/\d/.test(pw) || !/[^a-zA-Z0-9]/.test(pw)) {
                    setError(passErr, 'Include letter, number & symbol');
                    isValid = false;
                }

                if (pw !== confirmPw.value) {
                    setError(confirmErr, 'Passwords do not match');
                    isValid = false;
                }

                if (!dob.value) {
                    setError(dobErr, 'Date of birth required');
                    isValid = false;
                }

                const genderSelected = Array.from(genderRadios).some(r => r.checked);
                if (!genderSelected) {
                    setError(genderErr, 'Select a gender');
                    isValid = false;
                }

                if (!course.value) {
                    setError(courseErr, 'Please select a course');
                    isValid = false;
                }

                if (!phone.value.trim()) {
                    setError(phoneErr, 'Phone number required');
                    isValid = false;
                }

                if (!address.value.trim()) {
                    setError(addressErr, 'Address is required');
                    isValid = false;
                }

                if (!isValid) return;
                popup.classList.add('active');
            });

            // ---------- CLOSE POPUP ----------
            window.closePopup = function() {
                popup.classList.remove('active');
                form.reset();
                strengthFill.style.width = '0%';
                strengthText.textContent = 'weak';
                clearErrors();
                password.setAttribute('type', 'password');
                confirmPw.setAttribute('type', 'password');
                togglePwBtn.querySelector('i').classList.remove('fa-eye-slash');
                togglePwBtn.querySelector('i').classList.add('fa-eye');
                toggleConfirmBtn.querySelector('i').classList.remove('fa-eye-slash');
                toggleConfirmBtn.querySelector('i').classList.add('fa-eye');
            };

            popup.addEventListener('click', function(e) {
                if (e.target === this) closePopup();
            });

        })();
