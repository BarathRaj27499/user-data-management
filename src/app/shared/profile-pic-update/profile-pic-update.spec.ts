import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePicUpdate } from './profile-pic-update';

describe('ProfilePicUpdate', () => {
  let component: ProfilePicUpdate;
  let fixture: ComponentFixture<ProfilePicUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePicUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePicUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
