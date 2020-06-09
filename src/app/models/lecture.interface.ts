import { Student } from './students.interface';

export interface Lecture {
    attendants: Array<Student>,
    
    checkInCode: string,
    classId: number,
    endTime: string,
    id: number,
    startTime: string
}