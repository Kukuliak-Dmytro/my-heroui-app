"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/shared/lib/i18n/navigation";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

const LOCALES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ua", name: "Українська", flag: "🇺🇦" },
];

/**
 * Locale switcher component for changing application language.
 *
 * This component provides a dropdown interface for switching between
 * available locales. It updates the URL and maintains the current page
 * when changing languages.
 *
 * @returns {JSX.Element} The locale switcher component
 */
export const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = LOCALES.find((l) => l.code === locale) || LOCALES[0];

  const handleLocaleChange = (newLocale: string) => {
    // Use replace to clear history when changing language (context change)
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" size="sm">
          <span className="mr-2">{currentLocale.flag}</span>
          {currentLocale.name}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Select language"
        onAction={(key) => handleLocaleChange(key as string)}>
        {LOCALES.map((locale) => (
          <DropdownItem key={locale.code} value={locale.code}>
            <span className="mr-2">{locale.flag}</span>
            {locale.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
