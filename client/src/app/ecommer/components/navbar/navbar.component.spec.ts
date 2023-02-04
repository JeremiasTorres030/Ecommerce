import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [ReactiveFormsModule, CommonModule],
    }).compileComponents();
  });

  it('should render the NavbarComponent', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const navbarComponent = fixture.componentInstance;
    expect(navbarComponent).toBeTruthy();
  });

  it('should have a primary div with the class navbarComponent', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const primaryDiv = compiled.querySelector('div');
    const classDiv = primaryDiv?.classList.contains('navbarComponent');
    expect(primaryDiv).toBeTruthy();
    expect(classDiv).toBeTruthy();
  });

  it('should render an image element with the page icon', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const image = compiled.querySelector('.icon');
    const src = image?.getAttribute('src');
    expect(image).toBeTruthy();
    expect(src).toEqual('../../../../assets/images/Amazon_icon.png');
  });

  it('should have a reactiveForm variable', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const navbar = fixture.componentInstance;
    expect(navbar.searchForm).toBeTruthy();
  });

  it('should have a form element', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form');
    expect(form).toBeTruthy();
  });
});
