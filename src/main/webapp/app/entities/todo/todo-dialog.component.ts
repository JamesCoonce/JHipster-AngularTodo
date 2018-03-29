import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Todo } from './todo.model';
import { TodoPopupService } from './todo-popup.service';
import { TodoService } from './todo.service';

@Component({
    selector: 'jhi-todo-dialog',
    templateUrl: './todo-dialog.component.html'
})
export class TodoDialogComponent implements OnInit {

    todo: Todo;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private todoService: TodoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.todo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.todoService.update(this.todo));
        } else {
            this.subscribeToSaveResponse(
                this.todoService.create(this.todo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Todo>>) {
        result.subscribe((res: HttpResponse<Todo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Todo) {
        this.eventManager.broadcast({ name: 'todoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-todo-popup',
    template: ''
})
export class TodoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private todoPopupService: TodoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.todoPopupService
                    .open(TodoDialogComponent as Component, params['id']);
            } else {
                this.todoPopupService
                    .open(TodoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
