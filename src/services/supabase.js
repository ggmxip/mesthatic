import { createClient } from '@supabase/supabase-js'
import config from '../config'

let supabaseClient = null

export const getSupabaseClient = () => {
  if (!supabaseClient && config.supabase.url && config.supabase.anonKey) {
    supabaseClient = createClient(config.supabase.url, config.supabase.anonKey)
  }
  return supabaseClient
}

export const fetchContent = async (table, filters = {}) => {
  const client = getSupabaseClient()
  if (!client) return null

  let query = client.from(table).select('*')
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value) query = query.eq(key, value)
  })
  
  const { data, error } = await query
  if (error) throw error
  return data
}

export const subscribeToRealtime = (table, callback) => {
  const client = getSupabaseClient()
  if (!client) return () => {}

  return client
    .channel(`public:${table}`)
    .on('postgres_changes', { event: '*', schema: 'public', table }, callback)
    .subscribe()
}

export const fetchCaseStudies = async (options = {}) => {
  const { publishedOnly = true } = options
  let query = fetchContent('case_studies')
  
  if (publishedOnly) {
    query = query.eq('published', true)
  }
  
  return query
}