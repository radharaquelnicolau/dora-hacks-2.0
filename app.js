const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://ejblutwfvcypsultxytc.supabase.co'
const supabaseKey = 'sb_publishable_bZD3A0QN7Nx8IFzUcvomwQ_YaX2yJGd      '
const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  const { data, error } = await supabase.from('transactions').select('*')
  
  if (error) {
    console.log('Something went wrong:', error.message)
  } else {
    console.log('Connected! Here is your data:', data)
  }
}

testConnection()