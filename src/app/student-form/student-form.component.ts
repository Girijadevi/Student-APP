import { Component } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'] 
})
export class StudentFormComponent {
  student = { name: '', grade: '', age: null, gender: '' };  
  grades = ['A', 'B', 'C', 'D'];
  
  isEditMode = false; 

  constructor(private studentService: StudentService) {}

  onSubmit() {
    if (this.isEditMode) {
      console.log('Editing student:', this.student);
    } else {
      console.log('Adding new student:', this.student);
      this.studentService.addStudent(this.student);
    }

    this.resetForm();
  }

  resetForm() {
    this.student = { name: '', grade: '', age: null, gender: '' };
    this.isEditMode = false;
  }

  startEdit(student: any) {
    this.isEditMode = true;
    this.student = { ...student }; 
  }
}
