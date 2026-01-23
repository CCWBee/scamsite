import type { ScamType } from './types';

/**
 * Prize & Lottery Scams
 *
 * Fraudulent notifications claiming you've won a lottery,
 * prize draw, or competition, requiring payment of fees
 * to claim the non-existent prize.
 */
export const prizeLotteryScams: ScamType = {
  slug: 'prize-lottery-scams',
  title: 'Prize & Lottery Scams',
  description:
    'Fraudsters contact you claiming you\'ve won a lottery, prize draw, or competition that you never entered, then request fees or personal details to release your "winnings".',
  icon: 'Gift',
  dangerLevel: 'medium',
  howItWorks: [
    {
      number: 1,
      title: 'Winning Notification',
      description:
        'You receive an email, letter, text, or phone call claiming you\'ve won a substantial prize in a lottery or competition, often from overseas.',
    },
    {
      number: 2,
      title: 'Exciting Details',
      description:
        'The message includes convincing details: official-looking logos, reference numbers, and a large prize amount. They may claim it\'s a promotional draw you were automatically entered into.',
    },
    {
      number: 3,
      title: 'Verification Request',
      description:
        'To claim your prize, you\'re asked to provide personal information such as your full name, address, date of birth, and bank details for the "transfer".',
    },
    {
      number: 4,
      title: 'Fee Demanded',
      description:
        'Before you can receive your winnings, you must pay various fees: processing fees, taxes, insurance, or legal costs. These may start small but quickly escalate.',
    },
    {
      number: 5,
      title: 'Ongoing Demands',
      description:
        'Each time you pay, another fee emerges. The prize never arrives. Your personal details may also be sold to other scammers.',
    },
  ],
  redFlags: [
    {
      id: 'rf1',
      text: 'You\'ve "won" a lottery or competition you never entered',
    },
    {
      id: 'rf2',
      text: 'Request to pay fees upfront to claim your prize',
    },
    {
      id: 'rf3',
      text: 'Contact from an overseas lottery you\'ve never heard of',
    },
    {
      id: 'rf4',
      text: 'Asked to keep your winnings confidential',
    },
    {
      id: 'rf5',
      text: 'Pressure to respond quickly or lose the prize',
    },
    {
      id: 'rf6',
      text: 'Request for bank details to "deposit your winnings"',
    },
    {
      id: 'rf7',
      text: 'Payment requested via wire transfer, gift cards, or cryptocurrency',
    },
    {
      id: 'rf8',
      text: 'Poor grammar and spelling in official-looking documents',
    },
  ],
  actions: [
    {
      number: 1,
      title: 'Ignore and delete',
      description:
        'If you haven\'t entered a competition, you cannot win it. Delete the message and do not respond.',
    },
    {
      number: 2,
      title: 'Never pay to claim a prize',
      description:
        'Legitimate lotteries and competitions never require winners to pay fees upfront. Any request for payment is a clear sign of a scam.',
    },
    {
      number: 3,
      title: 'Don\'t share personal details',
      description:
        'Never provide bank details, copies of ID, or other personal information in response to prize notifications.',
    },
    {
      number: 4,
      title: 'Research the organisation',
      description:
        'Search online for the lottery or company name along with words like "scam" or "fraud" to see if others have reported it.',
    },
    {
      number: 5,
      title: 'Report the scam',
      description:
        'Report suspicious prize notifications to Jersey Police on 01534 612612 and to Action Fraud. This helps warn others.',
    },
    {
      number: 6,
      title: 'If you\'ve paid money',
      description:
        'Contact your bank immediately. If you paid by card, you may be able to claim a chargeback. Report the full details to the police.',
    },
  ],
  relatedScams: ['phishing', 'delivery-scams'],
};
