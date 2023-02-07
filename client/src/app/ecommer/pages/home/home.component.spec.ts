import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, NavbarComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  it('should create the HomeComponent', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const homeComponent = fixture.componentInstance;
    expect(homeComponent).toBeTruthy();
  });

  it('should have the "app-navbar" component', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement;
    const navbar = compiled.query(By.css('app-navbar'));
    expect(navbar).toBeTruthy();
  });
});
