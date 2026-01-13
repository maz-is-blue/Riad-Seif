import { ArrowLeft, ArrowRight } from 'lucide-react';
import { content } from '../utils/content';
import type { Language, LocaleContent } from '../types';

export function useTranslation(lang: Language) {
  const t: LocaleContent = content[lang];
  const isRTL = lang === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return { t, isRTL, ArrowIcon, direction: t.direction, formatDate };
}
