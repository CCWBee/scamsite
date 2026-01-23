import type { ScamType } from './types';

/**
 * Invoice & Business Email Compromise (BEC) Fraud
 *
 * Criminals intercept or impersonate business communications
 * to redirect payments to fraudulent accounts. Targets both
 * businesses and individuals dealing with large transactions.
 */
export const invoiceFraud: ScamType = {
  slug: 'invoice-fraud',
  title: 'Invoice & BEC Fraud',
  description:
    'Business Email Compromise (BEC) fraud involves criminals intercepting or impersonating business communications to trick victims into redirecting payments to fraudulent accounts.',
  icon: 'FileText',
  dangerLevel: 'high',
  howItWorks: [
    {
      number: 1,
      title: 'Email Account Compromise',
      description:
        'Criminals gain access to a business email account through phishing, malware, or password theft. Alternatively, they create email addresses that closely mimic legitimate ones.',
    },
    {
      number: 2,
      title: 'Monitoring Communications',
      description:
        'Once inside, they monitor emails to understand payment processes, identify upcoming invoices, and learn the communication style of key staff.',
    },
    {
      number: 3,
      title: 'Interception or Impersonation',
      description:
        'At the right moment, they intercept a genuine invoice and modify the bank details, or send a fake invoice impersonating a trusted supplier.',
    },
    {
      number: 4,
      title: 'Urgent Payment Request',
      description:
        'The fraudulent invoice often comes with a request for urgent payment or notification of "updated" bank details due to an audit, system change, or security upgrade.',
    },
    {
      number: 5,
      title: 'Funds Diverted',
      description:
        'The payment is sent to the criminal\'s account. The fraud is often only discovered weeks later when the genuine supplier chases for non-payment.',
    },
  ],
  redFlags: [
    {
      id: 'rf1',
      text: 'Sudden change to payment details from a known supplier',
    },
    {
      id: 'rf2',
      text: 'Request to update bank account information via email',
    },
    {
      id: 'rf3',
      text: 'Pressure to make urgent payments outside normal processes',
    },
    {
      id: 'rf4',
      text: 'Email address that looks similar but is slightly different',
    },
    {
      id: 'rf5',
      text: 'Instructions to keep payment details confidential',
    },
    {
      id: 'rf6',
      text: 'Invoice amounts or timing that seem unusual',
    },
    {
      id: 'rf7',
      text: 'Poor grammar or unusual language in business communications',
    },
  ],
  actions: [
    {
      number: 1,
      title: 'Verify before paying',
      description:
        'Always verify any change to payment details by calling the supplier on a known, trusted number (not one from the suspicious email).',
    },
    {
      number: 2,
      title: 'Contact your bank immediately',
      description:
        'If you suspect you\'ve paid a fraudulent invoice, contact your bank within 24 hours. They may be able to recover funds before they\'re moved.',
    },
    {
      number: 3,
      title: 'Report to Jersey Police',
      description:
        'Report BEC fraud to Jersey Police on 01534 612612. Provide all relevant emails, invoices, and transaction details.',
    },
    {
      number: 4,
      title: 'Secure your email accounts',
      description:
        'Enable two-factor authentication on all business email accounts. Check for any email forwarding rules that may have been added by criminals.',
    },
    {
      number: 5,
      title: 'Review payment procedures',
      description:
        'Implement a verification process for all payment detail changes, including a callback to a pre-verified phone number.',
    },
    {
      number: 6,
      title: 'Alert your contacts',
      description:
        'If your email was compromised, warn your contacts that fraudulent emails may have been sent from your account.',
    },
  ],
  relatedScams: ['phishing', 'authorised-push-payment'],
};
