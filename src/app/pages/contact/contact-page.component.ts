import {Component, inject, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
})
export default class ContactPageComponent implements OnInit {
  private title: Title = inject(Title);
  private meta: Meta = inject(Meta);

  ngOnInit() {
    this.title.setTitle('Contact Page');
    this.meta.updateTag({
      name: 'description',
      content: 'Este es mi Contact page'
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Contact Page'
    });
  }
}
