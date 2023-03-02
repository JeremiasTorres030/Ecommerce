import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from 'src/app/ecommer/pages/login/login.component';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
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
    const div = compiled.querySelector('div.navbarComponent');
    expect(div).toBeTruthy();
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

  it('should render a input element', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input[type="text"]');
    expect(input).toBeTruthy();
  });

  it('should render a submit button', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector('button[type="submit"]');
    expect(submitButton).toBeTruthy();
  });

  it('should render a cart button', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const cartButton = compiled.querySelector('a.cartButton');
    expect(cartButton).toBeTruthy();
  });

  it('should render a login button', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const userButton = compiled.querySelector('a.loginButton');
    expect(userButton).toBeTruthy();
  });

  it('should render a logOut button if user is logged', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;
    component.activateUseMenu = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const logOutButton = compiled.querySelector('button.logOutButton');
    expect(logOutButton).toBeTruthy();
  });

  it('should render a profile button if user is logged', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;
    component.activateUseMenu = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const profileButton = compiled.querySelector('button.profileButton');
    expect(profileButton).toBeTruthy();
  });

  it('should render a my products button if user is logged', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;
    component.activateUseMenu = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const myProductsButton = compiled.querySelector('button.myProductsButton');
    expect(myProductsButton).toBeTruthy();
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

  it('should have a username variable', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const navbar = fixture.componentInstance;
    expect(navbar.username).toBeDefined();
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

  it('should be have a myProducts function', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const navbar = fixture.componentInstance;
    expect(navbar.myProducts).toBeDefined();
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

  it('the user button should navigate to /login', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;
    component.token = '';
    fixture.detectChanges();
    const compiled = fixture.debugElement;
    const url = compiled.query(By.css('.loginButton')).attributes['routerLink'];
    expect(url).toEqual('/login');
  });

  it('the logout button should clean token', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;
    component.activateUseMenu = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement;
    compiled.query(By.css('.logOutButton')).triggerEventHandler('click');
    expect(component.token).toBe('');
  });
});
