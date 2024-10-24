import { Injectable } from '@angular/core';
interface ImageItem {
  color: string;
  nombre: string;
  featuredImage: string;
  totalImages: string[];
}
@Injectable({
  providedIn: 'root',
})
export class ShoesService {
  private images: ImageItem[] = [
    {
      color: 'COLOR NEGRO',
      nombre: 'HUGO BOSS',
      featuredImage: 'shoesImages/boss/BossBurbujaNegro1.webp',
      totalImages: [
        'shoesImages/boss/BossBurbujaNegro1.webp',
        'shoesImages/boss/BossBurbujaNegro2.webp',
        'shoesImages/boss/BossBurbujaNegro3.webp',
        'shoesImages/boss/BossBurbujaNegro4.webp',
        'shoesImages/boss/BossBurbujaNegro5.webp',
        'shoesImages/boss/BossBurbujaNegro6.webp',
      ],
    },
  ];

  changeShoes(nameShoe: string) {
    switch (nameShoe) {
      case 'HUGO BOSS':
        this.images = [
          {
            color: 'COLOR NEGRO',
            nombre: 'HUGO BOSS',
            featuredImage: 'shoesImages/boss/BossBurbujaNegro1.webp',
            totalImages: [
              'shoesImages/boss/BossBurbujaNegro1.webp',
              'shoesImages/boss/BossBurbujaNegro2.webp',
              'shoesImages/boss/BossBurbujaNegro3.webp',
              'shoesImages/boss/BossBurbujaNegro4.webp',
              'shoesImages/boss/BossBurbujaNegro5.webp',
              'shoesImages/boss/BossBurbujaNegro6.webp',
            ],
          },
        ];
        break;
      case 'HUGO BOSS_':
        this.images = [
          {
            color: 'COLOR NEGRO',
            nombre: 'HUGO BOSS',
            featuredImage: 'shoesImages/boss/boss_negro1.webp',
            totalImages: [
              'shoesImages/boss/boss_negro1.webp',
              'shoesImages/boss/boss_negro2.webp',
              'shoesImages/boss/boss_negro3.webp',
              'shoesImages/boss/boss_negro4.webp',
            ],
          },
        ];
        break;
      case 'HUGO BOSS ':
        this.images = [
          {
            color: 'COLOR NEGRO',
            nombre: 'HUGO BOSS ',
            featuredImage: 'shoesImages/boss/hugoBoss_1.webp',
            totalImages: [
              'shoesImages/boss/hugoBoss_1.webp',
              'shoesImages/boss/hugoBoss_2.webp',
              'shoesImages/boss/hugoBoss_3.webp',
              'shoesImages/boss/hugoBoss_4.webp',
            ],
          },
        ];
        break;
      case ' HUGO BOSS ':
        this.images = [
          {
            color: 'COLOR NEGRO x BLANCO',
            nombre: 'HUGO BOSS ',
            featuredImage: 'shoesImages/boss/hugo_negro1.webp',
            totalImages: [
              'shoesImages/boss/hugo_negro1.webp',
              'shoesImages/boss/hugo_negro2.webp',
              'shoesImages/boss/hugo_negro3.webp',
              'shoesImages/boss/hugo_negro4.webp',
            ],
          },
          {
            color: 'COLOR NEGRO X NEGRO',
            nombre: 'HUGO BOSS ',
            featuredImage: 'shoesImages/boss/bossCapellada1.webp',
            totalImages: [
              'shoesImages/boss/bossCapellada1.webp',
              'shoesImages/boss/bossCapellada2.webp',
              'shoesImages/boss/bossCapellada3.webp',
              'shoesImages/boss/bossCapellada4.webp',
              'shoesImages/boss/bossCapellada5.webp',
              'shoesImages/boss/bossCapellada6.webp',
            ],
          },
        ];
        break;
      case 'MICHAEL KORS':
        this.images = [
          {
            color: 'COLOR NEGRO',
            nombre: 'MICHAEL KORS',
            featuredImage: 'shoesImages/mk/mk-1.webp',
            totalImages: [
              'shoesImages/mk/mk-1.webp',
              'shoesImages/mk/mk-2.webp',
              'shoesImages/mk/mk-3.webp',
              'shoesImages/mk/mk-4.webp',
            ],
          },
        ];
        break;
      case 'DIESEL':
        this.images = [
          {
            color: 'COLOR BLANCO',
            nombre: 'DIESEL',
            featuredImage: 'shoesImages/diesel/diese_blanco1.webp',
            totalImages: [
              'shoesImages/diesel/diese_blanco1.webp',
              'shoesImages/diesel/diese_blanco2.webp',
              'shoesImages/diesel/diese_blanco3.webp',
              'shoesImages/diesel/diese_blanco4.webp',
            ],
          },
        ];
        break;
      case 'ARMANI EXCHANGE':
        this.images = [
          {
            color: 'COLOR NEGRO-ROJO',
            nombre: 'ARMANI EXCHANGE',
            featuredImage: 'shoesImages/armani/armani_rojo1.webp',
            totalImages: [
              'shoesImages/armani/armani_rojo1.webp',
              'shoesImages/armani/armani_rojo2.webp',
              'shoesImages/armani/armani_rojo3.webp',
              'shoesImages/armani/armani_rojo4.webp',
              'shoesImages/armani/armani_rojo5.webp',
              'shoesImages/armani/armani_rojo6.webp',
            ],
          },
          {
            color: 'COLOR NEGRO',
            nombre: 'ARMANI EXCHANGE',
            featuredImage: 'shoesImages/armani/armani_negro1.webp',
            totalImages: [
              'shoesImages/armani/armani_negro1.webp',
              'shoesImages/armani/armani_negro2.webp',
              'shoesImages/armani/armani_negro3.webp',
              'shoesImages/armani/armani_negro4.webp',
              'shoesImages/armani/armani_negro5.webp',
              'shoesImages/armani/armani_negro6.webp',
            ],
          },
          {
            color: 'COLOR BLANCO-AZUL',
            nombre: 'ARMANI EXCHANGE',
            featuredImage: 'shoesImages/armani/armani_azul1.webp',
            totalImages: [
              'shoesImages/armani/armani_azul1.webp',
              'shoesImages/armani/armani_azul2.webp',
              'shoesImages/armani/armani_azul3.webp',
              'shoesImages/armani/armani_azul4.webp',
            ],
          },
        ];
        break;
      case 'NIKE BOTA AF1':
        this.images = [
          {
            color: 'COLOR BLANCO',
            nombre: 'NIKE BOTA AF1',
            featuredImage: 'shoesImages/AF1/nike_simpon_blanco_1.webp',
            totalImages: [
              'shoesImages/AF1/nike_simpon_blanco_1.webp',
              'shoesImages/AF1/nike_simpon_blanco_2.webp',
              'shoesImages/AF1/nike_simpon_blanco_3.webp',
              'shoesImages/AF1/nike_simpon_blanco_4.webp',
              'shoesImages/AF1/nike_simpon_blanco_5.webp',
            ],
          },
        ];
        break;
      case 'ADIDAS SAMBA':
        this.images = [
          {
            color: 'COLOR NEGRO',
            nombre: 'ADIDAS SAMBA',
            featuredImage: 'shoesImages/Samba/samba negro 1.png',
            totalImages: [
              'shoesImages/Samba/samba negro 1.png',
              'shoesImages/Samba/samba_negro_2.png',
              'shoesImages/Samba/samba_negro_3.png',
              'shoesImages/Samba/samba_negro_4.png',
            ],
          },
          {
            color: 'COLOR BLANCO',
            nombre: 'ADIDAS SAMBA',
            featuredImage: 'shoesImages/Samba/samba_blanco_1.png',
            totalImages: [
              'shoesImages/Samba/samba_blanco_1.png',
              'shoesImages/Samba/samba_blanco_2.png',
              'shoesImages/Samba/samba_blanco_3.png',
              'shoesImages/Samba/samba_blanco_4.png',
            ],
          },
          {
            color: 'COLOR BEIGE',
            nombre: 'ADIDAS SAMBA',
            featuredImage: 'shoesImages/Samba/samba_beige_1.png',
            totalImages: [
              'shoesImages/Samba/samba_beige_1.png',
              'shoesImages/Samba/samba_beige_2.png',
              'shoesImages/Samba/samba_beige_3.png',
              'shoesImages/Samba/samba_beige_4.png',
            ],
          },
        ];
        break;
      case 'NEW BALANCE':
        this.images = [
          {
            color: 'COLOR BLANCO',
            nombre: 'NEW BALANCE',
            featuredImage: 'shoesImages/new/new_blanco_1.png',
            totalImages: [
              'shoesImages/new/new_blanco_1.png',
              'shoesImages/new/new_blanco_2.png',
              'shoesImages/new/new_blanco_3.png',
              'shoesImages/new/new blanco _4.png',
              'shoesImages/new/newazul6.webp',
            ],
          },
          {
            color: 'COLOR AZUL',
            nombre: 'NEW BALANCE',
            featuredImage: 'shoesImages/new/newazul1.webp',
            totalImages: [
              'shoesImages/new/newazul1.webp',
              'shoesImages/new/newazul2.webp',
              'shoesImages/new/newazul3.webp',
              'shoesImages/new/newazul4.webp',
              'shoesImages/new/newazul5.webp',
              'shoesImages/new/newazul6.webp',
            ],
          },
          {
            color: 'COLOR GRIS',
            nombre: 'NEW BALANCE',
            featuredImage: 'shoesImages/new/newgris1.webp',
            totalImages: [
              'shoesImages/new/newgris1.webp',
              'shoesImages/new/newgris2.webp',
              'shoesImages/new/newgris3.webp',
              'shoesImages/new/newgris4.webp',
              'shoesImages/new/newgris5.webp',
              'shoesImages/new/newgris6.webp',
            ],
          },
        ];
        break;
      case 'OFF-WHITE NIÑO':
        this.images = [
          {
            color: 'COLOR NEGRO',
            nombre: 'OFF-WHITE NIÑO',
            featuredImage: 'shoesImages/off-niño/offniñopanda1.webp',
            totalImages: [
              'shoesImages/off-niño/offniñopanda1.webp',
              'shoesImages/off-niño/offniñopanda3.webp',
              'shoesImages/off-niño/offniñopanda4.webp',
              'shoesImages/off-niño/offniñopanda5.webp',
            ],
          },
        ];
        break;
      case 'LOUIS VUITTON':
        this.images = [
          {
            color: 'COLOR BLANCO',
            nombre: 'LOUIS VUITTON',
            featuredImage: 'shoesImages/lv/lv blanco 1.png',
            totalImages: [
              'shoesImages/lv/lv blanco 1.png',
              'shoesImages/lv/lv_blanco_2.png',
              'shoesImages/lv/lv_blanco_3.png',
              'shoesImages/lv/lv_blanco_4-.png',
              'shoesImages/lv/lv_blanco_5.png',
              'shoesImages/lv/lv_blanco_6.png',
            ],
          },
          {
            color: 'COLOR NEGRO',
            nombre: 'LOUIS VUITTON',
            featuredImage: 'shoesImages/lv/lv negro 1.png',
            totalImages: [
              'shoesImages/lv/lv negro 1.png',
              'shoesImages/lv/lv_negro_2.png',
              'shoesImages/lv/lv_negro_3.png',
              'shoesImages/lv/lv_negro_4.png',
              'shoesImages/lv/lv_negro_5.png',
              'shoesImages/lv/lv_negro_6.png',
            ],
          },
        ];
        break;
      case 'CONVERSE ALL STARS':
        this.images = [
          {
            color: 'COLOR BLANCO',
            nombre: 'CONVERSE',
            featuredImage: 'shoesImages/converce/converse blanco 1.webp',
            totalImages: [
              'shoesImages/converce/converse blanco 1.webp',
              'shoesImages/converce/converse_blanco_2.webp',
              'shoesImages/converce/converse_blanco_3.webp',
              'shoesImages/converce/converse_blanco_5.webp',
            ],
          },
          {
            color: 'COLOR NEGRO',
            nombre: 'CONVERSE',
            featuredImage: 'shoesImages/converce/converse_negro_1.webp',
            totalImages: [
              'shoesImages/converce/converse_negro_1.webp',
              'shoesImages/converce/converse_negro_2.webp',
              'shoesImages/converce/converse_negro_3.webp',
              'shoesImages/converce/converse_blanco_5.webp',
            ],
          },
        ];
        break;
      case 'OFF WHITE':
        this.images = [
          {
            color: 'COLOR GRIS',
            nombre: 'OFF WHITE',
            featuredImage: 'shoesImages/off/off gris 1.png',
            totalImages: [
              'shoesImages/off/off gris 1.png',
              'shoesImages/off/off gris 2.png',
              'shoesImages/off/off gris 4.png',
              'shoesImages/off/off gris 5.png',
              'shoesImages/off/off gris 6.png',
            ],
          },
          {
            color: 'COLOR BLANCO',
            nombre: 'OFF WHITE',
            featuredImage: 'shoesImages/off/off blanco 1.png',
            totalImages: [
              'shoesImages/off/off blanco 1.png',
              'shoesImages/off/off_blanco_2.png',
              'shoesImages/off/off_blanco_3.png',
              'shoesImages/off/off_blanco_4.png',
              'shoesImages/off/off_blanco_5.png',
              'shoesImages/off/off_blanco_6.png',
            ],
          },
          {
            color: 'COLOR NEGRO',
            nombre: 'OFF WHITE',
            featuredImage: 'shoesImages/off/off_negro_1.png',
            totalImages: [
              'shoesImages/off/off_negro_1.png',
              'shoesImages/off/off_negro_2.png',
              'shoesImages/off/off_negro_3.png',
              'shoesImages/off/off_negro_4.png',
              'shoesImages/off/off_negro_5.png',
              'shoesImages/off/off_negro_6.png',
            ],
          },
          {
            color: 'COLOR GRIS OSCURO',
            nombre: 'OFF WHITE',
            featuredImage: 'shoesImages/off/off_gris_oscuro1.webp',
            totalImages: [
              'shoesImages/off/off_gris_oscuro1.webp',
              'shoesImages/off/off_gris_oscuro2.webp',
              'shoesImages/off/off_gris_oscuro3.webp',
              'shoesImages/off/off_gris_oscuro4.webp',
            ],
          },
        ];
        break;
    }
  }

  getImages(): ImageItem[] {
    return this.images;
  }

  updateFeaturedImage(item: ImageItem, img: string): void {
    item.featuredImage = img;
  }
}
