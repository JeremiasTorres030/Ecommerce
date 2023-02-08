import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [AppComponent, NavbarComponent],
    }).compileComponents();
  });

  it('should be created', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the "app-navbar" component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement;
    const navbar = compiled.query(By.css('app-navbar'));
    expect(navbar).toBeTruthy();
  });
});
