import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PostsService } from '../../services';
import { PostViewComponent } from './post-view.component';

describe('PostViewComponent', () => {
  let component: PostViewComponent;
  let fixture: ComponentFixture<PostViewComponent>;
  let postsServiceSpy: jasmine.SpyObj<PostsService>;
  
  beforeEach(async(() => {
    let postsService = jasmine.createSpyObj('PostsService', ['delete']);
    postsService.delete.and.returnValue(of(true));

    TestBed.configureTestingModule({
      declarations: [ 
        PostViewComponent 
      ],
      providers: [
        { 
          provide: PostsService,
          useValue: postsService
        }
      ]
    })
    .compileComponents();
    postsServiceSpy = TestBed.inject(PostsService) as jasmine.SpyObj<PostsService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostViewComponent);
    component = fixture.componentInstance;
    component.post = {
      Id: 2,
      Title: "Another post",
      Body: "Body Post 2",
      CreatedBy: "Mario",
      CreatedAt: new Date()
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('deletePost() test cases', ()=>{
    it('When user does NOT confirm - should not do anything', () => {
      spyOn(window, "confirm").and.returnValue(false);
      spyOn(window, "alert");
      spyOn(component.postDeleted, 'emit');

      component.deletePost();

      expect(window.confirm).toHaveBeenCalledTimes(1);
      expect(postsServiceSpy.delete).toHaveBeenCalledTimes(0);    
      expect(window.alert).toHaveBeenCalledTimes(0);      
      expect(component.postDeleted.emit).toHaveBeenCalledTimes(0); 
    });

    it('When user DOES confirm - should call service.delete, shows an alert and navigate to posts list', () => {
      spyOn(window, "confirm").and.returnValue(true);
      spyOn(window, "alert");
      spyOn(component.postDeleted, 'emit');

      component.deletePost();

      expect(window.confirm).toHaveBeenCalledTimes(1);
      expect(postsServiceSpy.delete).toHaveBeenCalledTimes(1);    
      expect(window.alert).toHaveBeenCalledTimes(1);      
      expect(component.postDeleted.emit).toHaveBeenCalledTimes(1); 
      expect(component.postDeleted.emit).toHaveBeenCalledWith(component.post.Id); 
    });
  });
});
