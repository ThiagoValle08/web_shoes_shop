import { Component } from '@angular/core';
import { ShoesService } from '../../../services/shoes.service';
interface ImageItem {
  color: string;
  nombre: string;
  featuredImage: string;
  totalImages: string[];
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products = [
    {
      title: 'NIKE BOTA AF1',
      price: 'VER MÁS',
      imageUrl: 'shoesImages/AF1/nike_simpon_blanco_1.webp',
    },
    {
      title: 'HUGO BOSS',
      price: 'VER MÁS',
      imageUrl: 'shoesImages/boss/BossBurbujaNegro1.webp',
    },
    {
      title: 'HUGO BOSS ',
      price: 'VER MÁS',
      imageUrl: 'shoesImages/boss/hugoBoss_1.webp',
    },
    {
      title: 'HUGO BOSS_',
      price: 'VER MÁS',
      imageUrl: 'shoesImages/boss/boss_negro1.webp',
    },
    {
      title: 'MICHAEL KORS',
      price: 'VER MÁS',
      imageUrl: 'shoesImages/mk/mk-1.webp',
    },
    {
      title: 'ARMANI EXCHANGE',
      price: 'VER MÁS',
      imageUrl: 'shoesImages/armani/armani_azul1.webp',
    },
    {
      title: 'DIESEL',
      price: 'VER MÁS',
      imageUrl: 'shoesImages/diesel/diese_blanco1.webp',
    },
    {
      title: ' HUGO BOSS ',
      price: 'VER MÁS',
      imageUrl: 'shoesImages/boss/hugo_negro1.webp',
    },
    {
      title: 'CONVERSE ',
      price: 'VER MÁS',
      imageUrl: 'shoesImages/converce/converse blanco 1.webp',
    },
    {
      title: 'LOUIS VUITTON',
      price: 'VER MÁS',
      imageUrl: 'shoesImages/lv/lv blanco 1.png',
    },
    {
      title: 'NEW BALANCE',
      price: 'VER MÁS',
      imageUrl: 'shoesImages/new/new_blanco_1.png',
    },
    {
      title: 'OFF WHITE',
      price: 'VER MÁS',
      imageUrl: 'shoesImages/off/off gris 1.png',
    },
    {
      title: 'ADIDAS SAMBA',
      price: 'VER MÁS',
      imageUrl: 'shoesImages/Samba/samba negro 1.png',
    },
    {
      title: 'OFF-WHITE NIÑO',
      price: 'VER MÁS',
      imageUrl: 'shoesImages/off-niño/offniñopanda1.webp',
    },
  ];

  changeShoes(nameShoe: string) {
    this.shoesService.changeShoes(nameShoe);
  }
  constructor(private shoesService: ShoesService) {}
}
