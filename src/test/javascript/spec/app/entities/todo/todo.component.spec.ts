/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { TodoComponent } from '../../../../../../main/webapp/app/entities/todo/todo.component';
import { TodoService } from '../../../../../../main/webapp/app/entities/todo/todo.service';
import { Todo } from '../../../../../../main/webapp/app/entities/todo/todo.model';

describe('Component Tests', () => {

    describe('Todo Management Component', () => {
        let comp: TodoComponent;
        let fixture: ComponentFixture<TodoComponent>;
        let service: TodoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [TodoComponent],
                providers: [
                    TodoService
                ]
            })
            .overrideTemplate(TodoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TodoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TodoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Todo(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.todos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
