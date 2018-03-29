import { BaseEntity } from './../../shared';

export class Todo implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public finished?: boolean,
    ) {
        this.finished = false;
    }
}
