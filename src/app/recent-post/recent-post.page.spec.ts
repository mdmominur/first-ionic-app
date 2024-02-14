import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentPostPage } from './recent-post.page';

describe('RecentPostPage', () => {
  let component: RecentPostPage;
  let fixture: ComponentFixture<RecentPostPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecentPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
