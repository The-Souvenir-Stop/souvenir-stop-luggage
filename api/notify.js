const RESEND_API_KEY = 're_KNebPSpp_EGMBHgwM1YNaWcoTx5z23AFE';
const STORE_EMAIL = 'info@thesouvenirstop.com';
const FROM_EMAIL = 'info@thesouvenirstop.com';
const STORE_NAME = 'The Souvenir Stop';
const STORE_ADDRESS = '225 W 34th Street, New York, NY 10122';
const STORE_PHONE = '(917) 886-0073';
const STORE_WHATSAPP = 'https://wa.me/19178860073';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const { id, name, email, phone, bags, dropoff, pickup, dropoff_time, pickup_time, total, mode } = req.body;

  function formatTime(t) {
    const [h, m] = t.split(':').map(Number);
    return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
  }

  function formatDate(d) {
    const date = new Date(d + 'T12:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
  }

  const pricingMode = mode === 'hourly' ? 'Hourly rate' : 'Full day rate';

  // Customer confirmation email
  const customerHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f7f7f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    
    <div style="background:#000;border-radius:16px 16px 0 0;padding:32px 24px;text-align:center;">
      <div style="font-size:28px;font-weight:900;color:#fff;letter-spacing:0.08em;">THE SOUVENIR STOP</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.8);margin-top:6px;">🧳 Luggage Storage · New York City</div>
    </div>

    <div style="background:#fff;padding:32px 24px;text-align:center;border-left:1px solid #e8e8e5;border-right:1px solid #e8e8e5;">
      <div style="font-size:40px;">🎉</div>
      <div style="font-size:20px;font-weight:700;color:#2E7D32;margin-top:12px;">Booking Confirmed!</div>
      <div style="font-size:13px;color:#555;margin-top:6px;">Hi ${name.split(' ')[0]}, your luggage storage is all set.</div>
      
      <div style="background:#E8F5E9;border:2px solid #81C784;border-radius:12px;padding:20px;margin:24px 0;display:inline-block;min-width:200px;">
        <div style="font-size:11px;color:#388E3C;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;">Booking ID</div>
        <div style="font-size:36px;font-weight:900;color:#2E7D32;letter-spacing:0.08em;margin-top:4px;">${id}</div>
        <div style="font-size:12px;color:#388E3C;margin-top:4px;">Show this at the store</div>
      </div>
    </div>

    <div style="background:#fff;padding:24px;border-left:1px solid #e8e8e5;border-right:1px solid #e8e8e5;border-top:1px solid #f0f0ee;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#388dec;margin-bottom:16px;">📋 Booking Details</div>
      
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid #f0f0ee;">
          <td style="padding:10px 0;font-size:13px;color:#777;width:40%;">Bags</td>
          <td style="padding:10px 0;font-size:13px;color:#1a1a18;font-weight:500;">${bags}</td>
        </tr>
        <tr style="border-bottom:1px solid #f0f0ee;">
          <td style="padding:10px 0;font-size:13px;color:#777;">Drop-off</td>
          <td style="padding:10px 0;font-size:13px;color:#1a1a18;font-weight:500;">${formatDate(dropoff)} at ${formatTime(dropoff_time)}</td>
        </tr>
        <tr style="border-bottom:1px solid #f0f0ee;">
          <td style="padding:10px 0;font-size:13px;color:#777;">Pick-up</td>
          <td style="padding:10px 0;font-size:13px;color:#1a1a18;font-weight:500;">${formatDate(pickup)} at ${formatTime(pickup_time)}</td>
        </tr>
        <tr style="border-bottom:1px solid #f0f0ee;">
          <td style="padding:10px 0;font-size:13px;color:#777;">Pricing</td>
          <td style="padding:10px 0;font-size:13px;color:#1a1a18;font-weight:500;">${pricingMode}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;font-size:15px;color:#1a1a18;font-weight:700;">Total Due</td>
          <td style="padding:10px 0;font-size:15px;color:#388dec;font-weight:700;">$${Number(total).toFixed(2)} — Pay at store</td>
        </tr>
      </table>
    </div>

    <div style="background:#FFF8E1;border-left:4px solid #F9A825;padding:16px 24px;border-right:1px solid #e8e8e5;">
      <div style="font-size:12px;color:#E65100;line-height:1.6;">
        <strong>⚠️ Late Check-out Fee:</strong> Bags not collected at your scheduled pick-up time will incur an additional charge at the standard hourly rate. If you anticipate a delay, please contact us in advance via WhatsApp.
      </div>
    </div>

    <div style="background:#fff;padding:24px;border-left:1px solid #e8e8e5;border-right:1px solid #e8e8e5;border-top:1px solid #f0f0ee;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#388dec;margin-bottom:16px;">📍 Find Us</div>
      <div style="font-size:14px;color:#1a1a18;font-weight:600;">${STORE_NAME}</div>
      <div style="font-size:13px;color:#555;margin-top:4px;">${STORE_ADDRESS}</div>
      <div style="margin-top:16px;display:flex;gap:12px;">
        <a href="tel:+19178860073" style="font-size:12px;color:#388dec;text-decoration:none;">📞 ${STORE_PHONE}</a>
        &nbsp;&nbsp;
        <a href="${STORE_WHATSAPP}" style="font-size:12px;color:#25D366;text-decoration:none;">💬 WhatsApp Us</a>
      </div>
    </div>

    <div style="background:#000;border-radius:0 0 16px 16px;padding:20px 24px;text-align:center;">
      <div style="font-size:12px;color:rgba(255,255,255,0.6);">© 2026 The Souvenir Stop · 225 W 34th Street, New York, NY 10122</div>
    </div>

  </div>
</body>
</html>`;

  // Store notification email
  const storeHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:20px;background:#f7f7f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;border:1px solid #e8e8e5;overflow:hidden;">
    <div style="background:#388dec;padding:20px 24px;">
      <div style="font-size:16px;font-weight:700;color:#fff;">🎒 New Luggage Storage Booking!</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.85);margin-top:4px;">Booking ID: <strong>${id}</strong></div>
    </div>
    <div style="padding:24px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid #f0f0ee;">
          <td style="padding:10px 0;font-size:13px;color:#777;width:35%;">Customer</td>
          <td style="padding:10px 0;font-size:13px;color:#1a1a18;font-weight:600;">${name}</td>
        </tr>
        <tr style="border-bottom:1px solid #f0f0ee;">
          <td style="padding:10px 0;font-size:13px;color:#777;">Email</td>
          <td style="padding:10px 0;font-size:13px;color:#388dec;"><a href="mailto:${email}" style="color:#388dec;">${email}</a></td>
        </tr>
        <tr style="border-bottom:1px solid #f0f0ee;">
          <td style="padding:10px 0;font-size:13px;color:#777;">Phone</td>
          <td style="padding:10px 0;font-size:13px;color:#1a1a18;">${phone} &nbsp;<a href="https://wa.me/${phone.replace(/[^0-9]/g,'')}" style="font-size:11px;color:#25D366;text-decoration:none;">💬 WhatsApp</a></td>
        </tr>
        <tr style="border-bottom:1px solid #f0f0ee;">
          <td style="padding:10px 0;font-size:13px;color:#777;">Bags</td>
          <td style="padding:10px 0;font-size:13px;color:#1a1a18;font-weight:500;">${bags}</td>
        </tr>
        <tr style="border-bottom:1px solid #f0f0ee;">
          <td style="padding:10px 0;font-size:13px;color:#777;">Drop-off</td>
          <td style="padding:10px 0;font-size:13px;color:#1a1a18;">${formatDate(dropoff)} at ${formatTime(dropoff_time)}</td>
        </tr>
        <tr style="border-bottom:1px solid #f0f0ee;">
          <td style="padding:10px 0;font-size:13px;color:#777;">Pick-up</td>
          <td style="padding:10px 0;font-size:13px;color:#1a1a18;">${formatDate(pickup)} at ${formatTime(pickup_time)}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;font-size:14px;color:#1a1a18;font-weight:700;">Total</td>
          <td style="padding:10px 0;font-size:14px;color:#388dec;font-weight:700;">$${Number(total).toFixed(2)}</td>
        </tr>
      </table>
      <div style="margin-top:20px;padding:12px 16px;background:#E8F5E9;border-radius:8px;font-size:12px;color:#2E7D32;">
        ✅ View this booking in your <a href="https://storage.thesouvenirstop.com/admin.html" style="color:#388dec;">admin dashboard</a>
      </div>
    </div>
  </div>
</body>
</html>`;

  try {
    // Send customer confirmation
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `${STORE_NAME} <${FROM_EMAIL}>`,
        to: [email],
        subject: `✅ Booking Confirmed — ${id} | The Souvenir Stop`,
        html: customerHtml
      })
    });

    // Send store notification
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `${STORE_NAME} <${FROM_EMAIL}>`,
        to: [STORE_EMAIL],
        subject: `🎒 New Booking ${id} — ${name} | ${bags}`,
        html: storeHtml
      })
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send emails' });
  }
}
