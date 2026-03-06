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
  // Verify this is called from Vercel cron
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Get all push subscriptions from Supabase
    const { data, error } = await supabase
      .from('push_subscriptions')
      .select('subscription');

    if (error) throw error;

    const results = await Promise.allSettled(
      (data || []).map(row =>
        webpush.sendNotification(row.subscription, JSON.stringify({
          title: '📚 Homework HQ',
          body: "5 PM check-in time! Let's knock out that homework. 💪",
        }))
      )
    );

    res.status(200).json({ sent: results.filter(r => r.status === 'fulfilled').length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
