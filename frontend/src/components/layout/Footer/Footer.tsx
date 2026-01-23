/**
 * Footer Component
 *
 * Main site footer for ScamAware Jersey featuring brand information,
 * quick navigation links, contact details, and legal notices.
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 *
 * @accessibility
 * - Uses semantic <footer> element with appropriate role
 * - External links include rel="noopener noreferrer" and visual indicator
 * - All links have accessible text
 * - Proper heading hierarchy within footer sections
 */

import React from 'react';
import { Text } from '@/components/ui/Typography';
import { Icon } from '@/components/ui/Icon';

export interface FooterProps {
  /**
   * Additional CSS classes to apply to the footer.
   */
  className?: string;
}

/**
 * Quick navigation links for the footer
 */
const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Scam Types', href: '/scam-types' },
  { label: 'Warning Signs', href: '/warning-signs' },
  { label: 'Resources', href: '/resources' },
  { label: 'Report a Scam', href: '/report' },
];

/**
 * External resource links
 */
const externalLinks = [
  {
    label: 'Jersey Financial Services Commission',
    href: 'https://www.jerseyfsc.org',
  },
  {
    label: 'States of Jersey Police',
    href: 'https://jersey.police.uk',
  },
  {
    label: 'Action Fraud UK',
    href: 'https://www.actionfraud.police.uk',
  },
];

/**
 * Contact information
 */
const contactInfo = {
  policePhone: '01534 612612',
  jfscPhone: '+44 (0)1534 822000',
  reportEmail: 'report@scamaware.je',
};

/**
 * Footer Component
 *
 * Displays the site footer with brand information, navigation links,
 * contact details, partner logos, and legal notices. The footer uses
 * a responsive grid layout that stacks on mobile devices.
 */
export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`bg-navy-900 text-white ${className}`.trim()}
      role="contentinfo"
    >
      {/* Main Footer Content */}
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Icon
                name="Shield"
                size="lg"
                className="text-trust-blue-400"
                aria-hidden
              />
              <span className="text-xl font-bold">ScamAware Jersey</span>
            </div>
            <Text as="p" className="text-gray-300 text-sm leading-relaxed">
              Protecting Jersey residents from fraud and scams through
              education, awareness, and community support.
            </Text>

            {/* Partner Logos Placeholder */}
            <div className="pt-4">
              <Text as="p" className="text-gray-400 text-xs mb-3 uppercase tracking-wide">
                In partnership with
              </Text>
              <div className="flex flex-wrap gap-4 items-center">
                {/* Placeholder for partner logos - replace with actual images */}
                <div
                  className="bg-navy-800 rounded px-3 py-2 text-xs text-gray-400"
                  aria-label="Jersey Financial Services Commission"
                >
                  JFSC
                </div>
                <div
                  className="bg-navy-800 rounded px-3 py-2 text-xs text-gray-400"
                  aria-label="States of Jersey Police"
                >
                  SoJ Police
                </div>
                <div
                  className="bg-navy-800 rounded px-3 py-2 text-xs text-gray-400"
                  aria-label="Government of Jersey"
                >
                  Gov.je
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* External Resources */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">
                Official Resources
              </h4>
              <ul className="space-y-2">
                {externalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm inline-flex items-center gap-1"
                    >
                      {link.label}
                      <Icon
                        name="ExternalLink"
                        size="sm"
                        className="text-gray-400"
                        aria-label="Opens in new tab"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>

            <div className="space-y-3">
              {/* Police Fraud Line */}
              <div className="flex items-start gap-3">
                <Icon
                  name="Phone"
                  size="md"
                  className="text-trust-blue-400 mt-0.5"
                  aria-hidden
                />
                <div>
                  <Text as="p" className="text-gray-400 text-xs">
                    Police Fraud Line
                  </Text>
                  <a
                    href={`tel:${contactInfo.policePhone.replace(/\s/g, '')}`}
                    className="text-white hover:text-trust-blue-300 transition-colors duration-200 font-medium"
                  >
                    {contactInfo.policePhone}
                  </a>
                </div>
              </div>

              {/* JFSC Phone */}
              <div className="flex items-start gap-3">
                <Icon
                  name="Phone"
                  size="md"
                  className="text-trust-blue-400 mt-0.5"
                  aria-hidden
                />
                <div>
                  <Text as="p" className="text-gray-400 text-xs">
                    JFSC Consumer Helpline
                  </Text>
                  <a
                    href={`tel:${contactInfo.jfscPhone.replace(/[\s()]/g, '')}`}
                    className="text-white hover:text-trust-blue-300 transition-colors duration-200 font-medium"
                  >
                    {contactInfo.jfscPhone}
                  </a>
                </div>
              </div>

              {/* Report Email */}
              <div className="flex items-start gap-3">
                <Icon
                  name="Mail"
                  size="md"
                  className="text-trust-blue-400 mt-0.5"
                  aria-hidden
                />
                <div>
                  <Text as="p" className="text-gray-400 text-xs">
                    Report a Scam
                  </Text>
                  <a
                    href={`mailto:${contactInfo.reportEmail}`}
                    className="text-white hover:text-trust-blue-300 transition-colors duration-200 font-medium"
                  >
                    {contactInfo.reportEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="mt-6 p-3 bg-alert-red-600/20 border border-alert-red-600/30 rounded-lg">
              <Text as="p" className="text-alert-red-300 text-sm font-medium">
                In an emergency, always call 999
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-700">
        <div className="mx-auto max-w-content px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Copyright */}
            <Text as="p" className="text-gray-400 text-sm">
              &copy; {currentYear} ScamAware Jersey. All rights reserved.
            </Text>

            {/* Legal Links */}
            <nav aria-label="Legal links">
              <ul className="flex flex-wrap gap-4 text-sm">
                <li>
                  <a
                    href="/privacy-policy"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <span className="text-navy-600" aria-hidden>|</span>
                </li>
                <li>
                  <a
                    href="/disclaimer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Disclaimer
                  </a>
                </li>
                <li>
                  <span className="text-navy-600" aria-hidden>|</span>
                </li>
                <li>
                  <a
                    href="/accessibility"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Accessibility
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';

export default Footer;
