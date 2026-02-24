import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
  Placeholder,
  Link,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { CommonStyles, HeroBannerStyles, LayoutStyles } from '@/types/styleFlags';
import clsx from 'clsx';

interface Fields {
  Image: ImageField;
  Video: ImageField;
  Title: Field<string>;
  Description: Field<string>;
  CtaLink: LinkField;
  /** Second CTA for dual-CTA layout (e.g. Shop Men | Shop Women). Template field: SecondaryCtaLink. */
  SecondaryCtaLink?: LinkField;
  /** Optional eyebrow/kicker text (e.g. "THE NEW"). Used in ProductLaunch variant. */
  Eyebrow?: Field<string>;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

const HeroBannerCommon = ({
  params,
  fields,
  children,
}: HeroBannerProps & {
  children: React.ReactNode;
}) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;
  const hideGradientOverlay = styles?.includes(HeroBannerStyles.HideGradientOverlay);
  const darkOverlay = styles?.includes(HeroBannerStyles.DarkOverlay);

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner ${styles}`} id={id}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <div
      className={`component hero-banner ${styles} relative flex items-center`}
      id={id}
      suppressHydrationWarning
    >
      {/* Background Media - suppressHydrationWarning: SDK NextImage can differ server vs client (e.g. editing attributes) */}
      <div className="absolute inset-0 z-0" suppressHydrationWarning>
        {!isPageEditing && fields?.Video?.value?.src ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={fields.Image?.value?.src}
          >
            <source src={fields.Video?.value?.src} type="video/webm" />
          </video>
        ) : (
          <>
            <ContentSdkImage
              field={fields.Image}
              className="h-full w-full object-cover md:object-bottom"
              priority
            />
          </>
        )}
        {/* Gradient overlay: dark for light text, or light fade at bottom */}
        {!hideGradientOverlay && darkOverlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 from-0% via-black/30 to-black/60" />
        )}
        {!hideGradientOverlay && !darkOverlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-85% to-white"></div>
        )}
      </div>

      {children}
    </div>
  );
};

export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;
  const hasSecondCta =
    fields?.SecondaryCtaLink?.value?.href != null || fields?.SecondaryCtaLink?.value?.text;
  const useDualCtaWhiteLayout = hasSecondCta && fields?.SecondaryCtaLink;
  const paramsWithDarkOverlay = useDualCtaWhiteLayout
    ? {
        ...params,
        styles: [styles, HeroBannerStyles.DarkOverlay, HeroBannerStyles.HideGradientOverlay]
          .filter(Boolean)
          .join(' '),
      }
    : params;

  return (
    <HeroBannerCommon params={paramsWithDarkOverlay} fields={fields} rendering={rendering}>
      {/* Content Container */}
      <div className="relative w-full">
        <div className="container mx-auto px-4">
          <div
            className={`flex min-h-119 w-full py-10 lg:w-1/2 lg:items-center ${useDualCtaWhiteLayout ? 'lg:mr-auto' : reverseLayout ? 'lg:mr-auto' : 'lg:ml-auto'}`}
          >
            <div className="max-w-182">
              <div className={clsx({ shim: screenLayer })}>
                {useDualCtaWhiteLayout ? (
                  <div className="p-[10%]">
                    {/* Description above title - small, white, left-aligned */}
                    <div
                      className="text-left text-sm text-white md:text-base"
                      suppressHydrationWarning
                    >
                      <ContentSdkRichText
                        field={fields.Description}
                        className="[&_*]:text-inherit"
                      />
                    </div>
                    {/* Title - white, no accent line, left-aligned, same line (e.g. GLYCERIN FLEX) */}
                    <h1 className="mt-2 whitespace-nowrap text-left text-5xl font-bold leading-[110%] text-white md:text-7xl md:leading-[130%] xl:text-[80px]">
                      <ContentSdkText tag="span" field={fields.Title} />
                    </h1>
                    {/* Two CTAs side by side - bold, underlined, white, left-aligned */}
                    <div className="mt-6 flex flex-wrap items-center justify-start gap-x-6 gap-y-2">
                      <Link
                        field={fields.CtaLink}
                        className="font-bold text-white underline underline-offset-4 hover:no-underline"
                      />
                      <Link
                        field={fields.SecondaryCtaLink!}
                        className="font-bold text-white underline underline-offset-4 hover:no-underline"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Title */}
                    <h1 className="text-center text-5xl leading-[110%] font-bold capitalize md:text-7xl md:leading-[130%] lg:text-left xl:text-[80px]">
                      <ContentSdkText tag="span" field={fields.Title} />
                      {!hideAccentLine && <AccentLine className="mx-auto !h-5 w-[9ch] lg:mx-0" />}
                    </h1>

                    {/* Description - suppressHydrationWarning: SDK RichText can differ server vs client (e.g. empty state / editing UI) */}
                    <div className="mt-7 text-xl md:text-2xl" suppressHydrationWarning>
                      <ContentSdkRichText
                        field={fields.Description}
                        className="text-center lg:text-left"
                      />
                    </div>

                    {/* CTA Link or Placeholder */}
                    <div className="mt-6 flex w-full justify-center lg:justify-start">
                      {withPlaceholder ? (
                        <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                      ) : (
                        <Link field={fields.CtaLink} className="arrow-btn" />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};

export const TopContent = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      {/* Content Container */}
      <div className="relative w-full">
        <div className="container mx-auto flex min-h-119 justify-center px-4">
          <div
            className={`flex flex-col items-center py-10 lg:py-44 ${reverseLayout ? 'justify-end' : 'justify-start'}`}
          >
            <div className={clsx({ shim: screenLayer })}>
              {/* Title */}
              <h1 className="text-center text-5xl leading-[110%] font-bold capitalize md:text-7xl md:leading-[130%] xl:text-[80px]">
                <ContentSdkText tag="span" field={fields.Title} />
                {!hideAccentLine && <AccentLine className="mx-auto !h-5 w-[9ch]" />}
              </h1>

              {/* Description - suppressHydrationWarning: SDK RichText can differ server vs client (editing vs preview) */}
              <div className="mt-7 text-xl md:text-2xl" suppressHydrationWarning>
                <ContentSdkRichText field={fields.Description} className="text-center" />
              </div>

              {/* CTA Link or Placeholder */}
              <div className="mt-6 flex w-full justify-center">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <Link field={fields.CtaLink} className="arrow-btn" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};

/**
 * Product-launch variant: eyebrow, large title, and two side-by-side links.
 * Matches layout with small uppercase eyebrow, bold headline, and underlined CTAs (e.g. "SHOP WOMEN" | "SHOP MEN").
 * Uses optional Eyebrow and SecondaryCtaLink fields when present.
 */
export const ProductLaunch = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const paramsWithDarkOverlay = {
    ...params,
    styles: [styles, HeroBannerStyles.DarkOverlay].filter(Boolean).join(' '),
  };
  const hasSecondLink =
    fields?.SecondaryCtaLink?.value?.href != null || fields?.SecondaryCtaLink?.value?.text;

  return (
    <HeroBannerCommon params={paramsWithDarkOverlay} fields={fields} rendering={rendering}>
      <div className="relative w-full">
        <div className="container mx-auto px-4">
          <div className="flex min-h-119 w-full items-start py-10 lg:w-1/2">
            <div className={clsx({ shim: screenLayer })}>
              {fields?.Eyebrow != null && (
                <p className="text-sm font-semibold uppercase tracking-wider text-white">
                  <ContentSdkText tag="span" field={fields.Eyebrow} />
                </p>
              )}
              <h1 className="mt-1 text-left text-4xl font-bold uppercase leading-tight text-white md:text-6xl xl:text-7xl">
                <ContentSdkText tag="span" field={fields.Title} />
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold uppercase tracking-wider text-white">
                <Link field={fields.CtaLink} className="underline underline-offset-4 hover:no-underline" />
                {hasSecondLink && fields?.SecondaryCtaLink && (
                  <Link
                    field={fields.SecondaryCtaLink}
                    className="underline underline-offset-4 hover:no-underline"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};
