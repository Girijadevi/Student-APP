import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
})
export class StudentTableComponent implements OnInit {
  students: any[] = [];
  displayedColumns = ['name', 'grade', 'age', 'gender', 'actions'];


  isEditMode = false; 
  studentToEdit: any = null; 

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.students$.subscribe((students) => (this.students = students));
  }

  deleteStudent(student: any) {
    this.studentService.deleteStudent(student);
  }

  editStudent(student: any) {
    this.isEditMode = true;
    this.studentToEdit = { ...student }; 
  }
  
  saveStudent() {
    if (this.isEditMode) {
      this.studentService.updateStudent(this.studentToEdit, { ...this.studentToEdit });
    } else {
      this.studentService.addStudent(this.studentToEdit);
    }
    this.isEditMode = false;
    this.studentToEdit = null;
  }
  
  cancelEdit() {
    this.isEditMode = false; 
    this.studentToEdit = null; 
  }
}
