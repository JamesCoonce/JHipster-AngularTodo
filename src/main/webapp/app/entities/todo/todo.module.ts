import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    TodoService,
    TodoPopupService,
    TodoComponent,
    TodoDetailComponent,
    TodoDialogComponent,
    TodoPopupComponent,
    TodoDeletePopupComponent,
    TodoDeleteDialogComponent,
    todoRoute,
    todoPopupRoute,
    TodoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...todoRoute,
    ...todoPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TodoComponent,
        TodoDetailComponent,
        TodoDialogComponent,
        TodoDeleteDialogComponent,
        TodoPopupComponent,
        TodoDeletePopupComponent,
    ],
    entryComponents: [
        TodoComponent,
        TodoDialogComponent,
        TodoPopupComponent,
        TodoDeleteDialogComponent,
        TodoDeletePopupComponent,
    ],
    providers: [
        TodoService,
        TodoPopupService,
        TodoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterTodoModule {}
