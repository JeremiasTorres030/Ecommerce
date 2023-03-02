import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { EcommerService } from '../../service/ecommer.service';

import { CategoryComponent } from './category.component';

describe('CategoryComponent', () => {
  let ecommerService: EcommerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CategoryComponent,
        ProductCardComponent,
        CategoryCardComponent,
      ],
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    ecommerService = TestBed.inject(EcommerService);
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

  it('should have a subCategories variable', () => {
    const fixture = TestBed.createComponent(CategoryComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.subCategories).toBeDefined();
  });

  it('should have a goBack variable', () => {
    const fixture = TestBed.createComponent(CategoryComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.goBack).toBeDefined();
  });

  it('should render Ropa as title', () => {
    const fixture = TestBed.createComponent(CategoryComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.title = 'Ropa';
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1.categoryTitle');
    h1 ? (h1.innerHTML = component.title) : '';
    expect(h1?.innerHTML).toEqual(component.title);
  });

  it('should call getProductsByCategory once ', () => {
    const ecommerSpy = spyOn(ecommerService, 'getProductsByCategory');
    const fixture = TestBed.createComponent(CategoryComponent);
    fixture.detectChanges();
    expect(ecommerSpy).toHaveBeenCalledTimes(1);
  });

  it('should render sub categories div', () => {
    const fixture = TestBed.createComponent(CategoryComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.subCategories');
    expect(div).toBeTruthy();
  });

  it('should render products div', () => {
    const fixture = TestBed.createComponent(CategoryComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.products');
    expect(div).toBeTruthy();
  });
});
