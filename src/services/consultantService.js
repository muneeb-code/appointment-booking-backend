const supabase = require('../config/supabase');

exports.createConsultant = async ({ name, email }) => {
  if (!name || !email) {
    const err = new Error('Name and email are required for consultant');
    err.statusCode = 400;
    throw err;
  }

  const { data, error } = await supabase
    .from('consultants')
    .insert([{ name, email }])
    .select();

  if (error) throw error;
  return data[0];
};

exports.getAllConsultants = async () => {
  const { data, error } = await supabase
    .from('consultants')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;
  return data;
};