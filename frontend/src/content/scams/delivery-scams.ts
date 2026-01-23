import type { ScamType } from './types';

/**
 * Delivery Scams
 *
 * Fake delivery notifications via text or email that trick
 * victims into clicking malicious links or paying fake fees.
 * Particularly prevalent after online shopping increases.
 */
export const deliveryScams: ScamType = {
  slug: 'delivery-scams',
  title: 'Delivery Scams',
  description:
    'Fake delivery notifications claiming a parcel could not be delivered, requesting small fees for redelivery or directing you to fraudulent websites to steal your personal and payment details.',
  icon: 'Package',
  dangerLevel: 'medium',
  howItWorks: [
    {
      number: 1,
      title: 'Fake Notification',
      description:
        'You receive a text message or email appearing to be from Royal Mail, Jersey Post, DPD, or another courier claiming there\'s a problem with your delivery.',
    },
    {
      number: 2,
      title: 'Creating Urgency',
      description:
        'The message states your parcel will be returned or incur storage fees unless you act quickly. This creates pressure to respond without thinking.',
    },
    {
      number: 3,
      title: 'Malicious Link',
      description:
        'You are directed to click a link to reschedule delivery, pay a small fee, or update your address. The link leads to a convincing fake website.',
    },
    {
      number: 4,
      title: 'Data Harvesting',
      description:
        'The fake website asks for personal details, address, and payment card information to pay a small "redelivery fee" (typically under GBP 2).',
    },
    {
      number: 5,
      title: 'Ongoing Fraud',
      description:
        'Your card details are used for fraudulent purchases or sold to other criminals. Your personal data may be used for identity theft.',
    },
  ],
  redFlags: [
    {
      id: 'rf1',
      text: 'Unexpected delivery notification when you\'re not expecting a parcel',
    },
    {
      id: 'rf2',
      text: 'Generic message that doesn\'t name the sender or specific item',
    },
    {
      id: 'rf3',
      text: 'Request to pay a small fee (often under GBP 2) to release a parcel',
    },
    {
      id: 'rf4',
      text: 'Link to a website that isn\'t the official courier domain',
    },
    {
      id: 'rf5',
      text: 'Poor spelling, grammar, or formatting in the message',
    },
    {
      id: 'rf6',
      text: 'Sender\'s phone number or email looks suspicious',
    },
    {
      id: 'rf7',
      text: 'Request for excessive personal information for a simple redelivery',
    },
  ],
  actions: [
    {
      number: 1,
      title: 'Don\'t click the link',
      description:
        'Never click links in unexpected delivery messages. Instead, go directly to the courier\'s official website or app to check your delivery status.',
    },
    {
      number: 2,
      title: 'Check your orders',
      description:
        'Review your recent online orders. If you are expecting a delivery, track it through the retailer\'s website or the courier\'s official tracking page.',
    },
    {
      number: 3,
      title: 'Report the message',
      description:
        'Forward suspicious text messages to 7726 (free) to report to your mobile provider. Report phishing emails to report@phishing.gov.uk.',
    },
    {
      number: 4,
      title: 'If you entered details',
      description:
        'Contact your bank immediately to report potential card fraud. They can block your card and monitor for suspicious transactions.',
    },
    {
      number: 5,
      title: 'Change passwords',
      description:
        'If you entered any login credentials, change those passwords immediately, especially if you use the same password elsewhere.',
    },
  ],
  relatedScams: ['phishing', 'prize-lottery-scams'],
};
