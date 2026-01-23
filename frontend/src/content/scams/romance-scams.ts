import type { ScamType } from './types';

/**
 * Romance Scams
 *
 * Fraudsters create fake profiles on dating sites and social media
 * to build romantic relationships, eventually manipulating victims
 * into sending money.
 */
export const romanceScams: ScamType = {
  slug: 'romance-scams',
  title: 'Romance Scams',
  description:
    'Criminals create fake profiles on dating websites and social media to build romantic relationships with victims, eventually manipulating them into sending money.',
  icon: 'Heart',
  dangerLevel: 'high',
  howItWorks: [
    {
      number: 1,
      title: 'Creating the Profile',
      description:
        'Scammers create attractive fake profiles using stolen photos, often claiming to be overseas workers, military personnel, or successful business people. They may use AI to generate convincing images.',
    },
    {
      number: 2,
      title: 'Building the Relationship',
      description:
        'Over weeks or months, they build an emotional connection through frequent messaging, calls, and declarations of love. They learn your vulnerabilities and dreams.',
    },
    {
      number: 3,
      title: 'Avoiding Video Calls',
      description:
        'They consistently avoid video calls or in-person meetings, making excuses like poor internet connection, camera problems, or work restrictions.',
    },
    {
      number: 4,
      title: 'The Emergency',
      description:
        'Once trust is established, they present an urgent financial need: medical emergency, travel costs to meet you, business problem, or being stranded abroad.',
    },
    {
      number: 5,
      title: 'Repeated Requests',
      description:
        'After the first payment, more emergencies arise. The amounts typically increase over time. They may also introduce fake "investment opportunities" as part of the relationship.',
    },
  ],
  redFlags: [
    {
      id: 'rf1',
      text: 'They quickly declare strong feelings or love within days or weeks',
    },
    {
      id: 'rf2',
      text: 'Consistent excuses to avoid video calls or meeting in person',
    },
    {
      id: 'rf3',
      text: 'Claims to work abroad (military, oil rig, overseas contractor)',
    },
    {
      id: 'rf4',
      text: 'Requests for money, gift cards, or cryptocurrency',
    },
    {
      id: 'rf5',
      text: 'Stories that don\'t add up or change over time',
    },
    {
      id: 'rf6',
      text: 'Asking you to keep the relationship secret',
    },
    {
      id: 'rf7',
      text: 'Plans to meet that are repeatedly cancelled',
    },
    {
      id: 'rf8',
      text: 'Profile photos that look too perfect or appear elsewhere online',
    },
  ],
  actions: [
    {
      number: 1,
      title: 'Stop all communication',
      description:
        'As difficult as it may be emotionally, cease contact immediately. The person you thought you knew does not exist.',
    },
    {
      number: 2,
      title: 'Do not send more money',
      description:
        'No matter how urgent their requests, do not send any further funds. Any new "emergency" is simply another manipulation.',
    },
    {
      number: 3,
      title: 'Verify their identity',
      description:
        'Use reverse image search (Google Images, TinEye) to check if their photos appear elsewhere online under different names.',
    },
    {
      number: 4,
      title: 'Talk to someone you trust',
      description:
        'Confide in a friend or family member. Romance scam victims often feel embarrassed, but speaking to someone can provide perspective and emotional support.',
    },
    {
      number: 5,
      title: 'Report the scam',
      description:
        'Report to Jersey Police on 01534 612612 and the dating platform. This helps protect other potential victims.',
    },
    {
      number: 6,
      title: 'Seek emotional support',
      description:
        'Romance scams can be emotionally devastating. Consider speaking with a counsellor or support group. The JFSC and Citizens Advice can provide guidance.',
    },
  ],
  relatedScams: ['investment-fraud', 'authorised-push-payment'],
};
