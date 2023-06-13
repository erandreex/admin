import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appSidebarSelection]',
})
export class SidebarSelectionDirective {
    constructor(private _element: ElementRef, private _renderer2: Renderer2) {}

    @HostListener('click', ['$event']) onClick(e: any) {
        const subMenu: HTMLLinkElement = this._element.nativeElement.querySelector('.sub-menu');
        const menu: HTMLLinkElement = this._renderer2.parentNode(subMenu);

        if (e.target.classList.contains('has-arrow') && subMenu.classList.contains('show-menu')) {
            this._renderer2.removeClass(subMenu, 'show-menu');
            this._renderer2.removeClass(menu, 'menu-active');

            this._renderer2.setStyle(subMenu, 'height', '0px');
            return;
        }

        if (!subMenu.classList.contains('show-menu')) {
            this._renderer2.addClass(subMenu, 'show-menu');
            this._renderer2.addClass(menu, 'menu-active');
            this._renderer2.setStyle(subMenu, 'height', subMenu.scrollHeight + 'px');
        }
    }
}
