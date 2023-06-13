import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface styles {
    theme: string;
    image: string;
    size: string;
    color: string;
}

export interface stylesAllowedOptions {
    theme: string[];
    image: string[];
    size: string[];
    color: string[];
}

@Injectable({
    providedIn: 'root',
})
export class EstilosService {
    public allowedStyles: stylesAllowedOptions = {
        theme: ['theme_day', 'theme_night', 'theme_navy'],
        image: ['image_ola'],
        size: ['size_small', 'size_normal', 'size_large'],
        color: ['color_red', 'color_blue', 'color_orange', 'color_green', 'color_purple'],
    };

    // Defaults
    private styleDefault: styles = {
        theme: 'theme_night',
        image: 'image_ola',
        size: 'size_normal',
        color: 'color_orange',
    };

    private changeStyles = new Subject<any>();
    changeStyles$ = this.changeStyles.asObservable();

    constructor() {}

    changeStyle(styles: styles): styles {
        this.changeStyles.next(styles);
        return styles;
    }

    get styles(): any {
        return JSON.parse(localStorage.getItem('styles')!);
    }

    private saveStyles(obj: styles) {
        localStorage.setItem('styles', JSON.stringify(obj));
    }

    get styleLogic(): styles {
        if (this.styles) {
            // Revisa si existe los keys validos y los valores permitidos.
            //Si no existe el key se lo asigna con el valor default.
            //Si no existe el valor permitido de un key. Le asigana el valor por default
            const check = this.check({ ...this.styles }, this.styleDefault);

            //Regresa un array de los keys no validos
            const notValid = this.notValidKeys({ ...check });

            //Limpia el objecto de los keys no validos
            const clean: styles = this.deleteKeysValue({ ...check }, notValid);

            //Guarda en el localStorage
            this.saveStyles(clean);
        } else {
            localStorage.setItem('styles', JSON.stringify(this.styleDefault));
        }

        return this.styles;
    }

    private check(obj: any, defaults: any): Object {
        let keysls = Object.keys(obj);

        for (const [key, value] of Object.entries(this.allowedStyles)) {
            if (!keysls.includes(key)) {
                obj[key] = defaults[key];
            } else if (obj[key] && !value.includes(obj[key])) {
                obj[key] = defaults[key];
            }
        }
        return obj;
    }

    private notValidKeys(obj: any): string[] {
        return Object.keys(obj).filter((x) => !Object.keys(this.allowedStyles).includes(x));
    }

    private deleteKeysValue(obj: any, eliminar: string[]): styles {
        eliminar.forEach((element: any) => {
            delete obj[element];
        });

        return obj;
    }

    active(style: string, option: string): styles {
        const styles = this.styles;
        styles[style] = option;
        this.saveStyles(styles);
        return this.changeStyle(this.styleLogic);
    }
}
