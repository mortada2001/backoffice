// Initialize Supabase
const supabaseUrl = 'https://yypcsibilseoghyadbul.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5cGNzaWJpbHNlb2doeWFkYnVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3MjU1MDAsImV4cCI6MjA1NTMwMTUwMH0.rn95k6_TQU1NlMoFImW-pnvl12kSBnRmnxsIgHbTGEQ';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// DOM Elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const messageDiv = document.getElementById('message');

// Login Function
loginBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    const { user, error } = await supabase.auth.signIn({
        email,
        password,
    });

    if (error) {
        messageDiv.textContent = error.message;
    } else {
        messageDiv.textContent = `Welcome, ${user.email}`;
    }
});

// Sign Up Function
signupBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    const { user, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        messageDiv.textContent = error.message;
    } else {
        messageDiv.textContent = `Check your email for the confirmation link!`;
    }
});
