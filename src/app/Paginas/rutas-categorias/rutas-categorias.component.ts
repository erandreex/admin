import { Component } from '@angular/core';
import { RutasCategoriasService } from './rutas-categorias.service';
import { ModeloRutaCategoria } from 'src/app/Modelos/ModeloRutaCategoria';

@Component({
    selector: 'app-rutas-categorias',
    templateUrl: './rutas-categorias.component.html',
    styleUrls: ['./rutas-categorias.component.css'],
})
export class RutasCategoriasComponent {
    constructor(private rutasCategoriasService: RutasCategoriasService) {}

    public rutas: ModeloRutaCategoria[] = [];

    ngOnInit(): void {
        this.rutasCategoriasService.listar().subscribe((resp) => {
            this.rutas = resp.respuesta.rutas;
        });
    }
}
