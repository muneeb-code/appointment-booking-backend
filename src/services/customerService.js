const supabase = require('../config/supabase');

exports.createCustomer = async ({ name, email }) => {
  if (!name || !email) {
    const err = new Error('Name and email are required for customer');
    err.statusCode = 400;
    throw err;
  }

  const { data, error } = await supabase
    .from('customers')
    .insert([{ name, email }])
    .select();

  if (error) throw error;
  return data[0];
};

exports.getAllCustomers = async () => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;
  return data;
};