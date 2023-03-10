import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { CartComponent } from '../cart/cart.component';

import { BuyComponent } from './buy.component';

describe('BuyComponent', () => {
  let snackBar: MatSnackBar;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyComponent, CartComponent],
      imports: [ReactiveFormsModule, MatSnackBarModule],
    }).compileComponents();
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BuyComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a primary div', () => {
    const fixture = TestBed.createComponent(BuyComponent);
    fixture.detectChanges();
    fixture.componentInstance.token = 'tokenTest';
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.buyComponent');
    expect(div).toBeTruthy();
  });

  it('should have a lastKey variable', () => {
    const fixture = TestBed.createComponent(BuyComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.lastKey).toBeDefined();
  });

  it('should have a token variable', () => {
    const fixture = TestBed.createComponent(BuyComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.token).toBeDefined();
  });

  it('should have a buyForm variable', () => {
    const fixture = TestBed.createComponent(BuyComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.buyForm).toBeDefined();
  });

  it('should have a submitForm function', () => {
    const fixture = TestBed.createComponent(BuyComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.submitForm).toBeDefined();
  });

  it('should have a onKeyDown function', () => {
    const fixture = TestBed.createComponent(BuyComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.onkeyDown).toBeDefined();
  });

  it('should have a form element', () => {
    const fixture = TestBed.createComponent(BuyComponent);
    fixture.detectChanges();
    fixture.componentInstance.token = 'tokenTest';
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('should render the number card input', () => {
    const fixture = TestBed.createComponent(BuyComponent);
    fixture.detectChanges();
    fixture.componentInstance.token = 'tokenTest';
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input.number');
    expect(input).toBeTruthy();
  });
  it('should render the expiration month input', () => {
    const fixture = TestBed.createComponent(BuyComponent);
    fixture.detectChanges();
    fixture.componentInstance.token = 'tokenTest';
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input.expirationM');
    expect(input).toBeTruthy();
  });
  it('should render the expiration year input', () => {
    const fixture = TestBed.createComponent(BuyComponent);
    fixture.detectChanges();
    fixture.componentInstance.token = 'tokenTest';
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input.expirationY');
    expect(input).toBeTruthy();
  });
  it('should render the secure number card input', () => {
    const fixture = TestBed.createComponent(BuyComponent);
    fixture.detectChanges();
    fixture.componentInstance.token = 'tokenTest';
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input.secure');
    expect(input).toBeTruthy();
  });
  it('should render the name card input', () => {
    const fixture = TestBed.createComponent(BuyComponent);
    fixture.detectChanges();
    fixture.componentInstance.token = 'tokenTest';
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input.name');
    expect(input).toBeTruthy();
  });

  it('should render the submit button ', () => {
    const fixture = TestBed.createComponent(BuyComponent);
    fixture.detectChanges();
    fixture.componentInstance.token = 'tokenTest';
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button[type="submit"]');
    expect(button).toBeTruthy();
  });

  it('should call formSubmit when the form is submitted', () => {
    const fixture = TestBed.createComponent(BuyComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.token = 'tokenTest';
    const spy = spyOn(component, 'submitForm');
    const compiled = fixture.debugElement;
    compiled.query(By.css('form')).triggerEventHandler('ngSubmit');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
