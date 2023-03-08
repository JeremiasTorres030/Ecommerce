import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { EcommerService } from '../../service/ecommer.service';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let service: EcommerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    service = TestBed.inject(EcommerService);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(UserComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a primary div', () => {
    const fixture = TestBed.createComponent(UserComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.userComponent');
    expect(div).toBeTruthy();
  });

  it('should have a userProducts variable', () => {
    const fixture = TestBed.createComponent(UserComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.userProducts).toBeDefined();
  });

  it('should have a nextPage variable', () => {
    const fixture = TestBed.createComponent(UserComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.nextPage).toBeDefined();
  });

  it('should have a previousPage variable', () => {
    const fixture = TestBed.createComponent(UserComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.previousPage).toBeDefined();
  });

  it('should have a userData variable', () => {
    const fixture = TestBed.createComponent(UserComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.userData).toBeDefined();
  });

  it('should have a getProducts function', () => {
    const fixture = TestBed.createComponent(UserComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.getProducts).toBeDefined();
  });

  it('should have a nextPageButton function', () => {
    const fixture = TestBed.createComponent(UserComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.nextPageButton).toBeDefined();
  });

  it('should have a previousPageButton function', () => {
    const fixture = TestBed.createComponent(UserComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.previousPageButton).toBeDefined();
  });

  it('should call getProductsByUser once', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const spy = spyOn(service, 'getProductsByUser');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call getUser once', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const spy = spyOn(service, 'getUser');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should render the user image', () => {
    const fixture = TestBed.createComponent(UserComponent);
    fixture.componentInstance.userData = {
      email: 'test',
      first_name: 'test',
      id: 0,
      image: 'test',
      last_name: 'test',
      username: 'test',
    };
    fixture.detectChanges();
    const compiled = fixture.debugElement;
    const image = compiled.query(By.css('.userImage'));
    const src = image.attributes['src'];
    expect(image).toBeTruthy();
    expect(src).toEqual('test');
  });

  it('should render the user complete name', () => {
    const fixture = TestBed.createComponent(UserComponent);
    fixture.componentInstance.userData = {
      email: 'test',
      first_name: 'test',
      id: 0,
      image: 'test',
      last_name: 'test',
      username: 'test',
    };
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1.userName');
    const username = h1?.innerHTML;
    expect(h1).toBeTruthy();
    expect(username).toEqual(' test test ');
  });

  it('should render the user email', () => {
    const fixture = TestBed.createComponent(UserComponent);
    fixture.componentInstance.userData = {
      email: 'test@test.com',
      first_name: 'test',
      id: 0,
      image: 'test',
      last_name: 'test',
      username: 'test',
    };
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1.userEmail');
    const email = h1?.innerHTML;
    expect(h1).toBeTruthy();
    expect(email).toEqual('test@test.com');
  });
});
