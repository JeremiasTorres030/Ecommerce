import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { EcommerService } from '../../service/ecommer.service';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let ecommerService: EcommerService;
  const productTest = {
    category: 'Ropa',
    id: 0,
    image: 'imagen.png',
    name: 'Pantalon gris largo',
    price: '$150',
    seller: '  ',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
    ecommerService = TestBed.inject(EcommerService);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a primary div', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.productComponent');
    expect(div).toBeTruthy();
  });

  it('should have a product variable', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.product).toBeDefined();
  });

  it('should have a loading variable', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.loading).toBeDefined();
  });

  it('should have a inCart variable', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.inCart).toBeDefined();
  });

  it('should render the name of the product', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const productName = compiled.querySelector('h1.productName')?.innerHTML;
    expect(productName).toEqual(productTest.name);
  });

  it('should render the image of the product ', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const productImg = compiled.querySelector('img')?.getAttribute('src');
    expect(productImg).toEqual(productTest.image);
  });

  it('should render the price of the product', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const productPrice = compiled.querySelector('p.productPrice')?.innerHTML;
    expect(productPrice).toEqual(productTest.price);
  });

  it('should render the seller of the product', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const productSeller = compiled.querySelector('p.productSeller')?.innerHTML;
    expect(productSeller).toEqual(productTest.seller);
  });

  it('should render the add to cart button', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const addToCart = compiled.querySelector('button.addToCart');
    expect(addToCart).toBeTruthy();
  });

  it('should render the remove from cart button', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.componentInstance.loading = false;
    fixture.componentInstance.inCart = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const removeFromCart = compiled.querySelector('button.removeFromCart');
    expect(removeFromCart).toBeTruthy();
  });

  it('should render the buy now button', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const buyNow = compiled.querySelector('button.buyNow');
    expect(buyNow).toBeTruthy();
  });

  it('should call getProduct once', () => {
    const spyService = spyOn(ecommerService, 'getProduct');
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.detectChanges();
    expect(spyService).toHaveBeenCalledTimes(1);
  });

  it('should have a addToCart function', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.addToCart).toBeDefined();
  });

  it('should have a removeFromCart function', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.removeFromCart).toBeDefined();
  });

  it('should have a inCartCheck function', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.inCartCheck).toBeDefined();
  });

  it('should call the addToCart function when the button add to cart is clicked', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    const component = fixture.componentInstance;
    component.loading = false;
    fixture.detectChanges();
    const spy = spyOn(component, 'addToCart');
    fixture.debugElement
      .query(By.css('.addToCart'))
      .triggerEventHandler('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call the removeFromCart function when the button remove from cart is clicked', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    const component = fixture.componentInstance;
    component.loading = false;
    component.inCart = true;
    fixture.detectChanges();
    const spy = spyOn(component, 'removeFromCart');
    fixture.debugElement
      .query(By.css('.removeFromCart'))
      .triggerEventHandler('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
