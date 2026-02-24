import type { NavItemFields } from '@/components/navigation/Navigation';

const createItem = (text: string, styles: string[], children?: NavItemFields[]): NavItemFields => ({
  Id: `brooks-${text.replace(/\s+/g, '-').toLowerCase()}`,
  Href: '#',
  Querystring: '',
  DisplayName: text,
  Title: { value: text },
  NavigationTitle: { value: text },
  Styles: styles,
  ...(children?.length ? { Children: children } : {}),
});

/** Brooks Running–style nav: Shop all, Women, Men, etc. (no root/logo – logo lives in header-left via HeaderLogo) */
export function getBrooksNavFields(): Record<string, NavItemFields> {
  const topLevelPages: NavItemFields[] = [
    createItem('Shop all', ['level1', 'item0', 'odd', 'first']),
    createItem('Women', ['level1', 'item1', 'even'], [
      createItem('Shoes', ['level2', 'item0', 'odd', 'first']),
      createItem('Apparel', ['level2', 'item1', 'even']),
    ]),
    createItem('Men', ['level1', 'item1', 'even'], [
      createItem('Shoes', ['level2', 'item0', 'odd', 'first']),
      createItem('Apparel', ['level2', 'item1', 'even']),
    ]),
    createItem('Apparel', ['level1', 'item1', 'even'], [
      createItem('Women', ['level2', 'item0', 'odd', 'first']),
      createItem('Men', ['level2', 'item1', 'even', 'last']),
    ]),
    createItem('Shoe Finder', ['level1', 'submenu', 'item2', 'odd', 'last']),
  ];

  return topLevelPages.reduce(
    (acc, item, index) => {
      acc[String(index)] = item;
      return acc;
    },
    {} as Record<string, NavItemFields>
  );
}
