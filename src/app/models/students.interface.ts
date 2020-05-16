export interface Student {
    id: number,

    email: string,
    name: string,
    surname: string,

    academic_group_id: number,
    role: string,
    status: string,

    createdAt: Date,
    updatedAt: Date
}