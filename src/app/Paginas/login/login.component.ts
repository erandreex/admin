import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Servicios/auth.service';
import { PreferenciasService } from '../../Servicios/preferencias.service';
declare let $: any;

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

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private preferenciasService: PreferenciasService
    ) {}

    login() {
        this.load = true;
        const { credencial, password } = this.loginForm.value;

        this.authService.login(credencial, password).subscribe((resp) => {
            if (resp.ok) {
                this.preferenciasService.cambioPreferencia(resp.respuesta.tema);

                this.router.navigateByUrl('/');
            } else {
                this.load = false;
                this.error = resp.mensaje;
            }
        });
    }

    ngAfterViewInit(): void {
        $('.modal').modal('hide');
    }

    ngOnDestroy(): void {
        this.load = false;
    }
}
