import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { of } from 'rxjs';
import { Post } from '../../models';
import { PostsService } from '../../services';
import { PostListComponent } from './post-list.component';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let postsServiceSpy: jasmine.SpyObj<PostsService>;

  beforeEach(async(() => {    
    let serviceSpy = jasmine.createSpyObj('PostsService', ['getAll']);
    serviceSpy.getAll.and.returnValue(of([]));
    TestBed.configureTestingModule({
      declarations: [ 
        PostListComponent 
      ],
      providers: [
        { 
          provide: PostsService,
          useValue: serviceSpy
        }
      ]
    })
    .compileComponents();
    postsServiceSpy = TestBed.inject(PostsService) as jasmine.SpyObj<PostsService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('ngOnInit() - should load the posts array from service', () => {
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
    postsServiceSpy.getAll.and.returnValue(of(dummyPosts));

    fixture.detectChanges();
    expect(component.posts).not.toBeNull();
    expect(component.posts.length).toBe(dummyPosts.length);
  });

  it('postDeleted() - should remove element from posts array', () => {    
    const dummpyPostToDelete = 2;
    const dummyPosts: Post[] = [
      {
        Id: 1,
        Title: "First Post",
        Body: "Body Post 1",
        CreatedBy: "Mario Cantu",
        CreatedAt: new Date()
      },
      {
        Id: dummpyPostToDelete,
        Title: "Another post",
        Body: "Body Post 2",
        CreatedBy: "Mario",
        CreatedAt: new Date()
      }
    ];
    component.posts = dummyPosts;
    
    //Act
    component.postDeleted(dummpyPostToDelete);

    expect(component.posts).not.toBeNull();
    expect(component.posts.length).toBe(1);
  });
});
