import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective  } from '@angular/forms';
import { ContactMessage } from '../../models';
import { ContactMessagesService } from '../../services';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  contactForm: FormGroup;

  hasError = (controlName: string, errorName: string) => {
    return this.contactForm.controls[controlName].hasError(errorName);
  }

  constructor(
    private contactMessagesService: ContactMessagesService,
    fb: FormBuilder
  ) { 
    this.contactForm = fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      subject: ['', Validators.required],
      messageBody: ['', Validators.required]
      });
  }

  onSubmit(formDirective: FormGroupDirective): void {    
    const msg = this.contactForm.value as ContactMessage;
    this.contactMessagesService.add(msg).subscribe(() => {
      alert("Message sent successfully!!!");
      this.contactForm.reset();
      formDirective.resetForm();
    });
  }
}
