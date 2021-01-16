import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactMessagesService } from './contact-messages.service';
import { ContactMessage } from '../models';

describe('ContactMessagesService', () => {
  let service: ContactMessagesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({      
      imports: [HttpClientTestingModule],
      providers: [ContactMessagesService]
    });
    service = TestBed.inject(ContactMessagesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('add() test cases', () => {
    it('Should call httpclient and return true on success', () => {
      const dummyMsg: ContactMessage = {
        Id: 0,
        Name: "Mario Cantu",
        Email: "fake@gmail.com",
        Subject: "First Message",
        MessageBody: "Message Body 1",
        CreatedAt: new Date()
      };
  
      service.add(dummyMsg).subscribe(success => {
        expect(success).not.toBeNull();
        expect(success).toBeTruthy();
      });
      
      const request = httpMock.expectOne(service.BASE_URL);
      expect(request.request.method).toBe('POST');      
      request.flush('', { 
        status: 200, 
        statusText: 'OK' 
      });
    });
    
    it('Should catch client-side errors', () => {
      const dummyMsg: ContactMessage = {
        Id: 0,
        Name: "Mario Cantu",
        Email: "fake@gmail.com",
        Subject: "First Message",
        MessageBody: "Message Body 1",
        CreatedAt: new Date()
      };
  
      service.add(dummyMsg).subscribe(
        () => {},
        err => {
          expect(err).not.toBeNull();
        }
      );
      
      const request = httpMock.expectOne(service.BASE_URL);
      expect(request.request.method).toBe('POST');
      request.error(new ErrorEvent('Client_Error'));
    });

    it('Should catch server-side errors', () => {
      const dummyMsg: ContactMessage = {
        Id: 0,
        Name: "Mario Cantu",
        Email: "fake@gmail.com",
        Subject: "First Message",
        MessageBody: "Message Body 1",
        CreatedAt: new Date()
      };

      service.add(dummyMsg).subscribe(
        () => {},
        err => {
          expect(err).not.toBeNull();
        }
      );
      
      const request = httpMock.expectOne(service.BASE_URL);
      expect(request.request.method).toBe('POST');
      request.flush('', { 
        status: 500, 
        statusText: 'Internal error' 
      });
    });
  });
});
