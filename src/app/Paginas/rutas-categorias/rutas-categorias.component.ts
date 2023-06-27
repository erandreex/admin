import { Component } from '@angular/core';
import { RutasCategoriasService } from './rutas-categorias.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Servicios/auth.service';
import { ModeloRutaCategoria } from './ModeloRutaCategoria';
import { delay } from 'rxjs';
declare var $: any;

@Component({
    selector: 'app-rutas-categorias',
    templateUrl: './rutas-categorias.component.html',
    styleUrls: ['./rutas-categorias.component.css'],
})
export class RutasCategoriasComponent {
    public rutasCategorias: ModeloRutaCategoria[] = [];
    public rutaCategoria: ModeloRutaCategoria | undefined;

    public mensaje: string = '';

    public banderaCargando: boolean = false;

    public formularioUsuario: FormGroup = this.fb.group({
        id: [''],
        titulo: ['titulo', Validators.required],
        ruta: ['titulo', Validators.required],
        icono: ['icono', Validators.required],
        color_1: ['color_1', Validators.required],
        color_2: ['color_2', Validators.required],
        orden: [0, Validators.required],
    });

    constructor(
        private authService: AuthService,
        private rutasCategoriasService: RutasCategoriasService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.obtenerRutasCategorias();
    }

    obtenerRutasCategorias() {
        this.rutasCategoriasService.listar().subscribe({
            next: (resp) => {
                if (resp.ok) {
                    this.rutasCategorias = resp.respuesta.rutas;
                } else {
                    console.log('Error', resp);
                }
            },
            error: (err) => console.log('Error: ', err),
            complete() {},
        });
    }

    cerrarModal(): void {
        $('#modalRutasCategorias').modal('hide');
        this.rutaCategoria = undefined;
        this.mensaje = '';
        this.obtenerRutasCategorias();
    }

    guardarRutaCategoria() {
        if (!this.authService.auth) return;

        if (this.formularioUsuario.invalid) {
            this.formularioUsuario.markAllAsTouched();
            return;
        }

        this.banderaCargando = true;
        this.rutasCategoriasService
            .crear(this.formularioUsuario.value)
            .pipe(delay(1000))
            .subscribe({
                next: (resp) => {
                    if (resp.ok) {
                        this.rutaCategoria = resp.respuesta.ruta;
                        this.mensaje = resp.mensaje;
                    } else {
                        console.log('Error', resp);
                    }
                    this.banderaCargando = false;
                },
                error: (err) => console.log('Error: ', err),
                complete() {},
            });
    }

    campoNoesValido(campo: string) {
        return this.formularioUsuario.controls[campo].errors && this.formularioUsuario.controls[campo].touched;
    }
}
