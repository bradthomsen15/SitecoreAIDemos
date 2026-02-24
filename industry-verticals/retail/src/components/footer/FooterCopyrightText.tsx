'use client';

import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import React, { useEffect, useState } from 'react';

type Props = { field: TextField };

/**
 * Renders copyright text in a way that avoids SDK Text server/client hydration mismatch.
 * Uses raw value for initial paint, then switches to SDK Text after mount for editing support.
 */
export function FooterCopyrightText({ field }: Props): React.ReactElement {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const rawValue =
    field?.value != null ? String(field.value).trim() : '';

  if (!hasMounted) {
    return <>{rawValue}</>;
  }

  return <Text field={field} />;
}
