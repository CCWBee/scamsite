import type { ScamType } from './types';

/**
 * Authorised Push Payment (APP) Fraud
 *
 * Victims are manipulated into authorising bank transfers to
 * criminals. Because the victim initiates the payment, banks
 * may be reluctant to refund the money.
 */
export const authorisedPushPayment: ScamType = {
  slug: 'authorised-push-payment',
  title: 'Authorised Push Payment Fraud',
  description:
    'Criminals manipulate victims into willingly making bank transfers to accounts controlled by fraudsters. Because you authorise the payment yourself, recovering funds can be extremely difficult.',
  icon: 'Banknote',
  dangerLevel: 'high',
  howItWorks: [
    {
      number: 1,
      title: 'Initial Deception',
      description:
        'The scam begins with impersonation, romance, investment opportunity, or another manipulation. The criminal establishes trust and creates a believable reason for you to send money.',
    },
    {
      number: 2,
      title: 'Building the Story',
      description:
        'A convincing narrative is developed: your money is at risk and needs moving, an investment opportunity requires immediate funding, or someone you care about needs urgent help.',
    },
    {
      number: 3,
      title: 'Pressure to Act',
      description:
        'You are pressured to act quickly before you can think clearly or verify the situation. Delay is presented as dangerous or costly.',
    },
    {
      number: 4,
      title: 'You Make the Transfer',
      description:
        'Crucially, you log into your own banking and make the transfer yourself. The payment goes to an account controlled by criminals, though it may appear to be a legitimate business or person.',
    },
    {
      number: 5,
      title: 'Funds Disappear',
      description:
        'Once sent, the money is rapidly moved through multiple accounts or converted to cryptocurrency. Because you authorised the payment, your bank may argue it was your decision.',
    },
  ],
  redFlags: [
    {
      id: 'rf1',
      text: 'Pressure to transfer money urgently without time to think',
    },
    {
      id: 'rf2',
      text: 'Instructions to bypass security questions or lie to bank staff',
    },
    {
      id: 'rf3',
      text: 'Being told to move money to a "safe" account for protection',
    },
    {
      id: 'rf4',
      text: 'Warnings not to discuss the payment with family or friends',
    },
    {
      id: 'rf5',
      text: 'Request to send money to someone you\'ve never met in person',
    },
    {
      id: 'rf6',
      text: 'Payment for goods, services, or investments found through unusual channels',
    },
    {
      id: 'rf7',
      text: 'Emotional manipulation making you feel guilty for not helping',
    },
    {
      id: 'rf8',
      text: 'Being asked to make multiple smaller transfers instead of one large one',
    },
  ],
  actions: [
    {
      number: 1,
      title: 'Stop and verify',
      description:
        'Before making any large transfer, stop and verify independently. Contact the supposed recipient through a known, trusted method, not details provided in the suspicious communication.',
    },
    {
      number: 2,
      title: 'Contact your bank immediately',
      description:
        'If you\'ve made a payment and suspect fraud, contact your bank immediately. Time is critical as they may be able to stop or recover the funds if they act quickly.',
    },
    {
      number: 3,
      title: 'Gather evidence',
      description:
        'Keep all communications: emails, texts, call logs, and any documents. Screenshot any websites or profiles. This evidence is vital for investigation and potential recovery.',
    },
    {
      number: 4,
      title: 'Report to Jersey Police',
      description:
        'Report the fraud to Jersey Police on 01534 612612. Provide all details including how you were contacted, what you were told, and how much you transferred.',
    },
    {
      number: 5,
      title: 'Know your rights',
      description:
        'Under UK regulations, banks may reimburse APP fraud victims if proper care wasn\'t taken. Ask your bank about their reimbursement policy and escalate complaints if needed.',
    },
    {
      number: 6,
      title: 'Seek support',
      description:
        'APP fraud can be devastating financially and emotionally. Contact Citizens Advice Jersey or Victim Support for guidance and assistance.',
    },
  ],
  relatedScams: ['bank-impersonation', 'romance-scams', 'investment-fraud', 'invoice-fraud'],
};
