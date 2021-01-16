import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ContactMessagesService } from '../../services';
import { ContactFormComponent } from './contact-form.component';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let contactMessagesServiceSpy: jasmine.SpyObj<ContactMessagesService>;

  beforeEach(async(() => {
    let contactMessagesService = jasmine.createSpyObj('ContactMessagesService', ['add']);
    contactMessagesService.add.and.returnValue(of(true));

    TestBed.configureTestingModule({
      declarations: [ ContactFormComponent ],
      providers: [
        { 
          provide: ContactMessagesService,
          useValue: contactMessagesService
        },
        FormBuilder
      ],
      imports:[
        ReactiveFormsModule
      ]
    })
    .compileComponents();    
    contactMessagesServiceSpy = TestBed.inject(ContactMessagesService) as jasmine.SpyObj<any>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
