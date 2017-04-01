import { Employee } from './employee';

export class Shift {
    employees: Employee[] = []
    constructor(
        public _id : string,
        public name: string,
        public startDateTime: Date,
        public endDateTime: Date
    ){}
}
