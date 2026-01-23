export interface WarningSign {
  id: string;
  title: string;
  description: string;
  examples: string[];
  icon: string;
}

export const warningSigns: WarningSign[] = [
  {
    id: 'urgency',
    title: 'Urgency & Pressure',
    description: 'Scammers create artificial time pressure to prevent you from thinking clearly or checking with others. They want you to act on impulse before you realise something is wrong.',
    examples: [
      '"Act now or lose your account"',
      '"This offer expires in 1 hour"',
      '"You must respond immediately to avoid prosecution"',
      '"Limited spots remaining - sign up now!"',
      '"Your account will be closed unless you verify today"'
    ],
    icon: 'Clock'
  },
  {
    id: 'unexpected-contact',
    title: 'Unexpected Contact',
    description: 'Legitimate organisations rarely contact you out of the blue about problems or opportunities. Be suspicious of unsolicited calls, texts, emails, or social media messages.',
    examples: [
      'A call claiming to be from HMRC about unpaid taxes',
      'An email saying you have won a competition you never entered',
      'A message from a "friend" on social media asking for urgent help',
      'A text claiming there is a problem with your bank account',
      'A call from "Microsoft" about your computer'
    ],
    icon: 'Phone'
  },
  {
    id: 'personal-info-request',
    title: 'Request for Personal Information',
    description: 'Genuine organisations will never ask for your full PIN, password, or security codes. Scammers need this information to access your accounts and steal your money.',
    examples: [
      '"Please confirm your full PIN number"',
      '"We need your online banking password to verify your account"',
      '"Provide the one-time code we just sent you"',
      '"What are your memorable word and security questions?"',
      '"Enter your card details to claim your refund"'
    ],
    icon: 'Lock'
  },
  {
    id: 'too-good-to-be-true',
    title: 'Too Good to Be True',
    description: 'If an offer seems unrealistically generous, it probably is. Scammers use the promise of easy money, incredible deals, or guaranteed returns to lure victims.',
    examples: [
      '"Guaranteed 500% returns on your investment"',
      '"You have been selected for a special tax rebate"',
      '"Work from home and earn £5,000 per week"',
      '"Get this £1,000 iPhone for just £50"',
      '"Congratulations! You have won £100,000 in our lottery"'
    ],
    icon: 'Gift'
  },
  {
    id: 'unusual-payment',
    title: 'Unusual Payment Methods',
    description: 'Scammers often request payment through methods that are difficult to trace or reverse, such as gift cards, cryptocurrency, or wire transfers to overseas accounts.',
    examples: [
      '"Pay the fine using iTunes gift cards"',
      '"Transfer the deposit via Western Union"',
      '"Send payment in Bitcoin for extra discount"',
      '"Purchase vouchers and read me the codes"',
      '"Wire the money to this overseas bank account"'
    ],
    icon: 'CreditCard'
  },
  {
    id: 'emotional-manipulation',
    title: 'Emotional Manipulation',
    description: 'Scammers exploit your emotions - fear, excitement, loneliness, or sympathy - to cloud your judgement and make you act irrationally.',
    examples: [
      '"You will be arrested if you do not pay immediately"',
      '"Your grandchild is in trouble and needs money urgently"',
      '"I have fallen in love with you - please help me with money"',
      '"A child in need will suffer if you do not donate now"',
      '"This is your last chance to secure your financial future"'
    ],
    icon: 'Heart'
  },
  {
    id: 'impersonation',
    title: 'Impersonation Claims',
    description: 'Scammers frequently pretend to be from trusted organisations like banks, HMRC, the police, or well-known companies to gain your trust and compliance.',
    examples: [
      '"This is the Fraud Department from your bank"',
      '"I am calling from HMRC about your tax bill"',
      '"This is the National Crime Agency - you are under investigation"',
      '"Microsoft has detected a virus on your computer"',
      '"Amazon here - there is a problem with your order"'
    ],
    icon: 'UserCheck'
  },
  {
    id: 'poor-communication',
    title: 'Poor Grammar & Spelling',
    description: 'Legitimate organisations have professional communications. Obvious spelling mistakes, poor grammar, or awkward phrasing are strong indicators of a scam.',
    examples: [
      '"Dear Costumer, your acount has been suspened"',
      '"You have recieved a important mesage from you bank"',
      '"Kindly revert back with the needful at earliest"',
      '"We detected suspicous activity on you\'re account"',
      '"Click hear to verify you identity immediatly"'
    ],
    icon: 'FileText'
  },
  {
    id: 'secrecy-request',
    title: 'Request for Secrecy',
    description: 'Scammers often insist you keep the conversation secret, knowing that friends and family would likely recognise the scam and stop you from falling victim.',
    examples: [
      '"Do not tell anyone about this call - it is confidential"',
      '"Keep this between us until the transaction is complete"',
      '"Your family would not understand this investment opportunity"',
      '"Do not discuss this with your bank - they will block it"',
      '"This is a secret government operation - tell no one"'
    ],
    icon: 'EyeOff'
  },
  {
    id: 'unverifiable-claims',
    title: 'Unverifiable Claims',
    description: 'Scammers make claims that cannot be independently verified, or they discourage you from checking. Legitimate organisations welcome verification.',
    examples: [
      'Refusing to provide a callback number you can verify',
      'Unable to send written confirmation of the offer',
      'Discouraging you from speaking to your bank first',
      'Getting agitated when you ask for credentials',
      'Providing a "verification number" that only they can check'
    ],
    icon: 'AlertTriangle'
  }
];
