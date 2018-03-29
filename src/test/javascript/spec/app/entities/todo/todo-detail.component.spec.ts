/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestModule } from '../../../test.module';
import { TodoDetailComponent } from '../../../../../../main/webapp/app/entities/todo/todo-detail.component';
import { TodoService } from '../../../../../../main/webapp/app/entities/todo/todo.service';
import { Todo } from '../../../../../../main/webapp/app/entities/todo/todo.model';

describe('Component Tests', () => {

    describe('Todo Management Detail Component', () => {
        let comp: TodoDetailComponent;
        let fixture: ComponentFixture<TodoDetailComponent>;
        let service: TodoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [TodoDetailComponent],
                providers: [
                    TodoService
                ]
            })
            .overrideTemplate(TodoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TodoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TodoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Todo(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.todo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
