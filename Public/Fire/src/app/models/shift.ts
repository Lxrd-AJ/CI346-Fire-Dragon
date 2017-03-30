import { Employee } from './employee';

export class Shift {
    employees: Employee[] = []
    constructor(
        public id : string,
        public name: string,
        public startDateTime: Date,
        public endDateTime: Date
    ){}
}
