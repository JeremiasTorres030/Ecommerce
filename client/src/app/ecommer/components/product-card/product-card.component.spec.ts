import { TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  const productTest = {
    category: 'Ropa',
    id: 0,
    image: 'imagen.png',
    name: 'Pantalon gris largo',
    price: ' $150 ',
    seller: '1',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductCardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a product variable', () => {
    const fixture = TestBed.createComponent(ProductCardComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.product).toBeDefined();
  });

  it('should have a userButtons variable', () => {
    const fixture = TestBed.createComponent(ProductCardComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.userButtons).toBeDefined();
  });

  it('should have a userButtonClicked variable', () => {
    const fixture = TestBed.createComponent(ProductCardComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.userButtonClicked).toBeDefined();
  });

  it('should have a editButton function', () => {
    const fixture = TestBed.createComponent(ProductCardComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.editButton).toBeDefined();
  });

  it('should have a deleteButton function', () => {
    const fixture = TestBed.createComponent(ProductCardComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.deleteButton).toBeDefined();
  });

  it('should render the name of the product', () => {
    const fixture = TestBed.createComponent(ProductCardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const productName = compiled.querySelector('h2.productName')?.innerHTML;
    expect(productName).toEqual(productTest.name);
  });

  it('should render the image of the product ', () => {
    const fixture = TestBed.createComponent(ProductCardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const productImg = compiled.querySelector('img')?.getAttribute('src');
    expect(productImg).toEqual(productTest.image);
  });

  it('should render the price of the product ', () => {
    const fixture = TestBed.createComponent(ProductCardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const productPrice = compiled.querySelector('h1.productPrice')?.innerHTML;
    expect(productPrice).toEqual(productTest.price);
  });

  it('should render editButton if userButtons is true', () => {
    const fixture = TestBed.createComponent(ProductCardComponent);
    const component = fixture.componentInstance;
    component.userButtons = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const editButton = compiled.querySelector('button.editButton')?.innerHTML;
    expect(editButton).toBeTruthy();
  });
  it('should render deleteButton if userButtons is true', () => {
    const fixture = TestBed.createComponent(ProductCardComponent);
    const component = fixture.componentInstance;
    component.userButtons = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const deleteButton = compiled.querySelector(
      'button.deleteButton'
    )?.innerHTML;
    expect(deleteButton).toBeTruthy();
  });
});
