import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

// Helper functions for daily entries
export const dailyEntriesApi = {
  // Get today's entry
  async getToday(userId) {
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('daily_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  // Set morning goal
  async setMorningGoal(userId, goal) {
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('daily_entries')
      .upsert({
        user_id: userId,
        date: today,
        morning_goal: goal,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,date'
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Complete evening check
  async completeEvening(userId, completed, reflectionNote = null) {
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('daily_entries')
      .update({
        evening_completed: completed,
        reflection_note: reflectionNote,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('date', today)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Get entries for analytics (last N days)
  async getHistory(userId, days = 30) {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    const { data, error } = await supabase
      .from('daily_entries')
      .select('*')
      .eq('user_id', userId)
      .gte('date', startDate.toISOString().split('T')[0])
      .order('date', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  // Calculate current streak
  async getStreak(userId) {
    const { data, error } = await supabase
      .from('daily_entries')
      .select('date, evening_completed')
      .eq('user_id', userId)
      .eq('evening_completed', true)
      .order('date', { ascending: false })
    
    if (error) throw error
    if (!data || data.length === 0) return 0

    let streak = 0
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    // Check if today is completed, if not start from yesterday
    const today = currentDate.toISOString().split('T')[0]
    const todayEntry = data.find(e => e.date === today)
    
    if (!todayEntry) {
      currentDate.setDate(currentDate.getDate() - 1)
    }

    for (const entry of data) {
      const entryDate = new Date(entry.date)
      entryDate.setHours(0, 0, 0, 0)
      
      const expectedDate = currentDate.toISOString().split('T')[0]
      
      if (entry.date === expectedDate) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else if (entry.date < expectedDate) {
        break
      }
    }

    return streak
  }
}
