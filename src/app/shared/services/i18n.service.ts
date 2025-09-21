import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  public translations: { [key: string]: string } = {};
  public currentLang: string = localStorage.getItem('lang') || 'en';

  constructor(private http: HttpClient) {}

  loadTranslations(moduleName: string, lang: string): void {
    const modulePath = `/assets/i18n/${moduleName}/${moduleName}-${lang}.json`;
    this.http.get(modulePath).subscribe((moduleTranslations) => {
      this.translations = { ...(moduleTranslations as object) };
    });
  }

  setLanguage(lang: string) {
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
  }

  changeLenguage() {
    const currentLang = this.currentLang;
    if(currentLang === 'en') {
      this.setLanguage('es');
    } else {
      this.setLanguage('en');
    }
    window.location.reload();
  }

  translate(key: string): string {
    if(!this.translations[key]) return ''
    const translatedText = this.translations[key] || key;
    return translatedText;
  }
}