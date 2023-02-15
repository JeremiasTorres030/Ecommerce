import { Component } from '@angular/core';
import { Category } from '../../types/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  categoriesList: Array<Category> = [
    {
      categoryName: 'Ropa',
      categoryImg: '../../../assets/icons/clothes-svgrepo-com.svg',
    },
    {
      categoryName: 'Celulares',
      categoryImg: '../../../assets/icons/technology-svgrepo-com.svg',
    },
    {
      categoryName: 'Computacion',
      categoryImg: '../../../assets/icons/computer-svgrepo-com.svg',
    },
    {
      categoryName: 'Deportes',
      categoryImg:
        '../../../assets/icons/sport-recreation-football-activity-ball-svgrepo-com.svg',
    },
    {
      categoryName: 'Electrodomesticos',
      categoryImg: '../../../assets/icons/laundry-svgrepo-com.svg',
    },
    {
      categoryName: 'Instrumentos',
      categoryImg: '../../../assets/icons/guitar-svgrepo-com.svg',
    },
  ];

  constructor() {}
}
