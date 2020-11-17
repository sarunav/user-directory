import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'user-directory';

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  valueArray = [];
  form: FormGroup;

  constructor() {}

  ngOnInit(): void {
    // Creating the form group on initial component load
    this.createForm();
  }

  createForm(): FormGroup {
    return (this.form = new FormGroup({
      arr: new FormControl([], [Validators.required, Validators.maxLength(5)]),
      value: new FormControl(''),
    }));
  }

  // Add chip item event
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    console.log(value);
    this.valueArray.push(value);
    if ((value || '').trim()) {
      this.form.controls.arr.setValue(this.valueArray);

      this.form.updateValueAndValidity();
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  // Remove chip item
  remove(item: any): void {
    const index = this.valueArray.indexOf(item);

    if (index >= 0) {
      this.valueArray.splice(index, 1);
      this.form.controls.arr.setValue(this.valueArray);
    }
  }

  // On submit method
  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    // Converting Number String array to Number Array
    const numberArray = this.form.value.arr.map((i: number) => Number(i));

    // Finding the sum of the array using Reduce
    const sumOfArray = numberArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );

    const data = { sum: sumOfArray, value: Number(this.form.value.value) };

    // Saving to local storage
    localStorage.setItem('data', JSON.stringify(data));
  }
}
