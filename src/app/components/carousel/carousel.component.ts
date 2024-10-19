import { Component } from '@angular/core';
import { ShoesService } from '../../services/shoes.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  items: any[] = [
    {
      image: 'shoesImages/boss/BossBurbujaNegro1.webp',
      title: 'HUGO BOSS',
      des: 'COLORES',
      configurations: [{ label: 'NEGRO', value: 'TALLAS: 38-43' }],
    },
    {
      image: 'shoesImages/armani/armani_azul1.webp',
      title: 'ARMANI EXCHANGE',
      des: 'COLORES',
      configurations: [{ label: 'BLANCO-AZUL', value: 'TALLAS: 38-43' }],
    },
    {
      image: 'shoesImages/mk/mk-1.webp',
      title: 'MICHAEL KORS',
      des: 'COLORES',
      configurations: [{ label: 'NEGRO', value: 'TALLAS: 38-43' }],
    },
    {
      image: 'shoesImages/boss/hugo_negro1.webp',
      title: ' HUGO BOSS ',
      des: 'COLORES',
      configurations: [{ label: 'NEGRO', value: 'TALLAS: 38-43' }],
    },

    {
      image: 'shoesImages/diesel/diese_blanco1.webp',
      title: 'DIESEL',
      des: 'COLORES',
      configurations: [{ label: 'BLANCO', value: 'TALLAS: 35-43' }],
    },
  ];

  constructor(private shoesService: ShoesService) {}

  changeShoes(nameShoe: string) {
    this.shoesService.changeShoes(nameShoe);
  }

  next() {
    const firstItem = this.items.shift();
    this.items.push(firstItem);
  }

  prev() {
    const lastItem = this.items.pop();
    this.items.unshift(lastItem);
  }
}
