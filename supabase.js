// supabase.js (Shared initialization)
const supabaseUrl = "https://yypcsibilseoghyadbul.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5cGNzaWJpbHNlb2doeWFkYnVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3MjU1MDAsImV4cCI6MjA1NTMwMTUwMH0.rn95k6_TQU1NlMoFImW-pnvl12kSBnRmnxsIgHbTGEQ";

// Initialize Supabase
window.supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Function to check if user is logged in
async function checkSession() {
    const { data: { user } } = await window.supabase.auth.getUser();
    return user;
}

// Logout function
async function logout() {
    if (window.supabase) {
        try {
            const { error } = await window.supabase.auth.signOut();
            if (error) {
                console.error("Logout failed:", error);
            } else {
                console.log("Logout successful");
                window.location.href = "login.html"; // Redirect to login page
            }
        } catch (err) {
            console.error("Unexpected error during logout:", err);
        }
    } else {
        console.error("Supabase is not initialized.");
    }
}
