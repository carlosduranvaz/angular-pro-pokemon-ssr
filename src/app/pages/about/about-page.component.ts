import {Component, inject, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
})
export default class AboutPageComponent implements OnInit{
  private title: Title = inject(Title);
  private meta: Meta = inject(Meta);

  ngOnInit() {
    this.title.setTitle('About Page');
    this.meta.updateTag({
      name: 'description',
      content: 'Este es mi About page'
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'About Page'
    });
  }
}
