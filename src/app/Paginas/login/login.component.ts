import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { ModeloRespuesta } from 'src/app/Modelos/ModeloRespuesta';
import { AuthService } from '../../Servicios/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    public load: boolean = false;
    public error: string = '';

    loginForm: FormGroup = this.fb.group({
        credencial: ['test1', [Validators.required, Validators.minLength(1)]],
        password: ['abcd1234', [Validators.required, Validators.minLength(1)]],
    });

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

    login() {
        this.load = true;
        const { credencial, password } = this.loginForm.value;

        this.authService.login(credencial, password).subscribe((resp: ModeloRespuesta<any>) => {
            if (resp.ok) {
                this.router.navigateByUrl('/');
            }

            if (resp.ok == false) {
                this.load = false;
                this.error = resp.mensaje;
            }
        });
    }

    ngOnDestroy(): void {
        this.load = false;
    }
}
