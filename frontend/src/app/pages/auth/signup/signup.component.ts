import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.signupForm = this.fb.group(
      {
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
            Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  get passwordError(): string {
    const control = this.signupForm.get('password');
    if (!control || !control.touched || control.valid) return '';

    if (control.hasError('required')) return 'Senha é obrigatória';
    if (control.hasError('minlength')) return 'Mínimo 4 caracteres';
    if (control.hasError('maxlength')) return 'Máximo 20 caracteres';
    if (control.hasError('pattern'))
      return 'Deve conter uma letra maiúscula e um número';

    return 'Senha inválida';
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;

      const { confirmPassword, ...registerData } = this.signupForm.value;

      this.userService.register(registerData).subscribe({
        next: res => {
          this.isLoading = false;
          this.toastr.success(
            res.message || 'Usuário cadastrado com sucesso!',
            'Sucesso',
          );
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: err => {
          this.isLoading = false;
          this.toastr.error(
            err.error?.message || 'Erro ao realizar cadastro',
            'Erro',
          );
        },
      });
    }
  }
}
