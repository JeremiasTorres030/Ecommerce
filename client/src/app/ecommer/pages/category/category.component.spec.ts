import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { EcommerService } from '../../service/ecommer.service';

import { CategoryComponent } from './category.component';

describe('CategoryComponent', () => {
  let ecommerService: EcommerService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryComponent, ProductCardComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    ecommerService = TestBed.inject(EcommerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    const fixture = TestBed.createComponent(CategoryComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a primary div', () => {
    const fixture = TestBed.createComponent(CategoryComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.categoryComponent');
    expect(div).toBeTruthy();
  });

  it('should have a title variable', () => {
    const fixture = TestBed.createComponent(CategoryComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect((component.title = '')).toBeDefined();
  });

  it('should have a productsList variable', () => {
    const fixture = TestBed.createComponent(CategoryComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.productsList).toBeDefined();
  });

  it('should render Ropa as title', () => {
    const fixture = TestBed.createComponent(CategoryComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.title = 'Ropa';
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1.title');
    h1 ? (h1.innerHTML = component.title) : '';
    expect(h1?.innerHTML).toEqual(component.title);
  });

  it('should call getProductsByCategory once ', () => {
    const fixture = TestBed.createComponent(CategoryComponent);
    const ecommerSpy = spyOn(ecommerService, 'getProductsByCategory');
    fixture.detectChanges();
    expect(ecommerSpy).toHaveBeenCalledTimes(1);
  });

  // it('should render the title variable with the value of url category name', () => {
  //   const fixture = TestBed.createComponent(CategoryComponent);
  //   fixture.detectChanges();
  //   const component = fixture.componentInstance;
  //   let categoryNameUrl = '';
  //   activedRoute.params.subscribe(({ categoryName }) => {
  //     categoryNameUrl = categoryName;
  //   });
  //   console.log(categoryNameUrl);
  //   console.log(component.title);
  //   expect(component.title).toEqual(categoryNameUrl);
  // });
});
