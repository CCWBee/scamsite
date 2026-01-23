export interface ScamPhrase {
  phrase: string;
  meaning: string;
  whatToDo: string;
}

export const scamPhrases: ScamPhrase[] = [
  {
    phrase: '"Your account has been compromised"',
    meaning: 'Creating fear to make you act without thinking. Real banks rarely call about compromised accounts - they simply block the card.',
    whatToDo: 'Hang up and call your bank using the number on your card or from their official website. Never use a number the caller provides.'
  },
  {
    phrase: '"Verify your identity"',
    meaning: 'Attempting to harvest your personal information by pretending they need to confirm who you are before proceeding.',
    whatToDo: 'Legitimate organisations already have your details. End the call and contact the organisation directly using official channels.'
  },
  {
    phrase: '"Guaranteed returns"',
    meaning: 'No legitimate investment can guarantee returns. This is a classic phrase used in investment scams to lure victims with false promises.',
    whatToDo: 'Check the FCA register to verify the company is authorised. Remember: if it sounds too good to be true, it probably is.'
  },
  {
    phrase: '"Act now before it\'s too late"',
    meaning: 'Creating artificial urgency to pressure you into making a hasty decision without proper consideration or consultation.',
    whatToDo: 'Take your time. Legitimate offers do not disappear overnight. Tell them you need time to think and consult with family or friends.'
  },
  {
    phrase: '"Keep this between us"',
    meaning: 'Isolating you from people who might recognise the scam and intervene. Scammers know that others will spot their deception.',
    whatToDo: 'Always discuss financial decisions with someone you trust. A legitimate caller would never ask you to keep secrets from loved ones.'
  },
  {
    phrase: '"This is the Security Department"',
    meaning: 'Impersonating a trusted authority figure to gain compliance. Scammers use official-sounding titles to appear legitimate.',
    whatToDo: 'Hang up and call the organisation directly using a number you find independently. Never trust caller ID - it can be spoofed.'
  },
  {
    phrase: '"Your computer has a virus"',
    meaning: 'Creating panic about your technology to gain remote access to your device or trick you into paying for fake support.',
    whatToDo: 'Microsoft, Apple, and internet providers will never call you about viruses. Hang up immediately and run your own antivirus scan.'
  },
  {
    phrase: '"You\'ve won a prize"',
    meaning: 'Exploiting excitement about an unexpected windfall. You cannot win a competition you did not enter.',
    whatToDo: 'Ask yourself: did I actually enter this competition? Never pay fees to claim a prize - legitimate prizes are free to claim.'
  },
  {
    phrase: '"We need your PIN to process this"',
    meaning: 'Attempting to steal your banking credentials. No legitimate organisation will ever ask for your full PIN or password.',
    whatToDo: 'Refuse immediately. Your bank will never ask for your PIN. Report the call to Action Fraud on 0300 123 2040.'
  },
  {
    phrase: '"There\'s a warrant out for your arrest"',
    meaning: 'Using fear of legal consequences to panic you into compliance. Real legal matters are handled through official written correspondence.',
    whatToDo: 'Stay calm. Police and courts do not demand payment over the phone. Hang up and report the call to Action Fraud.'
  },
  {
    phrase: '"Pay the fee to release your funds"',
    meaning: 'The classic advance fee fraud. You should never have to pay money to receive money you are legitimately owed.',
    whatToDo: 'Stop all communication. Legitimate winnings, inheritances, or refunds never require upfront payment from you.'
  },
  {
    phrase: '"I can\'t give you a callback number"',
    meaning: 'Preventing you from independently verifying their identity. Legitimate callers from real organisations have verifiable contact details.',
    whatToDo: 'End the call. Find the organisation\'s official contact details independently and call them to verify any claims made.'
  },
  {
    phrase: '"Transfer your money to a safe account"',
    meaning: 'The "safe account" does not exist - it is the scammer\'s account. Once transferred, your money is gone.',
    whatToDo: 'Banks will NEVER ask you to transfer money to a "safe account". Hang up and call your bank using the number on your card.'
  },
  {
    phrase: '"Don\'t tell your bank about this"',
    meaning: 'Preventing bank staff from recognising the scam and protecting you. This is a major red flag.',
    whatToDo: 'Immediately contact your bank. They are there to help protect you and will not judge you for checking.'
  },
  {
    phrase: '"We\'ve been trying to reach you"',
    meaning: 'Creating a false sense of legitimacy and urgency, implying there is an ongoing issue that needs immediate attention.',
    whatToDo: 'If there were a genuine issue, you would have received official written correspondence. Verify any claims independently.'
  },
  {
    phrase: '"This is a one-time opportunity"',
    meaning: 'Pressure to act quickly without thinking. Legitimate business opportunities do not disappear if you take time to consider them.',
    whatToDo: 'Take your time to research thoroughly. Ask for written details and consult with trusted friends, family, or financial advisers.'
  },
  {
    phrase: '"Pay with gift cards or vouchers"',
    meaning: 'Gift cards are untraceable once the codes are shared. No legitimate organisation accepts payment via gift cards.',
    whatToDo: 'Stop immediately. This is always a scam. No government agency, utility company, or bank accepts gift card payment.'
  },
  {
    phrase: '"I\'m calling from your internet provider"',
    meaning: 'Impersonating a trusted service provider to gain access to your computer or personal information.',
    whatToDo: 'Your internet provider rarely calls you. Hang up and call them using the number on your bill to verify any issues.'
  },
  {
    phrase: '"Your National Insurance number has been compromised"',
    meaning: 'Using fear about identity theft to harvest more personal information or demand payment for fake protection services.',
    whatToDo: 'HMRC will never call about National Insurance numbers. Hang up and report to Action Fraud.'
  },
  {
    phrase: '"Just download this software"',
    meaning: 'Attempting to install malware or remote access tools on your device to steal information or control your computer.',
    whatToDo: 'Never download software at a caller\'s request. Hang up and run a security scan on your device using legitimate software.'
  }
];
