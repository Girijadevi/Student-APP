import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private storageKey = 'students'; 
  private students = new BehaviorSubject<any[]>(this.loadStudents());

  students$ = this.students.asObservable();

  constructor() {}

  loadStudents(): any[] {
    const students = localStorage.getItem(this.storageKey);
    return students ? JSON.parse(students) : [];
  }

  addStudent(student: any) {
    const current = this.students.getValue();
    const newStudent = { ...student, id: current.length + 1 };
    const updatedStudents = [...current, newStudent];
    this.students.next(updatedStudents);
    this.saveStudentsToLocalStorage(updatedStudents);
  }

  deleteStudent(student: any) {
    const current = this.students.value.filter((s) => s !== student);
    this.students.next(current);
    this.saveStudentsToLocalStorage(current);
  }

  updateStudent(oldStudent: any, updatedStudent: any) {
    const current = this.students.value.map((s) =>
      s.id === oldStudent.id ? updatedStudent : s
    );
    this.students.next(current);
    this.saveStudentsToLocalStorage(current);
  }

  private saveStudentsToLocalStorage(students: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(students));
  }
}
