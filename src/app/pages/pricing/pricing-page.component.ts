import {Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
})
export default class PricingPageComponent implements OnInit {
  private title: Title = inject(Title);
  private meta: Meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit() {
    // console.log(this.platform);
    // console.log({ hola: 'mundo' });
    this.title.setTitle('Pricing Page');
    this.meta.updateTag({
      name: 'description',
      content: 'Este es mi Pricing page'
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Pricing Page'
    });
  }
}
