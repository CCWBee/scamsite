export interface ComparisonSide {
  title: string;
  points: string[];
}

export interface ComparisonExample {
  category: string;
  legitimate: ComparisonSide;
  scam: ComparisonSide;
}

export const comparisonExamples: ComparisonExample[] = [
  {
    category: 'Bank Contact',
    legitimate: {
      title: 'Real Bank Contact',
      points: [
        'Will never ask for your full PIN or password',
        'Will verify identity using partial information only',
        'Will encourage you to call back using the number on your card',
        'Will never ask you to transfer money to a "safe account"',
        'Will send written confirmation of any important changes',
        'Will give you time to make decisions without pressure',
        'Staff can be verified through official bank channels'
      ]
    },
    scam: {
      title: 'Scam Bank Contact',
      points: [
        'Asks for your full PIN, password, or security codes',
        'Creates urgency about account security or fraud',
        'Insists you stay on the line and not hang up',
        'Asks you to move money to a "safe account"',
        'Discourages you from visiting your local branch',
        'Pressures you to act immediately',
        'Becomes defensive or aggressive when questioned'
      ]
    }
  },
  {
    category: 'Investment Opportunity',
    legitimate: {
      title: 'Real Investment Opportunity',
      points: [
        'Company is registered with the Financial Conduct Authority (FCA)',
        'Clearly explains risks as well as potential rewards',
        'Provides written documentation and time to consider',
        'Does not pressure you into quick decisions',
        'Has verifiable contact details and physical address',
        'Encourages you to seek independent financial advice',
        'Returns are realistic and not guaranteed'
      ]
    },
    scam: {
      title: 'Scam Investment Opportunity',
      points: [
        'Company is not on the FCA register or uses a clone firm name',
        'Promises guaranteed or unrealistically high returns',
        'Pressures you to invest quickly before the opportunity disappears',
        'Contacted you unexpectedly via cold call, email, or social media',
        'Discourages you from telling others or seeking advice',
        'Payment requested via unusual methods like cryptocurrency',
        'Cannot provide proper documentation or prospectus'
      ]
    }
  },
  {
    category: 'Delivery Message',
    legitimate: {
      title: 'Real Delivery Notification',
      points: [
        'Comes from a courier you are expecting a delivery from',
        'Contains a tracking number that works on the official website',
        'Links go to the official courier website (check the URL carefully)',
        'Does not ask for payment for items you have already paid for',
        'Provides specific delivery date and time slot',
        'Sender details match your recent orders',
        'You can verify the delivery through the retailer'
      ]
    },
    scam: {
      title: 'Scam Delivery Message',
      points: [
        'Arrives unexpectedly when you are not expecting a parcel',
        'Contains a generic message without specific order details',
        'Links go to a fake website (often with slight URL misspellings)',
        'Asks for a small payment to "rearrange delivery"',
        'Requests card details to "confirm your address"',
        'Creates urgency saying the parcel will be returned',
        'Phone number provided is premium rate or unverifiable'
      ]
    }
  },
  {
    category: 'Prize Notification',
    legitimate: {
      title: 'Real Prize Notification',
      points: [
        'You actually entered the competition and remember doing so',
        'The company running it is well-known and verifiable',
        'No payment is required to claim your prize',
        'You receive official written confirmation',
        'Contact details can be independently verified',
        'The prize value is realistic for the competition',
        'Winners are announced publicly and verifiably'
      ]
    },
    scam: {
      title: 'Scam Prize Notification',
      points: [
        'You never entered the competition or cannot remember doing so',
        'The prize value is extraordinarily high for no apparent reason',
        'You must pay a fee, tax, or shipping cost upfront to claim',
        'Personal details like bank information are requested',
        'Communication is via untraceable email or messaging apps',
        'High pressure to respond immediately or lose the prize',
        'Cannot provide proof of the competition or draw'
      ]
    }
  },
  {
    category: 'Tech Support',
    legitimate: {
      title: 'Real Tech Support',
      points: [
        'You contacted them first about a problem you identified',
        'They verify your identity using your customer account details',
        'They do not ask for remote access unless absolutely necessary',
        'Support is free if covered by warranty or your service contract',
        'They provide a case reference number you can verify',
        'They can be called back on an official support number',
        'They never ask for payment via gift cards or wire transfer'
      ]
    },
    scam: {
      title: 'Scam Tech Support',
      points: [
        'They contacted you first, claiming your device has a problem',
        'They claim to be from Microsoft, Apple, or your internet provider',
        'They want immediate remote access to your computer',
        'They create fear about viruses, hackers, or suspicious activity',
        'They ask you to pay for repairs using gift cards or bank transfer',
        'They pressure you to act quickly before "damage spreads"',
        'They become aggressive or threatening if you question them'
      ]
    }
  }
];
