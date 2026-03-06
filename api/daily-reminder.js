import webpush from 'web-push';
import { createClient } from '@supabase/supabase-js';

webpush.setVapidDetails(
  'mailto:candicenelms@gmail.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Get preferred reminder time
    const { data: settings } = await supabase
      .from('checkins')
      .select('data')
      .eq('user_id', 'reminder_settings')
      .maybeSingle();

    const preferredTime = settings?.data?.time || '17:00';
    const [prefHour, prefMin] = preferredTime.split(':').map(Number);

    // Get current time in ET
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();

    // Only send if within 15 minutes of preferred time
    const totalPref = prefHour * 60 + prefMin;
    const totalNow = currentHour * 60 + currentMin;
    if (Math.abs(totalNow - totalPref) > 15) {
      return res.status(200).json({ skipped: true, reason: `Not time yet (${currentHour}:${currentMin} vs ${preferredTime})` });
    }

    // Get all subscriptions
    const { data, error } = await supabase
      .from('push_subscriptions')
      .select('subscription');

    if (error) throw error;

    const results = await Promise.allSettled(
      (data || []).map(row =>
        webpush.sendNotification(row.subscription, JSON.stringify({
          title: '📚 Homework HQ',
          body: `${preferredTime} check-in time! Let's knock out that homework. 💪`,
        }))
      )
    );

    res.status(200).json({ sent: results.filter(r => r.status === 'fulfilled').length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
