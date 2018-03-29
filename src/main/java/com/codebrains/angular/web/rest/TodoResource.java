package com.codebrains.angular.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.codebrains.angular.domain.Todo;

import com.codebrains.angular.repository.TodoRepository;
import com.codebrains.angular.web.rest.errors.BadRequestAlertException;
import com.codebrains.angular.web.rest.util.HeaderUtil;
import com.codebrains.angular.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Todo.
 */
@RestController
@RequestMapping("/api")
public class TodoResource {

    private final Logger log = LoggerFactory.getLogger(TodoResource.class);

    private static final String ENTITY_NAME = "todo";

    private final TodoRepository todoRepository;

    public TodoResource(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    /**
     * POST  /todos : Create a new todo.
     *
     * @param todo the todo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new todo, or with status 400 (Bad Request) if the todo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/todos")
    @Timed
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) throws URISyntaxException {
        log.debug("REST request to save Todo : {}", todo);
        if (todo.getId() != null) {
            throw new BadRequestAlertException("A new todo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Todo result = todoRepository.save(todo);
        return ResponseEntity.created(new URI("/api/todos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /todos : Updates an existing todo.
     *
     * @param todo the todo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated todo,
     * or with status 400 (Bad Request) if the todo is not valid,
     * or with status 500 (Internal Server Error) if the todo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/todos")
    @Timed
    public ResponseEntity<Todo> updateTodo(@RequestBody Todo todo) throws URISyntaxException {
        log.debug("REST request to update Todo : {}", todo);
        if (todo.getId() == null) {
            return createTodo(todo);
        }
        Todo result = todoRepository.save(todo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, todo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /todos : get all the todos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of todos in body
     */
    @GetMapping("/todos")
    @Timed
    public ResponseEntity<List<Todo>> getAllTodos(Pageable pageable) {
        log.debug("REST request to get a page of Todos");
        Page<Todo> page = todoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/todos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /todos/:id : get the "id" todo.
     *
     * @param id the id of the todo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the todo, or with status 404 (Not Found)
     */
    @GetMapping("/todos/{id}")
    @Timed
    public ResponseEntity<Todo> getTodo(@PathVariable Long id) {
        log.debug("REST request to get Todo : {}", id);
        Todo todo = todoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(todo));
    }

    /**
     * DELETE  /todos/:id : delete the "id" todo.
     *
     * @param id the id of the todo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/todos/{id}")
    @Timed
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        log.debug("REST request to delete Todo : {}", id);
        todoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
