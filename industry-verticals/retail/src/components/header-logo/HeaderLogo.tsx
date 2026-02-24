'use client';

import React, { JSX } from 'react';
import {
  ImageField,
  Link,
  NextImage as ContentSdkImage,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export type HeaderLogoProps = ComponentProps & {
  params: { [key: string]: string };
  fields: {
    Logo?: ImageField;
  };
};

/** Local path (e.g. /brooks-header-logo.png) - use plain img for reliability. Sitecore CDN URLs use ContentSdkImage. */
function isLocalLogoSrc(src: string | undefined): boolean {
  return Boolean(src && (src.startsWith('/') || src.startsWith('data:')));
}

/**
 * Renders the header logo on the left. When Logo is empty, shows an upload placeholder.
 * Authors can set the Logo image in XM Cloud to display their logo.
 */
export const Default = (props: HeaderLogoProps): JSX.Element => {
  const { params, fields } = props;
  const { page } = useSitecore();
  const { styles = '', RenderingIdentifier: id } = params;
  const logoValue = fields?.Logo?.value;
  const hasLogo = Boolean(logoValue?.src);
  const usePlainImg = hasLogo && isLocalLogoSrc(logoValue?.src);

  const logoContent = hasLogo ? (
    usePlainImg ? (
      // eslint-disable-next-line @next/next/no-img-element -- local static logo, avoid Next Image config issues
      <img
        src={logoValue!.src!}
        alt={logoValue?.alt ?? 'Brooks'}
        className="h-8 w-auto max-w-36 object-contain object-left"
        width={logoValue?.width ?? 160}
        height={logoValue?.height ?? 40}
      />
    ) : (
      <ContentSdkImage
        field={fields.Logo!}
        className="h-8 w-auto max-w-36 object-contain object-left"
      />
    )
  ) : (
    <div
      className="border-border text-foreground-muted flex h-12 w-36 flex-col items-center justify-center gap-1 rounded border-2 border-dashed bg-background-surface text-center text-sm"
      aria-label="Logo image placeholder"
    >
      <svg
        className="text-foreground-muted size-6 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>
      <span>{page.mode.isEditing ? 'Add logo image' : 'Image'}</span>
    </div>
  );

  return (
    <div className={`component header-logo shrink-0 ${styles}`} id={id}>
      <Link
        href="/"
        className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        aria-label="Home"
      >
        {logoContent}
      </Link>
    </div>
  );
};
