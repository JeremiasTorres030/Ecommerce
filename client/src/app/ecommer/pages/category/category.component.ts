import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { EcommerService } from '../../service/ecommer.service';
import { Category, Product } from '../../types/types';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  public title: string = '';
  public productsList: Array<Product> = [];
  public subCategories: Array<Category> = [];
  public goBack: Category = {
    categoryName: 'Volver',
    categoryImg: '../../../assets/icons/left-arrow-svgrepo-com.svg',
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private EcommerService: EcommerService
  ) {}

  ngOnInit(): void {
    this.activeRoute.data.subscribe((value) => {
      if (value['subCategory']) {
        this.activeRoute.params
          .pipe(
            tap(({ categoryName }) => {
              this.EcommerService.getProductsBySubCategory(
                categoryName
              ).subscribe({
                next: (res) => {
                  this.productsList = res.data;
                },
              });
            })
          )
          .subscribe(({ categoryName }) => {
            this.title = categoryName;
          });
        return;
      }
      this.activeRoute.params
        .pipe(
          tap(({ categoryName }) => {
            this.EcommerService.getProductsByCategory(categoryName).subscribe({
              next: (res) => {
                this.productsList = res.data;
              },
            });
          })
        )
        .subscribe(({ categoryName }) => {
          this.title = categoryName;
          this.subCategoryLists(categoryName);
        });
    });
  }

  subCategoryLists(categoryName: string): void {
    const subCategoryValues: any = {
      Muebles: [
        {
          categoryName: 'Escritorios',
          categoryImg: '../../../assets/icons/desk.svg',
        },
        {
          categoryName: 'Mesas',
          categoryImg: '../../../assets/icons/table-svgrepo-com.svg',
        },
        {
          categoryName: 'Sillas',
          categoryImg: '../../../assets/icons/chair-2-svgrepo-com.svg',
        },
        {
          categoryName: 'Camas',
          categoryImg: '../../../assets/icons/bed-queen-svgrepo-com.svg',
        },
        {
          categoryName: 'Estanterias',
          categoryImg: '../../../assets/icons/shelf-svgrepo-com.svg',
        },
      ],
      Computacion: [
        {
          categoryName: 'Mouse',
          categoryImg: '../../../assets/icons/mouse-svgrepo-com.svg',
        },
        {
          categoryName: 'Teclados y Pianos',
          categoryImg:
            '../../../assets/icons/keyboard-shortcuts-svgrepo-com.svg',
        },
        {
          categoryName: 'Monitores',
          categoryImg: '../../../assets/icons/computer-svgrepo-com.svg',
        },
        {
          categoryName: 'Auriculares',
          categoryImg: '../../../assets/icons/headphones-svgrepo-com.svg',
        },
        {
          categoryName: 'Computadoras',
          categoryImg:
            '../../../assets/icons/computer-and-monitor-svgrepo-com.svg',
        },
      ],
      Deportes: [
        {
          categoryName: 'Pelotas',
          categoryImg:
            '../../../assets/icons/sport-recreation-football-activity-ball-svgrepo-com.svg',
        },
        {
          categoryName: 'Pesos',
          categoryImg: '../../../assets/icons/weight-gym-svgrepo-com.svg',
        },
        {
          categoryName: 'Maquinas',
          categoryImg: '../../../assets/icons/gym-workout-svgrepo-com.svg',
        },
        {
          categoryName: 'Bancos',
          categoryImg: '../../../assets/icons/bench-press-5-svgrepo-com.svg',
        },
        {
          categoryName: 'Suplementos',
          categoryImg: '../../../assets/icons/proteins-bottle-svgrepo-com.svg',
        },
      ],
      Electrodomesticos: [
        {
          categoryName: 'Microondas',
          categoryImg: '../../../assets/icons/microwave-svgrepo-com.svg',
        },
        {
          categoryName: 'Lavarropas',
          categoryImg: '../../../assets/icons/laundry-svgrepo-com.svg',
        },
        {
          categoryName: 'Lavavajillas',
          categoryImg: '../../../assets/icons/dishwasher-2-svgrepo-com.svg',
        },
        {
          categoryName: 'Heladeras',
          categoryImg: '../../../assets/icons/fridge-2-svgrepo-com.svg',
        },
        {
          categoryName: 'Cafeteras',
          categoryImg: '../../../assets/icons/coffee-machine-svgrepo-com.svg',
        },
      ],
      Instrumentos: [
        {
          categoryName: 'Guitarras',
          categoryImg: '../../../assets/icons/guitar-svgrepo-com.svg',
        },
        {
          categoryName: 'Bajos',
          categoryImg: '../../../assets/icons/electric-guitar-svgrepo-com.svg',
        },
        {
          categoryName: 'Baterias',
          categoryImg: '../../../assets/icons/drum-set-drum-svgrepo-com.svg',
        },
        {
          categoryName: 'Microfonos',
          categoryImg: '../../../assets/icons/microphone-2-svgrepo-com.svg',
        },
        {
          categoryName: 'Teclados y Pianos',
          categoryImg: '../../../assets/icons/piano-svgrepo-com.svg',
        },
      ],
      Ropa: [
        {
          categoryName: 'Zapatillas',
          categoryImg: '../../../assets/icons/shoes-4-svgrepo-com.svg',
        },
        {
          categoryName: 'Remeras',
          categoryImg: '../../../assets/icons/clothes-svgrepo-com.svg',
        },
        {
          categoryName: 'Gorros',
          categoryImg: '../../../assets/icons/hat-svgrepo-com.svg',
        },
        {
          categoryName: 'Pantalones',
          categoryImg: '../../../assets/icons/jean-svgrepo-com.svg',
        },
        {
          categoryName: 'Abrigos',
          categoryImg: '../../../assets/icons/coat-jacket-svgrepo-com.svg',
        },
      ],
    };
    if (categoryName) {
      this.subCategories = subCategoryValues[categoryName];
    }
  }
}
