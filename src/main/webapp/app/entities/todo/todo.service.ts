import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Todo } from './todo.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Todo>;

@Injectable()
export class TodoService {

    private resourceUrl =  SERVER_API_URL + 'api/todos';

    constructor(private http: HttpClient) { }

    create(todo: Todo): Observable<EntityResponseType> {
        const copy = this.convert(todo);
        return this.http.post<Todo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(todo: Todo): Observable<EntityResponseType> {
        const copy = this.convert(todo);
        return this.http.put<Todo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Todo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Todo[]>> {
        const options = createRequestOption(req);
        return this.http.get<Todo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Todo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Todo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Todo[]>): HttpResponse<Todo[]> {
        const jsonResponse: Todo[] = res.body;
        const body: Todo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Todo.
     */
    private convertItemFromServer(todo: Todo): Todo {
        const copy: Todo = Object.assign({}, todo);
        return copy;
    }

    /**
     * Convert a Todo to a JSON which can be sent to the server.
     */
    private convert(todo: Todo): Todo {
        const copy: Todo = Object.assign({}, todo);
        return copy;
    }
}
