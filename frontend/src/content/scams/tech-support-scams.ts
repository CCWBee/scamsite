import type { ScamType } from './types';

/**
 * Tech Support Scams
 *
 * Fraudsters pose as technical support staff from major companies
 * like Microsoft or Apple to gain remote access to computers
 * and steal money or data.
 */
export const techSupportScams: ScamType = {
  slug: 'tech-support-scams',
  title: 'Tech Support Scams',
  description:
    'Criminals pose as technical support staff from companies like Microsoft, Apple, or your internet provider, claiming your computer has a virus or security problem to gain remote access and steal your money or data.',
  icon: 'Monitor',
  dangerLevel: 'medium',
  howItWorks: [
    {
      number: 1,
      title: 'Unsolicited Contact',
      description:
        'You receive an unexpected phone call claiming to be from Microsoft, Apple, or another tech company. Alternatively, you may see a pop-up warning on your computer with a phone number to call.',
    },
    {
      number: 2,
      title: 'Creating Fear',
      description:
        'The caller claims your computer has been compromised by hackers or infected with viruses. They may describe serious consequences like identity theft or losing all your files.',
    },
    {
      number: 3,
      title: 'Remote Access',
      description:
        'They ask you to install remote access software (like TeamViewer or AnyDesk) so they can "fix" the problem. This gives them full control of your computer.',
    },
    {
      number: 4,
      title: 'Fake Evidence',
      description:
        'Once connected, they show you "evidence" of viruses using normal system files or logs. They may install software that displays fake security warnings.',
    },
    {
      number: 5,
      title: 'Payment Demanded',
      description:
        'You are charged for unnecessary software or services, often hundreds of pounds. With remote access, they may also steal passwords, banking details, or personal files.',
    },
  ],
  redFlags: [
    {
      id: 'rf1',
      text: 'Unexpected call from "Microsoft", "Apple", or tech support',
    },
    {
      id: 'rf2',
      text: 'Pop-up warnings telling you to call a phone number immediately',
    },
    {
      id: 'rf3',
      text: 'Request to install remote access software',
    },
    {
      id: 'rf4',
      text: 'Pressure to act immediately or your computer will be damaged',
    },
    {
      id: 'rf5',
      text: 'Request for payment via gift cards or cryptocurrency',
    },
    {
      id: 'rf6',
      text: 'Claims they\'ve detected problems on your computer remotely',
    },
    {
      id: 'rf7',
      text: 'Heavy accent claiming to be from a UK-based company',
    },
    {
      id: 'rf8',
      text: 'Becoming aggressive when questioned or refused',
    },
  ],
  actions: [
    {
      number: 1,
      title: 'Hang up immediately',
      description:
        'Microsoft, Apple, and other tech companies will never cold-call you about computer problems. End the call without engaging.',
    },
    {
      number: 2,
      title: 'Don\'t call numbers from pop-ups',
      description:
        'If you see a warning pop-up, close your browser. If it won\'t close, restart your computer. Never call phone numbers shown in such warnings.',
    },
    {
      number: 3,
      title: 'Remove remote access software',
      description:
        'If you installed remote access software, uninstall it immediately. Consider having your computer professionally checked for malware.',
    },
    {
      number: 4,
      title: 'Secure your accounts',
      description:
        'Change all passwords stored on your computer, especially for banking and email. Use a different, clean device to do this.',
    },
    {
      number: 5,
      title: 'Contact your bank',
      description:
        'If you provided payment details or if the scammer accessed your online banking, contact your bank immediately to secure your accounts.',
    },
    {
      number: 6,
      title: 'Report the scam',
      description:
        'Report to Jersey Police on 01534 612612. Include any phone numbers, company names, or websites the scammers used.',
    },
  ],
  relatedScams: ['bank-impersonation', 'phishing'],
};
