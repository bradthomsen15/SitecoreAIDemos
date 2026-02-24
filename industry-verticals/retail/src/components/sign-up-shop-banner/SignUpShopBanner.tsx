import React, { JSX } from 'react';
import {
  Field,
  Link,
  LinkField,
  RichText,
  RichTextField,
  Text,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface SignUpShopBannerFields {
  Title?: Field<string>;
  Description?: RichTextField;
  SignUpLink?: LinkField;
  LoginLink?: LinkField;
}

export type SignUpShopBannerProps = ComponentProps & {
  params: { [key: string]: string };
  fields?: SignUpShopBannerFields;
};

/**
 * Promotional banner with headline, description, and stacked Sign up / Log in CTAs.
 * Layout: heading (left), body text (center), buttons (right) on white background.
 */
export const Default = (props: SignUpShopBannerProps): JSX.Element => {
  const { styles, RenderingIdentifier: id } = props.params ?? {};
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;

  const fields = props.fields ?? {};
  const { Title, Description, SignUpLink, LoginLink } = fields;

  const hasContent =
    Title?.value ||
    Description?.value ||
    SignUpLink?.value?.href ||
    LoginLink?.value?.href ||
    isEditing;

  if (!hasContent && !isEditing) {
    return <></>;
  }

  return (
    <section
      className={`component sign-up-shop-banner bg-background py-10 md:py-14 ${styles ?? ''}`}
      id={id || undefined}
    >
      <div className="container mx-auto flex max-w-6xl flex-col items-stretch gap-8 px-6 md:flex-row md:items-center md:gap-12">
        {/* Heading - left */}
        <div className="min-w-0 flex-1">
          <h2 className="text-foreground text-2xl leading-tight font-extrabold tracking-tight md:text-3xl xl:text-4xl">
            {Title != null && (Title.value || isEditing) ? (
              <Text field={Title} tag="span" />
            ) : isEditing ? (
              <span>[Heading]</span>
            ) : null}
          </h2>
        </div>

        {/* Description - center */}
        <div className="text-foreground-light max-w-xl min-w-0 flex-1 text-base leading-relaxed">
          {Description != null && (Description.value || isEditing) ? (
            <RichText field={Description} className="[&_p]:mb-0" />
          ) : isEditing ? (
            <span>[Description]</span>
          ) : null}
        </div>

        {/* Buttons - right, stacked */}
        <div className="flex shrink-0 flex-col items-stretch gap-3 md:w-auto md:min-w-[140px]">
          {SignUpLink != null && (SignUpLink.value?.href || isEditing) ? (
            <Link
              field={SignUpLink}
              className="bg-foreground text-background hover:bg-foreground/90 inline-flex h-12 w-full items-center justify-center rounded-md px-6 text-base font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 md:w-auto md:min-w-[120px]"
            />
          ) : isEditing ? (
            <span className="bg-foreground text-background inline-flex h-12 w-full items-center justify-center rounded-md px-6 text-base font-semibold md:min-w-[120px]">
              [Sign up]
            </span>
          ) : null}
          {LoginLink != null && (LoginLink.value?.href || isEditing) ? (
            <Link
              field={LoginLink}
              className="bg-foreground text-background hover:bg-foreground/90 inline-flex h-12 w-full items-center justify-center rounded-md px-6 text-base font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 md:w-auto md:min-w-[120px]"
            />
          ) : isEditing ? (
            <span className="bg-foreground text-background inline-flex h-12 w-full items-center justify-center rounded-md px-6 text-base font-semibold md:min-w-[120px]">
              [Log in]
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
};
