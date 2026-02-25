import { createContext, useContext } from 'react';

/** When true, the root Layout has already rendered the header logo; Header should not render it again. */
export const HeaderLogoContext = createContext<boolean>(false);

export function useHeaderLogoRendered(): boolean {
  return useContext(HeaderLogoContext);
}

