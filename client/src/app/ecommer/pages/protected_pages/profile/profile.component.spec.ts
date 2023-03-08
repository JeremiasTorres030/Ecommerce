import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let snackBar: MatSnackBar;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
    }).compileComponents();
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProfileComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a primary div', () => {
    const fixture = TestBed.createComponent(ProfileComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.profileComponent');
    expect(div).toBeTruthy();
  });

  it('should have a form element', () => {
    const fixture = TestBed.createComponent(ProfileComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('should have a editForm variable', () => {
    const fixture = TestBed.createComponent(ProfileComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.editForm).toBeDefined();
  });

  it('should have and render 5 inputs', () => {
    const fixture = TestBed.createComponent(ProfileComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const inputs = compiled.querySelectorAll('input');
    expect(inputs.length).toBe(6);
  });
});
