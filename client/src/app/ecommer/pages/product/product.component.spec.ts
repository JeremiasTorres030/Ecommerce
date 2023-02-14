import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
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
    price: '150',
    seller: '1',
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
    fixture.componentInstance.cargando = false;
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

  it('should render the name of the product', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.componentInstance.cargando = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const productName = compiled.querySelector('h1.productName')?.innerHTML;
    expect(productName).toEqual(productTest.name);
  });

  it('should render the image of the product ', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.componentInstance.cargando = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const productImg = compiled.querySelector('img')?.getAttribute('src');
    expect(productImg).toEqual(productTest.image);
  });

  it('should render the price of the product', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.componentInstance.cargando = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const productPrice = compiled.querySelector('p.productPrice')?.innerHTML;
    expect(productPrice).toEqual(productTest.price);
  });

  it('should render the seller of the product', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.componentInstance.cargando = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const productSeller = compiled.querySelector('p.productSeller')?.innerHTML;
    expect(productSeller).toEqual(productTest.seller);
  });

  it('should render the add to cart button', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.componentInstance.cargando = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const addToCart = compiled.querySelector('button.addToCart');
    expect(addToCart).toBeTruthy();
  });

  it('should render the buy now button', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.componentInstance.cargando = false;
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
});
