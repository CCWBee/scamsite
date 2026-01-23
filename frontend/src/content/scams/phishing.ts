import type { ScamType } from './types';

/**
 * Phishing Scams
 *
 * Fraudulent emails, texts, and websites designed to steal
 * personal information, login credentials, and financial data
 * by impersonating trusted organisations.
 */
export const phishing: ScamType = {
  slug: 'phishing',
  title: 'Phishing',
  description:
    'Criminals send fake emails, text messages, or create fraudulent websites that impersonate trusted organisations to steal your personal information, passwords, and financial details.',
  icon: 'Mail',
  dangerLevel: 'medium',
  howItWorks: [
    {
      number: 1,
      title: 'Impersonation',
      description:
        'Scammers send messages appearing to be from trusted organisations: your bank, HMRC, NHS, Amazon, Netflix, or other well-known companies. Emails may use official logos and branding.',
    },
    {
      number: 2,
      title: 'Creating Urgency',
      description:
        'The message claims there\'s a problem: your account will be suspended, a payment has failed, suspicious activity detected, or you need to verify your identity urgently.',
    },
    {
      number: 3,
      title: 'The Link',
      description:
        'You\'re directed to click a link to resolve the issue. The link leads to a fake website that looks identical to the genuine site but is controlled by criminals.',
    },
    {
      number: 4,
      title: 'Credential Harvesting',
      description:
        'The fake site asks you to log in or enter personal details. Any information you enter is captured by the criminals.',
    },
    {
      number: 5,
      title: 'Account Takeover',
      description:
        'Using your stolen credentials, criminals access your real accounts to steal money, make purchases, or gather more personal information for identity theft.',
    },
  ],
  redFlags: [
    {
      id: 'rf1',
      text: 'Generic greeting like "Dear Customer" instead of your name',
    },
    {
      id: 'rf2',
      text: 'Sender email address doesn\'t match the organisation\'s domain',
    },
    {
      id: 'rf3',
      text: 'Urgent threats about account suspension or legal action',
    },
    {
      id: 'rf4',
      text: 'Links that don\'t go to the official website when you hover over them',
    },
    {
      id: 'rf5',
      text: 'Spelling and grammar errors in official-looking messages',
    },
    {
      id: 'rf6',
      text: 'Requests for sensitive information like passwords or PINs',
    },
    {
      id: 'rf7',
      text: 'Unexpected attachments, especially .exe, .zip, or Office files',
    },
    {
      id: 'rf8',
      text: 'Message creates a sense of panic or extreme urgency',
    },
  ],
  actions: [
    {
      number: 1,
      title: 'Don\'t click links',
      description:
        'If you receive a suspicious message, don\'t click any links. Instead, go directly to the organisation\'s website by typing the address in your browser.',
    },
    {
      number: 2,
      title: 'Verify the sender',
      description:
        'Check the sender\'s email address carefully. Scammers often use addresses that look similar but have subtle differences (e.g., amaz0n.com instead of amazon.com).',
    },
    {
      number: 3,
      title: 'Contact the organisation directly',
      description:
        'If you\'re unsure whether a message is genuine, contact the organisation using contact details from their official website, not from the suspicious message.',
    },
    {
      number: 4,
      title: 'Report phishing attempts',
      description:
        'Forward suspicious emails to report@phishing.gov.uk. Forward suspicious texts to 7726. Report to Jersey Police if you\'ve lost money.',
    },
    {
      number: 5,
      title: 'If you clicked a link',
      description:
        'Run a virus scan on your device. Change passwords for any accounts that might be affected, especially if you entered any credentials.',
    },
    {
      number: 6,
      title: 'Enable two-factor authentication',
      description:
        'Add an extra layer of security to your important accounts. Even if criminals get your password, they won\'t be able to access your account without the second factor.',
    },
  ],
  relatedScams: ['delivery-scams', 'bank-impersonation', 'tech-support-scams'],
};
