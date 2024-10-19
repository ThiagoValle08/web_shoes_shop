import { Component, AfterViewInit, HostListener } from '@angular/core';
import { ShoesService } from '../../services/shoes.service';

interface ImageItem {
  color: string;
  nombre: string;
  featuredImage: string;
  totalImages: string[];
}

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrl: './shoes.component.css',
})
export class ShoesComponent {
  images: ImageItem[]; // Declarar la propiedad
  featuredImage: string;
  activeImage: string;
  loader: boolean = true;

  constructor(private shoesService: ShoesService) {
    this.images = this.shoesService.getImages(); // Obtener imágenes del servicio
    this.featuredImage = this.images[0].featuredImage; // Inicializar featuredImage
    this.activeImage = this.images[0].totalImages[0]; // Inicializar activeImage
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.changeLoader();
  }

  setImage(item: any, img: string): void {
    item.featuredImage = img;
  }

  setActiveImage(image: string): void {
    this.activeImage = image;
  }

  scrollSlider(direction: number): void {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft += direction * 180;
    }
  }

  changeLoader() {
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  }
}
