import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostsService } from './posts.service';
import { Post } from '../models';

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({      
      imports: [HttpClientTestingModule],
      providers: [PostsService]
    });
    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll() test cases', () => {
    it('Should call httpclient and return data', () => {
      const dummyPosts: Post[] = [
        {
          Id: 1,
          Title: "First Post",
          Body: "Body Post 1",
          CreatedBy: "Mario Cantu",
          CreatedAt: new Date()
        },
        {
          Id: 2,
          Title: "Another post",
          Body: "Body Post 2",
          CreatedBy: "Mario",
          CreatedAt: new Date()
        }
      ];
  
      service.getAll().subscribe(posts => {
        expect(posts.length).toBe(2);
        expect(posts).toEqual(dummyPosts);
      });
      
      const request = httpMock.expectOne(service.BASE_URL);
      expect(request.request.method).toBe('GET');
      request.flush(dummyPosts);
    });
    
    it('Should catch client-side errors', () => {
      service.getAll().subscribe(
        () => {},
        err => {
          expect(err).not.toBeNull();
        }
      );
      
      const request = httpMock.expectOne(service.BASE_URL);
      expect(request.request.method).toBe('GET');
      request.error(new ErrorEvent('Bad_Request'));
    });

    it('Should catch server-side errors', () => {
      service.getAll().subscribe(
        () => {},
        err => {
          expect(err).not.toBeNull();
        }
      );
      
      const request = httpMock.expectOne(service.BASE_URL);
      expect(request.request.method).toBe('GET');
      request.flush('', { 
        status: 500, 
        statusText: 'Internal error' 
      });
    });
  });

  describe('getById() test cases', () => {
    it('Should call httpclient and return data', () => {
      const dummyPostId: number = 1;
      const dummyPost: Post = {
        Id: dummyPostId,
        Title: "First Post",
        Body: "Body Post 1",
        CreatedBy: "Mario Cantu",
        CreatedAt: new Date()
      };
  
      service.getById(dummyPostId).subscribe(post => {
        expect(post).not.toBeNull();
        expect(post).toEqual(dummyPost);
      });
      
      const request = httpMock.expectOne(`${service.BASE_URL}/${dummyPostId}`);
      expect(request.request.method).toBe('GET');
      request.flush(dummyPost);
    });
    
    it('Should catch client-side errors', () => {
      const dummyPostId: number = 1;
      service.getById(dummyPostId).subscribe(
        () => {},
        err => {
          expect(err).not.toBeNull();
        }
      );
      
      const request = httpMock.expectOne(`${service.BASE_URL}/${dummyPostId}`);
      expect(request.request.method).toBe('GET');
      request.error(new ErrorEvent('Client_Error'));
    });

    it('Should catch server-side errors', () => {
      const dummyPostId: number = 1;
      service.getById(dummyPostId).subscribe(
        () => {},
        err => {
          expect(err).not.toBeNull();
        }
      );
      
      const request = httpMock.expectOne(`${service.BASE_URL}/${dummyPostId}`);
      expect(request.request.method).toBe('GET');
      request.flush('', { 
        status: 500, 
        statusText: 'Internal error' 
      });
    });
  });

  describe('add() test cases', () => {
    it('Should call httpclient and return true on success', () => {
      const dummyPost: Post = {
        Id: 0,
        Title: "First Post",
        Body: "Body Post 1",
        CreatedBy: "Mario Cantu",
        CreatedAt: new Date()
      };
  
      service.add(dummyPost).subscribe(success => {
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
      const dummyPost: Post = {
        Id: 0,
        Title: "First Post",
        Body: "Body Post 1",
        CreatedBy: "Mario Cantu",
        CreatedAt: new Date()
      };
  
      service.add(dummyPost).subscribe(
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
      const dummyPost: Post = {
        Id: 0,
        Title: "First Post",
        Body: "Body Post 1",
        CreatedBy: "Mario Cantu",
        CreatedAt: new Date()
      };

      service.add(dummyPost).subscribe(
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

  describe('delete() test cases', () => {
    it('Should call httpclient and return true on success', () => {
      const dummyPostId: number = 1;
  
      service.delete(dummyPostId).subscribe(success => {
        expect(success).not.toBeNull();
        expect(success).toBeTruthy();
      });
      
      const request = httpMock.expectOne(`${service.BASE_URL}/${dummyPostId}`);
      expect(request.request.method).toBe('DELETE');
      request.flush('', { 
        status: 200, 
        statusText: 'OK' 
      });
    });
    
    it('Should catch client-side errors', () => {
      const dummyPostId: number = 1;
      service.delete(dummyPostId).subscribe(
        () => {},
        err => {
          expect(err).not.toBeNull();
        }
      );
      
      const request = httpMock.expectOne(`${service.BASE_URL}/${dummyPostId}`);
      expect(request.request.method).toBe('DELETE');
      request.error(new ErrorEvent('Client_Error'));
    });

    it('Should catch server-side errors', () => {
      const dummyPostId: number = 1;
      service.delete(dummyPostId).subscribe(
        () => {},
        err => {
          expect(err).not.toBeNull();
        }
      );
      
      const request = httpMock.expectOne(`${service.BASE_URL}/${dummyPostId}`);
      expect(request.request.method).toBe('DELETE');
      request.flush('', { 
        status: 500, 
        statusText: 'Internal error' 
      });
    });
  });

  describe('edit() test cases', () => {
    it('Should call httpclient and return true on success', () => {
      const dummyPostId: number = 1;
      const dummyPost: Post = {
        Id: dummyPostId,
        Title: "First Post",
        Body: "Body Post 1",
        CreatedBy: "Mario Cantu",
        CreatedAt: new Date()
      };
  
      service.edit(dummyPost).subscribe(success => {
        expect(success).not.toBeNull();
        expect(success).toBeTruthy();
      });
      
      const request = httpMock.expectOne(`${service.BASE_URL}/${dummyPostId}`);
      expect(request.request.method).toBe('PUT');      
      request.flush('', { 
        status: 200, 
        statusText: 'OK' 
      });
    });
    
    it('Should catch client-side errors', () => {
      const dummyPostId: number = 1;
      const dummyPost: Post = {
        Id: dummyPostId,
        Title: "First Post",
        Body: "Body Post 1",
        CreatedBy: "Mario Cantu",
        CreatedAt: new Date()
      };
  
      service.edit(dummyPost).subscribe(
        () => {},
        err => {
          expect(err).not.toBeNull();
        }
      );
      
      const request = httpMock.expectOne(`${service.BASE_URL}/${dummyPostId}`);
      expect(request.request.method).toBe('PUT');
      request.error(new ErrorEvent('Client_Error'));
    });

    it('Should catch server-side errors', () => {
      const dummyPostId: number = 1;
      const dummyPost: Post = {
        Id: dummyPostId,
        Title: "First Post",
        Body: "Body Post 1",
        CreatedBy: "Mario Cantu",
        CreatedAt: new Date()
      };

      service.edit(dummyPost).subscribe(
        () => {},
        err => {
          expect(err).not.toBeNull();
        }
      );
      
      const request = httpMock.expectOne(`${service.BASE_URL}/${dummyPostId}`);
      expect(request.request.method).toBe('PUT');
      request.flush('', { 
        status: 500, 
        statusText: 'Internal error' 
      });
    });
  });
});
