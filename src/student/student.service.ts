import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  findAll() {
    return this.studentRepository.find();
  }

  async findOne(id: string) {
    const foundStudent = await this.studentRepository.findOne(id);
    if (!foundStudent) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return foundStudent;
  }

  create(createStudentDto: CreateStudentDto) {
    const student = this.studentRepository.create(createStudentDto);
    return this.studentRepository.save(student);
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const coffee = await this.studentRepository.preload({
      id: +id,
      ...updateStudentDto,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.studentRepository.save(coffee);
  }

  async remove(id: string) {
    const student = await this.studentRepository.findOne(id);
    return this.studentRepository.remove(student);
  }
}
