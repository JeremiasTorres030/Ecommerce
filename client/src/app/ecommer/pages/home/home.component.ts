import { Component, OnInit } from '@angular/core';
import { EcommerService } from '../../service/ecommer.service';
import { Category, Product } from '../../types/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public categoriesList: Array<Category> = [
    {
      categoryName: 'Ropa',
      categoryImg: '../../../assets/icons/clothes-svgrepo-com.svg',
    },
    {
      categoryName: 'Muebles',
      categoryImg: '../../../assets/icons/bed-queen-svgrepo-com.svg',
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
  public lastVisited: Array<Product> = [];
  constructor(private ecommerService: EcommerService) {}
  ngOnInit(): void {
    this.getLastFromLocal();
  }

  getLastFromLocal(): void {
    let lastVisitedJson = localStorage.getItem('lastVisited');
    if (lastVisitedJson) {
      let lastVisitedList: Array<Product> = JSON.parse(lastVisitedJson);
      lastVisitedList.forEach(({ id }) => {
        this.ecommerService.getProduct(id).subscribe({
          error: () => {
            this.lastVisited = lastVisitedList.filter(
              (product) => product.id !== id
            );
            localStorage.setItem(
              'lastVisited',
              JSON.stringify(this.lastVisited)
            );
          },
        });
      });
      this.lastVisited = lastVisitedList;
    }
  }
}
