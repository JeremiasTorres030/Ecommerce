import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CartComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a primary div', () => {
    const fixture = TestBed.createComponent(CartComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.cartComponent');
    expect(div).toBeTruthy();
  });

  it('should have a listOfProducts variable', () => {
    const fixture = TestBed.createComponent(CartComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.listOfProducts).toBeDefined();
  });

  it('should have a totalPrice variable', () => {
    const fixture = TestBed.createComponent(CartComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.totalPrice).toBeDefined();
  });

  it('should have a getListFromLocal function', () => {
    const fixture = TestBed.createComponent(CartComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.getListFromLocal).toBeDefined();
  });

  it('should have a removeAll function', () => {
    const fixture = TestBed.createComponent(CartComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.removeAll).toBeDefined();
  });

  it('should have a calculatePrice function', () => {
    const fixture = TestBed.createComponent(CartComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.calculatePrice).toBeDefined();
  });

  it('should call getItem of localstorage once', () => {
    const spy = spyOn(localStorage, 'getItem');
    const fixture = TestBed.createComponent(CartComponent);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call removeAll once when the remove all from cart button is clicked', () => {
    const fixture = TestBed.createComponent(CartComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const spyRemoveFunction = spyOn(component, 'removeAll');
    const debug = fixture.debugElement;
    debug.query(By.css('.removeAll')).triggerEventHandler('click');
    expect(spyRemoveFunction).toHaveBeenCalledTimes(1);
  });

  it('should render the buy button', () => {
    const fixture = TestBed.createComponent(CartComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button.buy');
    expect(button).toBeTruthy();
  });

  it('should render the remove all button', () => {
    const fixture = TestBed.createComponent(CartComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button.removeAll');
    expect(button).toBeTruthy();
  });

  it('should render the total price', () => {
    const fixture = TestBed.createComponent(CartComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const price = compiled.querySelector('h1.totalPrice');
    expect(price).toBeTruthy();
  });
});
