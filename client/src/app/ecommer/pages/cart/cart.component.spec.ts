import { TestBed } from '@angular/core/testing';
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

  it('should call getItem of localstorage once', () => {
    const spy = spyOn(localStorage, 'getItem');
    const fixture = TestBed.createComponent(CartComponent);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
