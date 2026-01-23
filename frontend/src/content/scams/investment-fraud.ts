import type { ScamType } from './types';

/**
 * Investment Fraud Scam
 *
 * Fraudulent investment schemes promising unrealistic returns,
 * including cryptocurrency, forex trading, and fake share offers.
 * Often causes substantial financial losses.
 */
export const investmentFraud: ScamType = {
  slug: 'investment-fraud',
  title: 'Investment Fraud',
  description:
    'Criminals promote fake investment opportunities in cryptocurrency, forex, shares, or other assets, promising guaranteed high returns with little or no risk.',
  icon: 'TrendingUp',
  dangerLevel: 'high',
  howItWorks: [
    {
      number: 1,
      title: 'The Hook',
      description:
        'You see an advert on social media, receive an unsolicited call, or are approached by someone you met online. They promote an "exclusive" investment opportunity with impressive returns.',
    },
    {
      number: 2,
      title: 'Professional Appearance',
      description:
        'Scammers create convincing websites with fake testimonials, fabricated performance data, and professional-looking dashboards showing your "growing" investment.',
    },
    {
      number: 3,
      title: 'Small Investment Encouraged',
      description:
        'You are encouraged to start with a small amount. This may appear to grow rapidly, and you might even be allowed to withdraw some profits to build your confidence.',
    },
    {
      number: 4,
      title: 'Pressure to Invest More',
      description:
        'Once trust is established, you are pressured to invest larger sums. There may be "limited time offers" or claims that you\'ll miss out on huge gains if you don\'t act now.',
    },
    {
      number: 5,
      title: 'Unable to Withdraw',
      description:
        'When you try to withdraw your money, you face unexpected fees, tax requirements, or technical problems. Eventually, the scammers disappear with your funds.',
    },
  ],
  redFlags: [
    {
      id: 'rf1',
      text: 'Promises of guaranteed returns or "risk-free" investments',
    },
    {
      id: 'rf2',
      text: 'Pressure to invest quickly before the "opportunity" disappears',
    },
    {
      id: 'rf3',
      text: 'Unsolicited contact about investment opportunities',
    },
    {
      id: 'rf4',
      text: 'Returns that seem too good to be true (e.g., 20%+ monthly)',
    },
    {
      id: 'rf5',
      text: 'Difficulty withdrawing funds or unexpected fees to access your money',
    },
    {
      id: 'rf6',
      text: 'Company not registered with the JFSC or FCA',
    },
    {
      id: 'rf7',
      text: 'Asked to keep the investment secret from friends and family',
    },
    {
      id: 'rf8',
      text: 'Complex explanations using jargon to confuse you',
    },
  ],
  actions: [
    {
      number: 1,
      title: 'Stop all communication',
      description:
        'Do not respond to further messages or calls from the scammers. Block their numbers and email addresses.',
    },
    {
      number: 2,
      title: 'Do not send more money',
      description:
        'Never pay "fees" or "taxes" to release your funds. This is a common tactic to extract more money from victims.',
    },
    {
      number: 3,
      title: 'Check registration status',
      description:
        'Verify whether the company is authorised by searching the JFSC register (jerseyfsc.org) or the FCA register (fca.org.uk). Scammers often clone legitimate firms.',
    },
    {
      number: 4,
      title: 'Report to authorities',
      description:
        'Report to the JFSC on +44 (0)1534 822000 and Jersey Police on 01534 612612. Keep all evidence including emails, screenshots, and transaction records.',
    },
    {
      number: 5,
      title: 'Contact your bank',
      description:
        'If you sent money via bank transfer, contact your bank immediately. They may be able to recover some funds if they act quickly.',
    },
    {
      number: 6,
      title: 'Seek recovery scam warnings',
      description:
        'Beware of "recovery companies" offering to get your money back for a fee. These are often the same criminals or new scammers targeting victims.',
    },
  ],
  relatedScams: ['romance-scams', 'authorised-push-payment'],
};
