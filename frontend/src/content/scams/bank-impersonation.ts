import type { ScamType } from './types';

/**
 * Bank & JFSC Impersonation Scam
 *
 * Fraudsters pose as bank staff or JFSC officials to steal money
 * or gain access to accounts. This is one of the most common and
 * damaging scams affecting Jersey residents.
 */
export const bankImpersonation: ScamType = {
  slug: 'bank-impersonation',
  title: 'Bank & JFSC Impersonation',
  description:
    'Fraudsters pose as your bank or the Jersey Financial Services Commission (JFSC) to trick you into transferring money or revealing sensitive account details.',
  icon: 'Building2',
  dangerLevel: 'high',
  howItWorks: [
    {
      number: 1,
      title: 'Initial Contact',
      description:
        'You receive an unexpected phone call, text, or email claiming to be from your bank or the JFSC. The caller may spoof the bank\'s official phone number to appear legitimate.',
    },
    {
      number: 2,
      title: 'Creating Urgency',
      description:
        'The fraudster claims there is suspicious activity on your account, a security breach, or that your money is at risk. They create a sense of panic to prevent you from thinking clearly.',
    },
    {
      number: 3,
      title: 'Building Trust',
      description:
        'To appear genuine, they may know some of your personal details (often from data breaches or social media) such as your name, address, or partial account numbers.',
    },
    {
      number: 4,
      title: 'The Request',
      description:
        'You are asked to move your money to a "safe account" for protection, provide your online banking credentials, or share one-time passcodes sent to your phone.',
    },
    {
      number: 5,
      title: 'Money Stolen',
      description:
        'Once they have access or you transfer the funds, the money is quickly moved through multiple accounts and often converted to cryptocurrency, making recovery extremely difficult.',
    },
  ],
  redFlags: [
    {
      id: 'rf1',
      text: 'Unexpected call claiming to be from your bank or the JFSC',
    },
    {
      id: 'rf2',
      text: 'Pressure to act immediately without time to verify',
    },
    {
      id: 'rf3',
      text: 'Requests to transfer money to a "safe" or "holding" account',
    },
    {
      id: 'rf4',
      text: 'Being asked for your full PIN, password, or one-time passcodes',
    },
    {
      id: 'rf5',
      text: 'Caller becomes aggressive or threatens account closure if you don\'t comply',
    },
    {
      id: 'rf6',
      text: 'Instructions to keep the call secret from family or bank staff',
    },
    {
      id: 'rf7',
      text: 'Claims that your current bank staff are corrupt or involved in fraud',
    },
    {
      id: 'rf8',
      text: 'Request to install remote access software on your device',
    },
  ],
  actions: [
    {
      number: 1,
      title: 'Hang up immediately',
      description:
        'End the call without hesitation. Your real bank will never be offended by you taking security precautions.',
    },
    {
      number: 2,
      title: 'Do not call back using numbers they provide',
      description:
        'Scammers may give you a fake callback number. Instead, find your bank\'s official number on their website, your bank card, or a recent statement.',
    },
    {
      number: 3,
      title: 'Wait 10 minutes before calling',
      description:
        'On landlines, scammers can keep the line open. Wait 10 minutes or use a different phone to call your bank\'s official number.',
    },
    {
      number: 4,
      title: 'Contact your bank directly',
      description:
        'Call your bank using the number on your card and explain what happened. If you shared any details or made transfers, they may be able to stop or recover the funds.',
    },
    {
      number: 5,
      title: 'Report the incident',
      description:
        'Report the scam attempt to Jersey Police on 01534 612612 and the JFSC. This helps protect others from the same fraudsters.',
    },
    {
      number: 6,
      title: 'Monitor your accounts',
      description:
        'Keep a close eye on your bank statements and credit reports for any unusual activity in the following weeks.',
    },
  ],
  relatedScams: ['phishing', 'authorised-push-payment', 'tech-support-scams'],
};
