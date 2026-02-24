import { createBrooksLogoSrc, createTextField } from '../helpers/createFields';

export const createNavItem = (text: string) => {
  return {
    Id: `${text}-${Date.now()}`,
    Href: '#',
    Querystring: '',
    DisplayName: text,
    Title: createTextField(text),
    NavigationTitle: createTextField(text),
  };
};

export const arrayToObject = <T>(arr: T[]): Record<string, T> =>
  arr.reduce(
    (acc, item, index) => {
      acc[String(index)] = item;
      return acc;
    },
    {} as Record<string, T>
  );

export const navRoot = {
  ...createNavItem('Home'),
  Styles: ['level0', 'submenu', 'item0', 'odd', 'first', 'last', 'active'],
};

/** Brooks Running–style top-level nav (Shop all, Women, Men, Apparel, Shoe Finder) */
export const topLevelPages = [
  {
    ...createNavItem('Shop all'),
    Styles: ['level1', 'item0', 'odd', 'first'],
  },
  {
    ...createNavItem('Women'),
    Styles: ['level1', 'item1', 'even'],
    Children: [
      {
        ...createNavItem('Shoes'),
        Styles: ['level2', 'item0', 'odd', 'first'],
      },
      {
        ...createNavItem('Apparel'),
        Styles: ['level2', 'item1', 'even'],
      },
    ],
  },
  {
    ...createNavItem('Men'),
    Styles: ['level1', 'item1', 'even'],
    Children: [
      {
        ...createNavItem('Shoes'),
        Styles: ['level2', 'item0', 'odd', 'first'],
      },
      {
        ...createNavItem('Apparel'),
        Styles: ['level2', 'item1', 'even'],
      },
    ],
  },
  {
    ...createNavItem('Apparel'),
    Styles: ['level1', 'item1', 'even'],
    Children: [
      {
        ...createNavItem('Women'),
        Styles: ['level2', 'item0', 'odd', 'first'],
      },
      {
        ...createNavItem('Men'),
        Styles: ['level2', 'item1', 'even', 'last'],
      },
    ],
  },
  {
    ...createNavItem('Shoe Finder'),
    Styles: ['level1', 'submenu', 'item2', 'odd', 'last'],
  },
];

export const flatTopLevelPages = [
  {
    ...createNavItem('Shop all'),
    Styles: ['level0', 'item0', 'odd', 'first', 'flat-level1'],
  },
  {
    ...createNavItem('Women'),
    Styles: ['level0', 'item1', 'even', 'flat-level1'],
  },
  {
    ...createNavItem('Men'),
    Styles: ['level0', 'item1', 'even', 'flat-level1'],
  },
  {
    ...createNavItem('Apparel'),
    Styles: ['level0', 'item0', 'odd', 'first', 'flat-level2'],
  },
  {
    ...createNavItem('Shoe Finder'),
    Styles: ['level0', 'submenu', 'item2', 'odd', 'last', 'flat-level1'],
  },
];

export const getNavigationFields = (options?: { withRoot?: boolean; flat?: boolean }) => {
  const { withRoot = true, flat = false } = options || {};

  const pages = flat ? flatTopLevelPages : topLevelPages;

  if (withRoot) {
    return {
      0: {
        ...navRoot,
        Children: pages,
      },
    };
  }

  return arrayToObject(pages);
};

export const logoParam = `<image mediaid="8cc2a449-e23b-488c-bb23-3d7c7a07f6e7" mediaurl="${createBrooksLogoSrc()}" />`;
