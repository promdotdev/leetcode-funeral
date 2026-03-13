import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface MysteryPlayer {
  id: string;
  name: string;
  session_id: string;
  clue_count: number;
  suspect_count: number;
  solved: boolean;
  created_at: string;
  updated_at: string;
}

export async function upsertPlayer(sessionId: string, name: string): Promise<MysteryPlayer | null> {
  const { data, error } = await supabase
    .from('mystery_players')
    .upsert(
      { session_id: sessionId, name },
      { onConflict: 'session_id' }
    )
    .select()
    .single();

  if (error) {
    console.error('Failed to upsert player:', error);
    return null;
  }
  return data as MysteryPlayer;
}

export async function updatePlayerProgress(
  sessionId: string,
  clueCount: number,
  suspectCount: number,
  solved: boolean
) {
  const { error } = await supabase
    .from('mystery_players')
    .update({
      clue_count: clueCount,
      suspect_count: suspectCount,
      solved,
      updated_at: new Date().toISOString(),
    })
    .eq('session_id', sessionId);

  if (error) {
    console.error('Failed to update progress:', error);
  }
}

export async function fetchLeaderboard(): Promise<MysteryPlayer[]> {
  const { data, error } = await supabase
    .from('mystery_players')
    .select('*')
    .order('clue_count', { ascending: false })
    .order('created_at', { ascending: true })
    .limit(50);

  if (error) {
    console.error('Failed to fetch leaderboard:', error);
    return [];
  }
  return (data as MysteryPlayer[]) || [];
}
