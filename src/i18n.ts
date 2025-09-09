// Path: src/i18n.ts

import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => {
  const finalLocale = (locale && ['tr', 'en'].includes(locale)) ? locale : 'tr';
  
  try {
    const messages = (await import(`../messages/${finalLocale}.json`)).default;
    return {
      locale: finalLocale,
      messages
    };
  } catch (error) {
    // Fallback to Turkish
    const messages = (await import(`../messages/tr.json`)).default;
    return {
      locale: 'tr',
      messages
    };
  }
});