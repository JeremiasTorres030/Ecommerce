import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from 'src/app/ecommer/pages/login/login.component';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent, LoginComponent],
      imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const navbarComponent = fixture.componentInstance;
    expect(navbarComponent).toBeTruthy();
  });

  it('should have a primary div', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const primaryDiv = compiled.querySelector('div.navbarComponent');
    expect(primaryDiv).toBeTruthy();
  });

  it('should render an image element with the page icon', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const image = compiled.querySelector('img.icon');
    const src = image?.getAttribute('src');
    expect(image).toBeTruthy();
    expect(src).toEqual('../../../../assets/images/Amazon_icon.png');
  });

  it('should have a form element', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('should have and render a input element', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input[type="text"]');
    expect(input).toBeTruthy();
  });

  it('should have and render a submit button', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector('button[type="submit"]');
    expect(submitButton).toBeTruthy();
  });

  it('should have and render a cart button', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const cartButton = compiled.querySelector('a.cartButton');
    expect(cartButton).toBeTruthy();
  });

  it('should have and render a user button', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const userButton = compiled.querySelector('a.userButton');
    expect(userButton).toBeTruthy();
  });

  it('should have and render a logOut button if user is logged', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;
    component.token = 'test';
    component.activateUseMenu = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const logOutButton = compiled.querySelector('button.logOut');
    expect(logOutButton).toBeTruthy();
  });

  it('should have a reactiveForm variable', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const navbar = fixture.componentInstance;
    expect(navbar.searchForm).toBeDefined();
  });

  it('should have a token variable', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const navbar = fixture.componentInstance;
    expect(navbar.token).toBeDefined();
  });

  it('should be have a submitForm function', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const navbar = fixture.componentInstance;
    expect(navbar.submitForm).toBeDefined();
  });

  it('should be have a logOut function', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const navbar = fixture.componentInstance;
    expect(navbar.logOut).toBeDefined();
  });

  it('should be have a profile function', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const navbar = fixture.componentInstance;
    expect(navbar.profile).toBeDefined();
  });

  it('should call submitForm when the form is submitted', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const navbar = fixture.componentInstance;
    spyOn(navbar, 'submitForm');
    const compiled = fixture.debugElement;
    compiled.query(By.css('form')).triggerEventHandler('ngSubmit');
    expect(navbar.submitForm).toHaveBeenCalled();
  });

  it('the cart button should navigate to /cart', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement;
    const url = compiled.query(By.css('.cartButton')).attributes['routerLink'];
    expect(url).toEqual('/cart');
  });

  it('the user button should navigate to /user/login', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;
    component.token = '';
    fixture.detectChanges();
    const compiled = fixture.debugElement;
    const url = compiled.query(By.css('.userButton')).attributes['routerLink'];
    expect(url).toEqual('/user/login');
  });

  it('the logout button should clean token', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;
    component.token = 'test';
    component.activateUseMenu = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement;
    compiled.query(By.css('.logOut')).triggerEventHandler('click');
    expect(component.token).toBe('');
  });
});
