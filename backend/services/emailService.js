import nodemailer from 'nodemailer';

const booleanLabels = {
  true: 'Yes',
  false: 'No',
};

const fieldLabels = [
  ['fullName', 'Full Name'],
  ['age', 'Age'],
  ['gender', 'Gender'],
  ['mobileNumber', 'Mobile Number'],
  ['telegramUsername', 'Telegram Username'],
  ['whatsappNumber', 'WhatsApp Number'],
  ['emailAddress', 'Email Address'],
  ['location', 'Location'],
  ['department', 'Department'],
  ['tradingTools', 'Trading Tools / Platforms'],
  ['specificSkills', 'Specific Skills'],
  ['previousExperience', 'Previous Experience'],
  ['workExperience', 'Work Experience'],
  ['tradingKnowledge', 'Trading Knowledge'],
  ['editingSkills', 'Editing / Technical Skills'],
  ['socialMediaExperience', 'Social Media Experience'],
  ['hoursPerDay', 'Working Hours Per Day'],
  ['availableDays', 'Available Days'],
  ['hasLaptop', 'Has Laptop'],
  ['hasHighSpeedInternet', 'Has High-Speed Internet'],
  ['canWorkRemote', 'Can Work Remote'],
  ['sixMonthGoal', 'Six-Month Goal'],
  ['whyJoin', 'Why Join Market Vision'],
  ['portfolioUrl', 'Portfolio URL'],
  ['instagramProfile', 'Instagram Profile'],
  ['telegramLink', 'Telegram Link'],
  ['discordUsername', 'Discord Username'],
  ['youtubeChannel', 'YouTube Channel'],
  ['previousWorkLinks', 'Previous Work Links'],
  ['seriousCommitment', 'Serious Commitment'],
  ['agreedToTerms', 'Agreed To Terms'],
  ['informationCorrect', 'Information Correct'],
  ['understoodPhotoRequirement', 'Understood Photo Requirement'],
  ['agreedToPhoto', 'Agreed To Photo'],
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatValue(value) {
  if (typeof value === 'boolean') {
    return booleanLabels[value];
  }

  if (value === undefined || value === null || value === '') {
    return 'Not provided';
  }

  return value;
}

function buildEmailContent(application) {
  const rows = fieldLabels.map(([key, label]) => {
    const value = formatValue(application[key]);

    return `
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd; font-weight: 700; width: 32%;">${escapeHtml(label)}</td>
        <td style="padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">${escapeHtml(value)}</td>
      </tr>
    `;
  }).join('');

  const text = fieldLabels
    .map(([key, label]) => `${label}: ${formatValue(application[key])}`)
    .join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
      <h2 style="margin-bottom: 8px;">New Market Vision Application</h2>
      <p style="margin-top: 0;">A user submitted the team application form.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 900px;">
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;

  return { html, text };
}

function createTransporter() {
  const port = Number(process.env.SMTP_PORT || 465);

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === 'true'
      : port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendApplicationEmail(application) {
  const recipient = process.env.APPLICATION_RECIPIENT_EMAIL || process.env.SMTP_USER;

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !recipient) {
    return {
      sent: false,
      error: 'Email is not configured. Set SMTP_USER, SMTP_PASS, and APPLICATION_RECIPIENT_EMAIL in Vercel.',
    };
  }

  const transporter = createTransporter();
  const { html, text } = buildEmailContent(application);

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || `"Market Vision Form" <${process.env.SMTP_USER}>`,
      to: recipient,
      replyTo: application.emailAddress,
      subject: `New Team Application - ${application.fullName}`,
      text,
      html,
    });

    return { sent: true, error: null };
  } catch (error) {
    console.error('Application email failed:', error);

    return {
      sent: false,
      error: 'Email could not be sent. Check that SMTP_PASS is a valid 16-character Gmail App Password.',
    };
  }
}
