import {
  ComponentParams,
  ComponentRendering,
  Image,
  ImageField,
  Link,
  LinkField,
  RichText,
  RichTextField,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import { FooterCopyrightText } from './FooterCopyrightText';
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faStrava,
  faTiktok,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ArrowRight } from 'lucide-react';
import React from 'react';

interface Fields {
  TitleOne: TextField;
  TitleTwo: TextField;
  TitleThree: TextField;
  TitleFour: TextField;
  TitleFive: TextField;
  CopyrightText: TextField;
  PolicyText: LinkField;
  TermsText: LinkField;
  Logo: ImageField;
  Description: RichTextField;
  /** Optional: newsletter heading (default Brooks copy) */
  NewsletterTitle?: TextField;
}

type FooterProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const DEFAULT_NEWSLETTER_TITLE =
  "Sign up for new arrivals, sales, and limited-edition releases. It's the next best thing to signing up yesterday.";

const SOCIAL_LINKS: { name: string; href: string; icon: IconDefinition; ariaLabel: string }[] = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/brooksrunning',
    icon: faTwitter,
    ariaLabel: 'Twitter',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@brooksrunning',
    icon: faTiktok,
    ariaLabel: 'TikTok',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/brooksrunning/',
    icon: faInstagram,
    ariaLabel: 'Instagram',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/brooksrunning',
    icon: faFacebookF,
    ariaLabel: 'Facebook',
  },
  {
    name: 'Strava',
    href: 'https://www.strava.com/clubs/brooks-running',
    icon: faStrava,
    ariaLabel: 'Strava',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/brooksrunning',
    icon: faYoutube,
    ariaLabel: 'YouTube',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/brooks-sports',
    icon: faLinkedin,
    ariaLabel: 'LinkedIn',
  },
];

const LEGAL_LINKS = [
  { label: 'Your Privacy Choices', href: '#', showIcon: true },
  { label: 'Accessibility Statement', href: '#' },
  { label: 'Supply Chain Transparency', href: '#' },
  { label: 'Health Insurance Transparency', href: '#' },
  { label: 'Fraud Protection', href: '#' },
  { label: 'Health Data', href: '#' },
  { label: 'CA Notice at Collection', href: '#' },
  { label: 'Sitemap', href: '#' },
];

/** Column headings (replacing Furniture, Services, Support, etc.) */
const COLUMN_TITLES = [
  'Run Community',
  'Find your perfect gear',
  'Customer Care',
  'Get to Know Our Brand',
];

/** Link labels under each column to match Brooks reference */
const RUN_COMMUNITY_LINKS = [
  'Future Run',
  'PR Invite',
  'Athletes',
  'Sports Medicine Program',
  'Community Heroes',
  'Affiliate Program',
].map((label) => ({ label, href: '#' }));

const FIND_YOUR_PERFECT_GEAR_LINKS = [
  'Shoe Finder',
  'Bra Finder',
  'Size Guides',
  'Ask a Guru',
  'Gift Guide',
  'Used Gear',
].map((label) => ({ label, href: '#' }));

const CUSTOMER_CARE_LINKS = [
  'Contact Us',
  'Run Happy Promise',
  'Returns',
  'Track Order',
  'Shipping',
  'Store Locator',
  'FAQ',
  'Gift Cards',
].map((label) => ({ label, href: '#' }));

const GET_TO_KNOW_OUR_BRAND_LINKS = [
  'Our Company',
  'Our Purpose',
  'Our History',
  'Sustainability',
  'Careers',
  'Press',
  'Research & Innovation',
  'Running with Purpose: A book by former Brooks CEO Jim Weber',
].map((label) => ({ label, href: '#' }));

const COLUMN_LINKS = [
  RUN_COMMUNITY_LINKS,
  FIND_YOUR_PERFECT_GEAR_LINKS,
  CUSTOMER_CARE_LINKS,
  GET_TO_KNOW_OUR_BRAND_LINKS,
];

function getFieldValue(field: TextField | undefined, fallback: string): string {
  if (!field?.value) return fallback;
  const v = field.value?.toString?.() ?? '';
  return v.trim() || fallback;
}

export const Default = (props: FooterProps) => {
  const id = props.params.RenderingIdentifier;

  const newsletterTitle = getFieldValue(props.fields.NewsletterTitle, DEFAULT_NEWSLETTER_TITLE);

  const sections = [
    { key: 'first_nav', titleLabel: COLUMN_TITLES[0], links: COLUMN_LINKS[0] },
    { key: 'second_nav', titleLabel: COLUMN_TITLES[1], links: COLUMN_LINKS[1] },
    { key: 'third_nav', titleLabel: COLUMN_TITLES[2], links: COLUMN_LINKS[2] },
    { key: 'fourth_nav', titleLabel: COLUMN_TITLES[3], links: COLUMN_LINKS[3] },
  ];

  return (
    <footer
      className={`component footer bg-background text-foreground relative ${props.params.styles ?? ''} overflow-hidden`}
      id={id}
    >
      {/* Main: logo + newsletter + social | link columns */}
      <div className="bg-background border-b border-neutral-200">
        <div className="container py-12 lg:py-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
            {/* Left: logo, newsletter, social */}
            <div className="flex flex-col gap-8">
              <div className="text-primary max-w-34">
                <Image field={props.fields.Logo} />
              </div>
              <div className="footer-newsletter">
                <p className="text-foreground/90 text-sm">{newsletterTitle}</p>
                <form className="mt-4" onSubmit={(e) => e.preventDefault()} noValidate>
                  <label
                    htmlFor="footer-email"
                    className="text-foreground mb-1.5 block text-xs font-medium"
                  >
                    Email address
                  </label>
                  <div className="flex gap-0">
                    <input
                      id="footer-email"
                      type="email"
                      placeholder="E.g. John.doe@gmail.com"
                      className="bg-background text-foreground min-w-0 flex-1 rounded-l border border-neutral-300 px-3 py-2.5 text-sm placeholder:text-neutral-500 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                      aria-label="Email address"
                    />
                    <button
                      type="submit"
                      className="flex items-center justify-center rounded-r bg-neutral-900 px-4 py-2.5 text-white transition hover:bg-neutral-800"
                      aria-label="Subscribe"
                    >
                      <ArrowRight className="h-5 w-5" strokeWidth={2} />
                    </button>
                  </div>
                </form>
              </div>
              <div className="footer-social flex flex-wrap items-center gap-5">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-700 transition hover:text-neutral-900"
                    aria-label={social.ariaLabel}
                  >
                    <FontAwesomeIcon icon={social.icon} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right: four link columns */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {sections.map(({ key, titleLabel, links }) => (
                <div key={key} className="footer-column">
                  <div className="text-foreground mb-4 text-xs font-extrabold tracking-wide uppercase">
                    {titleLabel}
                  </div>
                  <nav className="footer-links text-foreground/80 hover:[&_a]:text-foreground space-y-2 text-sm [&_a]:no-underline [&_a]:transition">
                    {links.map((item) => (
                      <a key={item.label} href={item.href} className="block">
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Optional description row (e.g. for rich text below logo area) */}
      {props.fields.Description?.value?.toString?.()?.trim() && (
        <div className="bg-background border-b border-neutral-200">
          <div className="container py-6">
            <div className="footer-description text-foreground/80 [&_a]:text-foreground hover:[&_a]:text-foreground/90 text-sm [&_a]:underline">
              <RichText field={props.fields.Description} />
            </div>
          </div>
        </div>
      )}

      {/* Bottom: legal links | copyright */}
      <div className="bg-background">
        <div className="container py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-foreground/80 order-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:order-1">
              <Link field={props.fields.TermsText} className="hover:underline" />
              <Link field={props.fields.PolicyText} className="hover:underline" />
              {LEGAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 hover:underline"
                >
                  {item.showIcon && (
                    <span
                      className="inline-flex h-4 w-4 items-center justify-center rounded border border-current text-[10px] font-bold"
                      aria-hidden
                    >
                      ×
                    </span>
                  )}
                  {item.label}
                </a>
              ))}
            </div>
            <div className="text-foreground/70 order-1 text-xs sm:order-2">
              <FooterCopyrightText field={props.fields.CopyrightText} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
