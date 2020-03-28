import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveWebfluxTestComponent } from './reactive-webflux-test.component';

describe('ReactiveWebfluxTestComponent', () => {
  let component: ReactiveWebfluxTestComponent;
  let fixture: ComponentFixture<ReactiveWebfluxTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveWebfluxTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveWebfluxTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
