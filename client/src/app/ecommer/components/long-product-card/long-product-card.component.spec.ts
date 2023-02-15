import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LongProductCardComponent } from './long-product-card.component';

describe('LongProductCardComponent', () => {
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
      declarations: [LongProductCardComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LongProductCardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a primary div', () => {
    const fixture = TestBed.createComponent(LongProductCardComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.longProductCard');
    expect(div).toBeTruthy();
  });

  it('should have a product variable', () => {
    const fixture = TestBed.createComponent(LongProductCardComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.product).toBeDefined();
  });

  it('should render the name of the product', () => {
    const fixture = TestBed.createComponent(LongProductCardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const productName = compiled.querySelector('h1.productName')?.innerHTML;
    expect(productName).toEqual(productTest.name);
  });

  it('should render the image of the product ', () => {
    const fixture = TestBed.createComponent(LongProductCardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const productImg = compiled.querySelector('img')?.getAttribute('src');
    expect(productImg).toEqual(productTest.image);
  });

  it('should render the price of the product', () => {
    const fixture = TestBed.createComponent(LongProductCardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const productPrice = compiled.querySelector('p.productPrice')?.innerHTML;
    expect(productPrice).toEqual(productTest.price);
  });

  it('should render the seller of the product', () => {
    const fixture = TestBed.createComponent(LongProductCardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const productSeller = compiled.querySelector('p.productSeller')?.innerHTML;
    expect(productSeller).toEqual(productTest.seller);
  });

  it('should render remove from cart button', () => {
    const fixture = TestBed.createComponent(LongProductCardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const removeButton = compiled.querySelector('button.removeProduct');
    expect(removeButton).toBeTruthy();
  });

  it('should have a updateCartList eventEmitter', () => {
    const fixture = TestBed.createComponent(LongProductCardComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.updateCartList).toBeDefined();
  });

  it('should have a removeProduct function', () => {
    const fixture = TestBed.createComponent(LongProductCardComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.removeProduct).toBeDefined();
  });

  it('should call removeProduct once when the remove product from cart button is clicked', () => {
    const fixture = TestBed.createComponent(LongProductCardComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const spyRemoveFunction = spyOn(component, 'removeProduct');

    const debug = fixture.debugElement;
    debug.query(By.css('.removeProduct')).triggerEventHandler('click');

    expect(spyRemoveFunction).toHaveBeenCalledTimes(1);
  });
});
