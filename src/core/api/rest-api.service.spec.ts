// import { RestApiService } from './rest-api.service';

// import { environment } from '@env';
// import { Option } from './option';

// class MessageDto {
//   message: string;
// }

// class RequestDto {
//   id: string;
//   body: string;
// }

// class ResponseDto {
//   id: string;
//   body: string;
// }

// // TODO: Fix all tests
// describe('#ApiService', () => {
//   let apiService: RestApiService;
//   const messageDto: MessageDto = { message: 'Welcome to api!' }
//   let httpTestingController: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [RestApiService]
//     });
//     apiService = TestBed.inject(RestApiService);
//     httpTestingController = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpTestingController.verify();
//   });

//   it('should be created', () => {
//     expect(apiService).toBeTruthy();
//   });
//   it('GET: should return an Observable<Message>', fakeAsync((): void => {
//     apiService.get<MessageDto>('/hello').subscribe((result) => {
//       expect(result.message).toEqual(messageDto.message);
//     });
//     const req = httpTestingController.expectOne(`${environment.url}/hello`);
//     req.flush(messageDto);
//     tick();
//   }));
//   it('POST: should return an Observable<Message>', fakeAsync((): void => {

//     const reqDto: RequestDto = { id: '123', body: 'body' };
//     const option: Option = { observe: 'body', responseType: 'json'};
//     apiService.post<ResponseDto, RequestDto>('/hello', reqDto, option)
//       .subscribe((result) => {
//         expect(result.id).toEqual(reqDto.id);
//         expect(result.body).toEqual(reqDto.body);
//       });
//     const req = httpTestingController.expectOne(`${environment.url}/hello`);
//     expect(req.request.body).toBe(reqDto);
//     req.flush(reqDto, {status: 200, statusText: 'Ok'});
//     tick();
//   }));
//   it('PUT: should return an Observable<Message>', fakeAsync((): void => {

//     const reqDto: RequestDto = { id: '123', body: 'body' };
//     const option: Option = { observe: 'body', responseType: 'json'};
//     apiService.put<ResponseDto, RequestDto>('/hello', reqDto, option)
//       .subscribe((result) => {
//         expect(result.id).toEqual(reqDto.id);
//         expect(result.body).toEqual(reqDto.body);
//       });
//     const req = httpTestingController.expectOne(`${environment.url}/hello`);
//     expect(req.request.body).toBe(reqDto);
//     req.flush(reqDto, {status: 200, statusText: 'Ok'});
//     tick();
//   }));

//   it('PATCH: should return an Observable<Message>', fakeAsync((): void => {
//     const reqDto: RequestDto = { id: '123', body: 'body' };
//     const option: Option = { observe: 'body', responseType: 'json'};
//     apiService.patch<ResponseDto, RequestDto>('/hello', reqDto, option)
//       .subscribe((result) => {
//         expect(result.id).toEqual(reqDto.id);
//         expect(result.body).toEqual(reqDto.body);
//       });
//     const req = httpTestingController.expectOne(`${environment.url}/hello`);
//     expect(req.request.body).toBe(reqDto);
//     req.flush(reqDto, {status: 200, statusText: 'Ok'});
//     tick();
//   }));

//   it('JSONP: should return an Observable<Message> GET', fakeAsync((done: () => void): void => {
//     apiService.jsonp<MessageDto>('/hello', 'myCallback').subscribe((_result) => {
//       done();
//     });
//     const req = httpTestingController.expectOne({method: 'JSONP', url: `${environment.url}/hello?myCallback=JSONP_CALLBACK`});
//     req.flush(messageDto);
//     tick();
//   }));

//   describe('#make a request for an error response', () => {
//     it('ERROR: with a JSON body', (done) => {

//       apiService.get('/hello').subscribe(() => { }, (res: HttpErrorResponse) => {
//         expect(res.error.message).toEqual(messageDto.message);
//         done();
//       });
//       httpTestingController.expectOne(`${environment.url}/hello`)
//         .flush({ message: 'Welcome to api!' }, { status: 500, statusText: 'Server error' });
//     });
//   });
// });
