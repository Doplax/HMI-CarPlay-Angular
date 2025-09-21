import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private translations: { [key: string]: string } = {};
  private currentLang: string = 'en';

  loadTranslations(shared: any, module?: any) {
    this.translations = { ...shared, ...(module || {}) };
  }

  setLanguage(lang: string) {
    this.currentLang = lang;
  }

  translate(key: string): string {
    return this.translations[key] || key;
  }
}
