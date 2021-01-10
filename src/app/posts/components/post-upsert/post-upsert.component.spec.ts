import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Post } from '../../models';
import { PostsService } from '../../services';
import { PostUpsertComponent } from './post-upsert.component';

describe('PostUpsertComponent', () => {
  let component: PostUpsertComponent;
  let fixture: ComponentFixture<PostUpsertComponent>;
  let postsServiceSpy: jasmine.SpyObj<PostsService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: jasmine.SpyObj<any>;

  beforeEach(async(() => {
    let postsService = jasmine.createSpyObj('PostsService', ['getById', 'edit', 'add']);
    postsService.getById.and.returnValue(of(null));
    postsService.add.and.returnValue(of(true));
    postsService.edit.and.returnValue(of(true));

    let route = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
    route.snapshot = {
      data: { isNew: true },
      params: { id: 0 }
    };

    let router = jasmine.createSpyObj('Router', ['navigate']);
    router.navigate.and.callThrough();

    TestBed.configureTestingModule({
      declarations: [ 
        PostUpsertComponent 
      ],
      providers: [
        { 
          provide: PostsService,
          useValue: postsService
        },
        {
          provide: ActivatedRoute,
          useValue: route
        },
        {
          provide: Router,
          useValue: router
        }
      ]
    })
    .compileComponents();
    postsServiceSpy = TestBed.inject(PostsService) as jasmine.SpyObj<PostsService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRouteSpy = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<any>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostUpsertComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Add mode - test cases', () => {
    beforeEach(()=>{
      activatedRouteSpy.snapshot = {
        data: { isNew: true }
      };
    });

    it('ngOnInit() - should initializate Post object with empty values', ()=>{
      fixture.detectChanges();
      expect(component.post).not.toBeNull();     
      expect(component.post.Id).toBe(0);
    });

    it('onSubmit() - should call service.add method', ()=>{
      fixture.detectChanges();

      spyOn(window, "alert");
      component.post = {
        Id: 0,
        Title: "Another post",
        Body: "Body Post 2",
        CreatedBy: "Mario",
        CreatedAt: new Date()
      };
      component.onSubmit();

      expect(postsServiceSpy.add).toHaveBeenCalledTimes(1)
      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  describe('Edit mode - test cases', () => {
    let dummyPostId: number = 2;

    beforeEach(()=>{
      activatedRouteSpy.snapshot = {
        data: { isNew: false },
        params: { id: dummyPostId }
      };
    });

    it('ngOnInit() - should initializate Post object getting it from service', ()=>{
      const dummyPost: Post = {
        Id: dummyPostId,
        Title: "Another post",
        Body: "Body Post 2",
        CreatedBy: "Mario",
        CreatedAt: new Date()
      };
      postsServiceSpy.getById.and.returnValue(of(dummyPost));

      fixture.detectChanges();
      expect(component.post).not.toBeNull();     
      expect(component.post.Id).toBe(dummyPostId);
      expect(postsServiceSpy.getById).toHaveBeenCalledTimes(1);
    });

    it('onSubmit() - should call service.edit method', ()=>{
      fixture.detectChanges();

      spyOn(window, "alert");
      component.post = {
        Id: dummyPostId,
        Title: "Another post",
        Body: "Body Post 2",
        CreatedBy: "Mario",
        CreatedAt: new Date()
      };
      component.onSubmit();

      expect(postsServiceSpy.edit).toHaveBeenCalledTimes(1)
      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
