// Menandatangani langganan channel Apinator untuk Ular Tangga Motivasi mode banyak HP.
// Rahasianya hanya ada di environment variable Vercel APINATOR_SECRET, tidak di repo.
const crypto = require('crypto');

const KEY = 'app_2e1a7e688b9fbd51eba3962a210a8a1800f9599b';

module.exports = (req, res) => {
  const { socket_id: socketId, channel_name: channel } = req.body || {};
  if (req.method !== 'POST' || !process.env.APINATOR_SECRET ||
      !/^[\w.-]{1,64}$/.test(socketId || '') || !/^private-ut-[A-Z0-9]{5}$/.test(channel || '')) {
    return res.status(403).json({ error: 'ditolak' });
  }
  const sig = crypto.createHmac('sha256', process.env.APINATOR_SECRET)
    .update(`${socketId}:${channel}`).digest('hex');
  res.json({ auth: `${KEY}:${sig}` });
};
