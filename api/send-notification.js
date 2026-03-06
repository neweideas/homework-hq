import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:candicenelms@gmail.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { subscription, title, body } = req.body;

  if (!subscription) return res.status(400).json({ error: 'No subscription provided' });

  try {
    await webpush.sendNotification(subscription, JSON.stringify({
      title: title || '📚 Homework HQ',
      body: body || "Time to check in! Let's get it done. 💪",
    }));
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Push error:', error);
    res.status(500).json({ error: error.message });
  }
}
