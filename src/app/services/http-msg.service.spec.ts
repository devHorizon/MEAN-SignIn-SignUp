import { TestBed, inject } from '@angular/core/testing';

import { HttpMsgService } from './http-msg.service';

describe('HttpMsgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpMsgService]
    });
  });

  it('should be created', inject([HttpMsgService], (service: HttpMsgService) => {
    expect(service).toBeTruthy();
  }));
});
