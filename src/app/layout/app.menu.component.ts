import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  styles: '',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(
    public layoutService: LayoutService,
    private authservice: AuthService
  ) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Inicio',
        items: [
          {
            label: 'Principal',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/adminHome'],
          },
        ],
      },
      {
        label: 'Apartados',
        items: [
          {
            label: 'Bodega',
            icon: 'pi pi-fw pi-shop',
            routerLink: ['bodega'],
          },
          {
            label: 'Ventas',
            icon: 'pi pi-fw pi-dollar',
            routerLink: ['ventas'],
          },
          {
            label: 'Estadistícas',
            icon: 'pi pi-fw pi-chart-bar',
            routerLink: ['totalVentas'],
          },
          {
            label: 'Proveedores',
            icon: 'pi pi-fw pi-cart-arrow-down',
            routerLink: ['proveedores'],
          },
          {
            label: 'Clientes',
            icon: 'pi pi-fw pi-users',
            routerLink: ['clientes'],
          },
        ],
      },
      {},
      {
        label: '',
        items: [
          {
            label: 'Cerrar sesión',
            icon: 'pi pi-fw pi-power-off',
            command: () => this.logout(),
          },
        ],
      },
    ];
  }

  logout() {
    this.authservice.logout();
  }
}
