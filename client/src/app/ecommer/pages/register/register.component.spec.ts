import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a primary div', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.registerComponent');
    expect(div).toBeTruthy();
  });

  it('should have a registerForm variable', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.registerForm).toBeDefined();
  });

  it('should have a submitForm function', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.submitForm).toBeDefined();
  });

  it('should have and render a form element', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('should call submitForm when the form is submitted', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const spy = spyOn(component, 'submitForm');
    const debug = fixture.debugElement;
    debug.query(By.css('form')).triggerEventHandler('ngSubmit');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
