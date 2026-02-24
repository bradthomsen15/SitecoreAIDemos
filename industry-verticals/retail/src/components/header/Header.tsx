import React, { JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from '@/lib/component-props';
import { Placeholder } from '@sitecore-content-sdk/nextjs';
import type { ImageField } from '@sitecore-content-sdk/nextjs';
import { Default as HeaderLogo } from '@/components/header-logo/HeaderLogo';
import { useHeaderLogoRendered } from '@/contexts/HeaderLogoContext';

/** Bundled logo so the image always loads (no broken /public path). */
import brooksLogo from '@/assets/images/brooks-header-logo.png';

export type HeaderProps = ComponentProps & {
  params: { [key: string]: string };
  fields?: { Logo?: ImageField };
};

export const Default = (props: HeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;
  const logoRenderedByLayout = useHeaderLogoRendered();
  const logoField = props.fields?.Logo;
  const hasDatasourceLogo = Boolean(logoField?.value?.src);

  return (
    <div
      className={`component header bg-accent text-white font-bold [&_.component]:text-white [&_.component]:font-bold [&_.component_a]:text-white [&_.component_a]:font-bold [&_.component_a:hover]:text-white/90 [&_.component_button]:text-white [&_.component_button]:font-bold [&_.component_button:hover]:text-white/90 ${styles}`}
      id={id}
    >
      <div className={`container flex items-center gap-3 lg:gap-5 ${logoRenderedByLayout ? 'flex-1 min-w-0' : ''}`}>
        {!logoRenderedByLayout && (
          <div className="max-lg:order-0 lg:flex-[1_1] min-h-12 flex items-center">
            {hasDatasourceLogo ? (
              <HeaderLogo
                params={{
                  ...props.params,
                  styles: props.params.styles ?? '',
                  RenderingIdentifier: `${id}-logo`,
                }}
                fields={{ Logo: logoField }}
                rendering={props.rendering}
              />
            ) : (
              <Link
                href="/"
                className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
                aria-label="Brooks home"
              >
                <Image
                  src={brooksLogo}
                  alt="Brooks"
                  className="h-8 w-auto max-w-36 object-contain object-left"
                  width={160}
                  height={40}
                  priority
                />
              </Link>
            )}
          </div>
        )}
        <div className="max-lg:order-1 max-lg:mr-auto max-lg:w-2/3 lg:flex-[4_1]">
          <Placeholder name={`header-nav-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
        <div className="max-lg:order-2 lg:flex-[1_1]">
          <Placeholder name={`header-right-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
      </div>
    </div>
  );
};
