import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl, AbstractControl, FormArray} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { IEmployee } from '../IEmployee';
import { ISkill } from '../ISkill';
import { strict } from 'assert';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;


  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the
  // corresponding form control
  formErrors = {
    'fullName': '',
    'contactPreference':'',
    'email': '',
    'confirmEmail':'',
    'emailGroup':'',
    'phone': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };

  
  // This object contains all the validation messages for this form
  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'contactPreference':{
      'required': 'Contact Preference is required.',
    },
    'email': {
      'required': 'Email is required.',
      'email': 'email format should be like @abc.com',
      'emailDomain':'email domain should be pragimtech.com'
    },
    'confirmEmail':{
      'required': 'Confirm Email is required.',
    },
    'emailGroup':{
      'emailMismatch':'Email and confirm Email should be same ',
    },
    'phone': {
      'required': 'Phone is required.'
    },
   
  };
  employee: IEmployee;
  IsEditForm: boolean;
  pageTitle: string;


  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.IsEditForm = false;
    this.FormCreation();
    this.ValidationsObservable();
    //this.DefaultOnChangeEvent();

    this.route.paramMap.subscribe(params => {
      const empId = +params.get('id');
      if (empId) {
        this.IsEditForm = true;
        this.pageTitle = 'Edit Employee';
        this.getEmployee(empId);
      }else{
        this.pageTitle = 'Create Employee';
        this.employee = {
          id: null,
          fullName: '',
          contactPreference: '',
          email: '',
          phone: null,
          skills: []
        };

        this.IsEditForm = false;
      }
    });

  }

  getEmployee(id: number) {
    this.employeeService.getEmployee(id)
      .subscribe(
        (employee: IEmployee) => {
          // Store the employee object returned by the
          // REST API in the employee property
          this.employee = employee;
          this.editEmployee(employee);
        },
        (err: any) => console.log(err)
      );
  }

  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email
      },
      phone: employee.phone
    });
    this.employeeForm.setControl('skills', this.setExistingSkills(employee.skills));
   // this.DefaultOnChangeEvent();
    this.logValidationErrors(this.employeeForm,true);
  }

  setExistingSkills(skillSets: ISkill[]): FormArray {
    const formArray = new FormArray([]);
    skillSets.forEach(s => {
      formArray.push(this.fb.group({
        skillName: s.skillName,
        experienceInYears: s.experienceInYears,
        proficiency: s.proficiency
      }));
    });

    return formArray;
  }

  DefaultOnChangeEvent(){
    this.onContactPrefernceChange(this.employeeForm.get('contactPreference').value);
  }


  FormCreation(){
    //     this.employeeForm = new FormGroup({
    // fullname:new FormControl(),
    // email: new FormControl(),
    //       // Create skills form group
    //       skills: new FormGroup({
    //         skillName: new FormControl(),
    //         experienceInYears: new FormControl(),
    //         proficiency: new FormControl()
    //       })
    //     });

    /// ngModel is used in template driven forms

    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      contactPreference: ['email', Validators.required],
      emailGroup:this.fb.group({
        email: ['', [Validators.required]],
        confirmEmail: ['', [Validators.required]],
      }, { validators: [CreateEmployeeComponent.matchEmails]}),
     
      phone: [''],
      //formGroupName =0 because in the array 0 th position is where the formgroup exist
      skills: this.fb.array([this.addSkillFormGroup()]),
    });
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]
    });
  }

  addSkillButtonClick(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  removeSkillButtonClick(skillGroupIndex: number): void {
    const skillsFormArray = <FormArray>this.employeeForm.get('skills');
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
  }

  ValidationsObservable(){
    // To Get Value Change in forms
    this.employeeForm.get('contactPreference').valueChanges.pipe().subscribe((x: string) => {
      this.onContactPrefernceChange(x);

    });
    this.employeeForm.valueChanges.pipe().subscribe(x => {
      this.logValidationErrors();
    });
  }

  // If the Selected Radio Button value is "phone", then add the
  // required validator function otherwise remove it
  onContactPrefernceChange(selectedValue: string = this.employeeForm.get('contactPreference').value) {
    const phoneFormControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phoneFormControl.setValidators(Validators.required);
    } else {
      phoneFormControl.clearValidators();
    }
    phoneFormControl.updateValueAndValidity();


    const EmailGroup = this.employeeForm.get('emailGroup')
    const EmailFormControl = EmailGroup.get('email');
    const ConfirmEmail = EmailGroup.get('confirmEmail');
    if(selectedValue === 'email'){
      
      EmailFormControl.setValidators([Validators.required, Validators.email, CreateEmployeeComponent.emailDomain]);
      ConfirmEmail.setValidators([Validators.required]);
    }else{
      EmailFormControl.clearValidators();
      ConfirmEmail.clearValidators();
    }
    EmailFormControl.updateValueAndValidity();
    ConfirmEmail.updateValueAndValidity();

  }


  // To get value and key of form group we can use this method

  logValidationErrors(group: FormGroup = this.employeeForm, IsEditForm: boolean = this.IsEditForm): void {

    // Loop through each control key in the FormGroup
    Object.keys(group.controls).forEach((key: string) => {
      // Get the control. The control can be a nested form group
      const abstractControl = group.get(key);

      // Clear the existing validation errors
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && ((abstractControl.touched || abstractControl.dirty) || IsEditForm)) {
        // Get all the validation messages of the form control
        // that has failed the validation
        const messages = this.validationMessages[key];

        // Find which validation has failed. For example required,
        // minlength or maxlength. Store that error message in the
        // formErrors object. The UI will bind to this object to
        // display the validation errors

        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      // If the control is nested form group, recursively call
      // this same method
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl,IsEditForm);
        // If the control is a FormControl
      } 

      // We need this additional check to get to the FormGroup
      // in the FormArray and then recursively call this
      // logValidationErrors() method to fix the broken validation
      if (abstractControl instanceof FormArray) {
        for (const control of abstractControl.controls) {
          if (control instanceof FormGroup) {
            this.logValidationErrors(control,IsEditForm);
          }
        }
      }
      
    });
  }



  loaddata():void{
    let obj = { fullname: "aa", email: "ghjskj", skills: { skillName: "sdad", experienceInYears: 5, proficiency:"advanced"}};

    // with set value we should update full form control
    this.employeeForm.setValue(obj);

    // with patch value we can update part form control
    this.employeeForm.patchValue(obj);


    this.logValidationErrors(this.employeeForm);
  }


  onSubmit(): void {
    this.mapFormValuesToEmployeeModel();

    if (this.employee.id) {
      this.employeeService.updateEmployee(this.employee).subscribe(
        () => this.router.navigate(['/employees']),
        (err: any) => console.log(err)
      );
    } else {
      this.employeeService.addEmployee(this.employee).subscribe(
        () => this.router.navigate(['/employees']),
        (err: any) => console.log(err)
      );
    }
  }
  mapFormValuesToEmployeeModel() {
    this.employee.fullName = this.employeeForm.value.fullName;
    this.employee.contactPreference = this.employeeForm.value.contactPreference;
    this.employee.email = this.employeeForm.value.emailGroup.email;
    this.employee.phone = this.employeeForm.value.phone;
    this.employee.skills = this.employeeForm.value.skills;
    
  }


  //#region  Custom Validations
 
 static emailDomain(control: AbstractControl): { [key: string]: any } | null {
  const email: string = control.value;
  const domain = email.substring(email.lastIndexOf('@') + 1);
  if (email === '' || domain.toLowerCase() === 'pragimtech.com') {
    return null;
  } else {
    return { 'emailDomain': true };
  }
}

// Nested form group (emailGroup) is passed as a parameter. Retrieve email and
// confirmEmail form controls. If the values are equal return null to indicate
// validation passed otherwise an object with emailMismatch key. Please note we
// used this same key in the validationMessages object against emailGroup
// property to store the corresponding validation error message
 static matchEmails(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');

   if (emailControl.value === confirmEmailControl.value || (confirmEmailControl.pristine && confirmEmailControl.value === "")) {
    return null;
  } else {
    return { 'emailMismatch': true };
  }
}

//#endregion



}
