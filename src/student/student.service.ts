import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  private student: Student[] = [
    {
      id: 1,
      name: 'Adan',
      class: 10,
      subjects: ['math', 'science'],
    },
  ];

  findAll() {
    return this.student;
  }

  findOne(id: string) {
    const foundStudent = this.student.find((data) => data.id === +id);
    if (!foundStudent) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return foundStudent;
  }

  create(createStudentDto: any) {
    this.student.push(createStudentDto);
  }

  update(id: string, updateStudentDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const studentIndex = this.student.findIndex((data) => data.id === +id);
    if (studentIndex >= 0) {
      this.student.splice(studentIndex, 1);
    }
  }
}
