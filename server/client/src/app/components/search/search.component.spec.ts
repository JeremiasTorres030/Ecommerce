import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a primary div', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div.searchComponent');
    expect(div).toBeTruthy();
  });

  it('should have a searchForm variable', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.searchForm).toBeDefined();
  });

  it('should have a suggestions variable', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.suggestions).toBeDefined();
  });

  it('should have a selectProduct function', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.selectProduct).toBeDefined();
  });

  it('should have a form element', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('should render a input element', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input[type="text"]');
    expect(input).toBeTruthy();
  });

  it('should render a button element', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button[type="submit"]');
    expect(button).toBeTruthy();
  });
});
