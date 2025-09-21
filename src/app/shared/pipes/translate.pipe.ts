import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '@shared/services/i18n.service';

@Pipe({
  name: 'translate',
  standalone: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private i18n: I18nService) {}

  transform(key: string): string {
    if(!this.i18n.translate(key)) return '';
    const transformText =  this.i18n.translate(key);
    return transformText;
  }
}
