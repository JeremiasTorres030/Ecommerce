import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { EcommerService } from '../../service/ecommer.service';
import { ProductCardComponent } from '../product-card/product-card.component';

import { ProductCarouselComponent } from './product-carousel.component';

describe('ProductCarouselComponent', () => {
  let service: EcommerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCarouselComponent, ProductCardComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
    service = TestBed.inject(EcommerService);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductCarouselComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a primary div', () => {
    const fixture = TestBed.createComponent(ProductCarouselComponent);
    fixture.componentInstance.moreProducts.push({
      category: 'test',
      id: 0,
      image: 'test',
      name: 'test',
      price: 0,
      seller: 'test',
      sub_category: 'test',
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.carouselComponent');
    expect(div).toBeTruthy();
  });

  it('should have a caregoryName variable', () => {
    const fixture = TestBed.createComponent(ProductCarouselComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.categoryName).toBeDefined();
  });

  it('should render the category name "Mas ropa"', () => {
    const fixture = TestBed.createComponent(ProductCarouselComponent);
    const component = fixture.componentInstance;
    component.moreProducts.push({
      category: 'test',
      id: 0,
      image: 'test',
      name: 'test',
      price: 0,
      seller: 'test',
      sub_category: 'test',
    });
    component.categoryName = 'Ropa';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1.categoryTitle');
    expect(h1?.innerHTML).toEqual(' Mas ropa ');
  });

  it('should have a productId variable', () => {
    const fixture = TestBed.createComponent(ProductCarouselComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.productId).toBeDefined();
  });

  it('should have a subCategoryName variable', () => {
    const fixture = TestBed.createComponent(ProductCarouselComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.subCategoryName).toBeDefined();
  });

  it('should have a subCategory variable', () => {
    const fixture = TestBed.createComponent(ProductCarouselComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.subCategory).toBeDefined();
  });

  it('should have a moreProducts variable', () => {
    const fixture = TestBed.createComponent(ProductCarouselComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.moreProducts).toBeDefined();
  });

  it('should call getProductsByCategory once', () => {
    const fixture = TestBed.createComponent(ProductCarouselComponent);
    const spy = spyOn(service, 'getProductsByCategory').and.returnValue(of());
    const component = fixture.componentInstance;
    component.categoryName = 'Ropa';
    component.productId = 1;
    fixture.detectChanges();
    component.ngOnChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should call getProductsBySubCategory once', () => {
    const fixture = TestBed.createComponent(ProductCarouselComponent);
    const spy = spyOn(service, 'getProductsBySubCategory').and.returnValue(
      of()
    );
    const component = fixture.componentInstance;
    component.categoryName = 'Ropa';
    component.productId = 1;
    component.subCategory = true;
    fixture.detectChanges();
    component.ngOnChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
