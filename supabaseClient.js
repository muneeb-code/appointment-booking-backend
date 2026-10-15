require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;

// Secret Key (Service Role Key) backend permissions ke liye behtar hoti hai
// Agar Secret Key na mile to Publishable Key handle ho jayegi
const supabaseKey =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env file");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
