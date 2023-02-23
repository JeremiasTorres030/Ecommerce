import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EcommerService } from '../../service/ecommer.service';
import { ProductCardComponent } from '../product-card/product-card.component';

import { ProductCarouselComponent } from './product-carousel.component';

describe('ProductCarouselComponent', () => {
  let service: EcommerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCarouselComponent, ProductCardComponent],
      imports: [HttpClientTestingModule],
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
      category: '',
      id: 0,
      image: '',
      name: '',
      price: 0,
      seller: '',
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

  it('should have a productId variable', () => {
    const fixture = TestBed.createComponent(ProductCarouselComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.productId).toBeDefined();
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
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
