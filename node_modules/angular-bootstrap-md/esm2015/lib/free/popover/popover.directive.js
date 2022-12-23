import { Directive, Input, Output, EventEmitter, Renderer2, ElementRef, ViewContainerRef, HostListener, } from '@angular/core';
import { PopoverConfig } from './popover.config';
import { ComponentLoaderFactory } from '../utils/component-loader/component-loader.factory';
import { PopoverContainerComponent } from './popover-container.component';
import { PositioningService } from '../utils/positioning/positioning.service';
/**
 * A lightweight, extensible directive for fancy popover creation.
 */
export class PopoverDirective {
    constructor(_elementRef, _renderer, _viewContainerRef, _config, cis, _positionService) {
        this._positionService = _positionService;
        this.dynamicPosition = true;
        this.outsideClick = false;
        this.popoverDisabled = false;
        this._popover = cis
            .createLoader(_elementRef, _viewContainerRef, _renderer)
            .provide({ provide: PopoverConfig, useValue: _config });
        Object.assign(this, _config);
        this.onShown = this._popover.onShown;
        this.shown = this._popover.onShown;
        this.onHidden = this._popover.onHidden;
        this.hidden = this._popover.onHidden;
    }
    /**
     * Returns whether or not the popover is currently being shown
     */
    get isOpen() {
        return this._popover.isShown;
    }
    set isOpen(value) {
        if (value) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    get hasContent() {
        if (typeof this.mdbPopover === 'string') {
            return this.mdbPopover.length > 0;
        }
        return true;
    }
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    show() {
        if (this._popover.isShown || this.popoverDisabled || !this.hasContent) {
            return;
        }
        this._positionService.setOptions({
            modifiers: {
                flip: {
                    enabled: this.dynamicPosition,
                },
                preventOverflow: {
                    enabled: this.dynamicPosition,
                },
            },
        });
        this._popover
            .attach(PopoverContainerComponent)
            .to(this.container)
            .position({ attachment: this.placement })
            .show({
            content: this.mdbPopover,
            placement: this.placement,
            title: this.mdbPopoverHeader || this.popoverTitle,
            containerClass: this.containerClass ? this.containerClass : '',
            bodyClass: this.bodyClass ? this.bodyClass : '',
            headerClass: this.headerClass ? this.headerClass : '',
        });
        this.isOpen = true;
        if (!this.dynamicPosition) {
            this._positionService.calcPosition();
            this._positionService.deletePositionElement(this._popover._componentRef.location);
        }
    }
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    hide() {
        if (this.isOpen) {
            this._popover.hide();
            this.isOpen = false;
        }
    }
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    toggle() {
        if (this.isOpen) {
            return this.hide();
        }
        this.show();
    }
    onclick(event) {
        if (this.triggers.toString().includes('focus')) {
            event.stopPropagation();
            this.show();
        }
    }
    onblur() {
        if (this.triggers.toString().includes('focus') && this.isOpen) {
            this.hide();
        }
    }
    // fix(popover): popover with outsideClick='true' will now close after clicking in document on iPad Safari
    onTouchStart(event) {
        if (this.outsideClick && !event.target.classList.contains('popover-body')) {
            this.hide();
        }
    }
    ngOnInit() {
        this._popover.listen({
            triggers: this.triggers,
            outsideClick: this.outsideClick,
            show: () => this.show(),
        });
    }
    dispose() {
        this._popover.dispose();
    }
    ngOnDestroy() {
        this._popover.dispose();
    }
}
PopoverDirective.decorators = [
    { type: Directive, args: [{ selector: '[mdbPopover]', exportAs: 'bs-mdbPopover' },] }
];
PopoverDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ViewContainerRef },
    { type: PopoverConfig },
    { type: ComponentLoaderFactory },
    { type: PositioningService }
];
PopoverDirective.propDecorators = {
    containerClass: [{ type: Input }],
    bodyClass: [{ type: Input }],
    headerClass: [{ type: Input }],
    mdbPopover: [{ type: Input }],
    mdbPopoverHeader: [{ type: Input }],
    popoverTitle: [{ type: Input }],
    placement: [{ type: Input }],
    triggers: [{ type: Input }],
    container: [{ type: Input }],
    isOpen: [{ type: Input }],
    dynamicPosition: [{ type: Input }],
    outsideClick: [{ type: Input }],
    popoverDisabled: [{ type: Input }],
    onShown: [{ type: Output }],
    shown: [{ type: Output }],
    onHidden: [{ type: Output }],
    hidden: [{ type: Output }],
    onclick: [{ type: HostListener, args: ['click', ['$event'],] }],
    onblur: [{ type: HostListener, args: ['window:click',] }],
    onTouchStart: [{ type: HostListener, args: ['document:touchstart', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWJvb3RzdHJhcC1tZC9zcmMvbGliL2ZyZWUvcG9wb3Zlci9wb3BvdmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdaLFNBQVMsRUFDVCxVQUFVLEVBRVYsZ0JBQWdCLEVBQ2hCLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFNUYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFFOUU7O0dBRUc7QUFFSCxNQUFNLE9BQU8sZ0JBQWdCO0lBOEQzQixZQUNFLFdBQXVCLEVBQ3ZCLFNBQW9CLEVBQ3BCLGlCQUFtQyxFQUNuQyxPQUFzQixFQUN0QixHQUEyQixFQUNuQixnQkFBb0M7UUFBcEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFvQjtRQXhCckMsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFDdkIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUF3Qi9CLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRzthQUNoQixZQUFZLENBQTRCLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLENBQUM7YUFDbEYsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUMxRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENB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RSxDQUFDO0lBQzFCLENBQUM7OztZQTFMRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUU7OztZQWRoRSxVQUFVO1lBRFYsU0FBUztZQUdULGdCQUFnQjtZQUdULGFBQWE7WUFDYixzQkFBc0I7WUFHdEIsa0JBQWtCOzs7NkJBT3hCLEtBQUs7d0JBQ0wsS0FBSzswQkFDTCxLQUFLO3lCQUlMLEtBQUs7K0JBSUwsS0FBSzsyQkFDTCxLQUFLO3dCQUlMLEtBQUs7dUJBS0wsS0FBSzt3QkFLTCxLQUFLO3FCQUtMLEtBQUs7OEJBYUwsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLEtBQUs7c0JBS0wsTUFBTTtvQkFDTixNQUFNO3VCQUtOLE1BQU07cUJBQ04sTUFBTTtzQkE2Rk4sWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztxQkFPaEMsWUFBWSxTQUFDLGNBQWM7MkJBTzNCLFlBQVksU0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgUmVuZGVyZXIyLFxuICBFbGVtZW50UmVmLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgSG9zdExpc3RlbmVyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvcG92ZXJDb25maWcgfSBmcm9tICcuL3BvcG92ZXIuY29uZmlnJztcbmltcG9ydCB7IENvbXBvbmVudExvYWRlckZhY3RvcnkgfSBmcm9tICcuLi91dGlscy9jb21wb25lbnQtbG9hZGVyL2NvbXBvbmVudC1sb2FkZXIuZmFjdG9yeSc7XG5pbXBvcnQgeyBDb21wb25lbnRMb2FkZXIgfSBmcm9tICcuLi91dGlscy9jb21wb25lbnQtbG9hZGVyL2NvbXBvbmVudC1sb2FkZXIuY2xhc3MnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vcG9wb3Zlci1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFBvc2l0aW9uaW5nU2VydmljZSB9IGZyb20gJy4uL3V0aWxzL3Bvc2l0aW9uaW5nL3Bvc2l0aW9uaW5nLnNlcnZpY2UnO1xuXG4vKipcbiAqIEEgbGlnaHR3ZWlnaHQsIGV4dGVuc2libGUgZGlyZWN0aXZlIGZvciBmYW5jeSBwb3BvdmVyIGNyZWF0aW9uLlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbWRiUG9wb3Zlcl0nLCBleHBvcnRBczogJ2JzLW1kYlBvcG92ZXInIH0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHVibGljIGNvbnRhaW5lckNsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBib2R5Q2xhc3M6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIGhlYWRlckNsYXNzOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBDb250ZW50IHRvIGJlIGRpc3BsYXllZCBhcyBwb3BvdmVyLlxuICAgKi9cbiAgQElucHV0KCkgcHVibGljIG1kYlBvcG92ZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG4gIC8qKlxuICAgKiBUaXRsZSBvZiBhIHBvcG92ZXIuXG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgbWRiUG9wb3ZlckhlYWRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgcG9wb3ZlclRpdGxlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBQbGFjZW1lbnQgb2YgYSBwb3BvdmVyLiBBY2NlcHRzOiBcInRvcFwiLCBcImJvdHRvbVwiLCBcImxlZnRcIiwgXCJyaWdodFwiXG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgcGxhY2VtZW50OiAndG9wJyB8ICdib3R0b20nIHwgJ2xlZnQnIHwgJ3JpZ2h0JztcbiAgLyoqXG4gICAqIFNwZWNpZmllcyBldmVudHMgdGhhdCBzaG91bGQgdHJpZ2dlci4gU3VwcG9ydHMgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZlxuICAgKiBldmVudCBuYW1lcy5cbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyB0cmlnZ2Vyczogc3RyaW5nO1xuICAvKipcbiAgICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSBwb3BvdmVyIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cbiAgICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgXCJib2R5XCIuXG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgY29udGFpbmVyOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHBvcG92ZXIgaXMgY3VycmVudGx5IGJlaW5nIHNob3duXG4gICAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcG9wb3Zlci5pc1Nob3duO1xuICB9XG5cbiAgcHVibGljIHNldCBpc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBkeW5hbWljUG9zaXRpb24gPSB0cnVlO1xuICBASW5wdXQoKSBvdXRzaWRlQ2xpY2sgPSBmYWxzZTtcbiAgQElucHV0KCkgcG9wb3ZlckRpc2FibGVkID0gZmFsc2U7XG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBwb3BvdmVyIGlzIHNob3duXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCkgcHVibGljIG9uU2hvd246IEV2ZW50RW1pdHRlcjxhbnk+O1xuICBAT3V0cHV0KCkgcHVibGljIHNob3duOiBFdmVudEVtaXR0ZXI8YW55PjtcbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIHBvcG92ZXIgaXMgaGlkZGVuXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCkgcHVibGljIG9uSGlkZGVuOiBFdmVudEVtaXR0ZXI8YW55PjtcbiAgQE91dHB1dCgpIHB1YmxpYyBoaWRkZW46IEV2ZW50RW1pdHRlcjxhbnk+O1xuXG4gIHByaXZhdGUgX3BvcG92ZXI6IENvbXBvbmVudExvYWRlcjxQb3BvdmVyQ29udGFpbmVyQ29tcG9uZW50PjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgX2NvbmZpZzogUG9wb3ZlckNvbmZpZyxcbiAgICBjaXM6IENvbXBvbmVudExvYWRlckZhY3RvcnksXG4gICAgcHJpdmF0ZSBfcG9zaXRpb25TZXJ2aWNlOiBQb3NpdGlvbmluZ1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5fcG9wb3ZlciA9IGNpc1xuICAgICAgLmNyZWF0ZUxvYWRlcjxQb3BvdmVyQ29udGFpbmVyQ29tcG9uZW50PihfZWxlbWVudFJlZiwgX3ZpZXdDb250YWluZXJSZWYsIF9yZW5kZXJlcilcbiAgICAgIC5wcm92aWRlKHsgcHJvdmlkZTogUG9wb3ZlckNvbmZpZywgdXNlVmFsdWU6IF9jb25maWcgfSk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBfY29uZmlnKTtcbiAgICB0aGlzLm9uU2hvd24gPSB0aGlzLl9wb3BvdmVyLm9uU2hvd247XG4gICAgdGhpcy5zaG93biA9IHRoaXMuX3BvcG92ZXIub25TaG93bjtcbiAgICB0aGlzLm9uSGlkZGVuID0gdGhpcy5fcG9wb3Zlci5vbkhpZGRlbjtcbiAgICB0aGlzLmhpZGRlbiA9IHRoaXMuX3BvcG92ZXIub25IaWRkZW47XG4gIH1cblxuICBnZXQgaGFzQ29udGVudCgpOiBib29sZWFuIHtcbiAgICBpZiAodHlwZW9mIHRoaXMubWRiUG9wb3ZlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aGlzLm1kYlBvcG92ZXIubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBhbiBlbGVtZW504oCZcyBwb3BvdmVyLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDigJxtYW51YWzigJ0gdHJpZ2dlcmluZyBvZlxuICAgKiB0aGUgcG9wb3Zlci5cbiAgICovXG4gIHB1YmxpYyBzaG93KCk6IHZvaWQgfCBhbnkge1xuICAgIGlmICh0aGlzLl9wb3BvdmVyLmlzU2hvd24gfHwgdGhpcy5wb3BvdmVyRGlzYWJsZWQgfHwgIXRoaXMuaGFzQ29udGVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3Bvc2l0aW9uU2VydmljZS5zZXRPcHRpb25zKHtcbiAgICAgIG1vZGlmaWVyczoge1xuICAgICAgICBmbGlwOiB7XG4gICAgICAgICAgZW5hYmxlZDogdGhpcy5keW5hbWljUG9zaXRpb24sXG4gICAgICAgIH0sXG4gICAgICAgIHByZXZlbnRPdmVyZmxvdzoge1xuICAgICAgICAgIGVuYWJsZWQ6IHRoaXMuZHluYW1pY1Bvc2l0aW9uLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMuX3BvcG92ZXJcbiAgICAgIC5hdHRhY2goUG9wb3ZlckNvbnRhaW5lckNvbXBvbmVudClcbiAgICAgIC50byh0aGlzLmNvbnRhaW5lcilcbiAgICAgIC5wb3NpdGlvbih7IGF0dGFjaG1lbnQ6IHRoaXMucGxhY2VtZW50IH0pXG4gICAgICAuc2hvdyh7XG4gICAgICAgIGNvbnRlbnQ6IHRoaXMubWRiUG9wb3ZlcixcbiAgICAgICAgcGxhY2VtZW50OiB0aGlzLnBsYWNlbWVudCxcbiAgICAgICAgdGl0bGU6IHRoaXMubWRiUG9wb3ZlckhlYWRlciB8fCB0aGlzLnBvcG92ZXJUaXRsZSxcbiAgICAgICAgY29udGFpbmVyQ2xhc3M6IHRoaXMuY29udGFpbmVyQ2xhc3MgPyB0aGlzLmNvbnRhaW5lckNsYXNzIDogJycsXG4gICAgICAgIGJvZHlDbGFzczogdGhpcy5ib2R5Q2xhc3MgPyB0aGlzLmJvZHlDbGFzcyA6ICcnLFxuICAgICAgICBoZWFkZXJDbGFzczogdGhpcy5oZWFkZXJDbGFzcyA/IHRoaXMuaGVhZGVyQ2xhc3MgOiAnJyxcbiAgICAgIH0pO1xuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcblxuICAgIGlmICghdGhpcy5keW5hbWljUG9zaXRpb24pIHtcbiAgICAgIHRoaXMuX3Bvc2l0aW9uU2VydmljZS5jYWxjUG9zaXRpb24oKTtcbiAgICAgIHRoaXMuX3Bvc2l0aW9uU2VydmljZS5kZWxldGVQb3NpdGlvbkVsZW1lbnQodGhpcy5fcG9wb3Zlci5fY29tcG9uZW50UmVmLmxvY2F0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIGFuIGVsZW1lbnTigJlzIHBvcG92ZXIuIFRoaXMgaXMgY29uc2lkZXJlZCBhIOKAnG1hbnVhbOKAnSB0cmlnZ2VyaW5nIG9mXG4gICAqIHRoZSBwb3BvdmVyLlxuICAgKi9cbiAgcHVibGljIGhpZGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLl9wb3BvdmVyLmhpZGUoKTtcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgYW4gZWxlbWVudOKAmXMgcG9wb3Zlci4gVGhpcyBpcyBjb25zaWRlcmVkIGEg4oCcbWFudWFs4oCdIHRyaWdnZXJpbmcgb2ZcbiAgICogdGhlIHBvcG92ZXIuXG4gICAqL1xuICBwdWJsaWMgdG9nZ2xlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgcmV0dXJuIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIHRoaXMuc2hvdygpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKSBvbmNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAodGhpcy50cmlnZ2Vycy50b1N0cmluZygpLmluY2x1ZGVzKCdmb2N1cycpKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpjbGljaycpIG9uYmx1cigpIHtcbiAgICBpZiAodGhpcy50cmlnZ2Vycy50b1N0cmluZygpLmluY2x1ZGVzKCdmb2N1cycpICYmIHRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICAvLyBmaXgocG9wb3Zlcik6IHBvcG92ZXIgd2l0aCBvdXRzaWRlQ2xpY2s9J3RydWUnIHdpbGwgbm93IGNsb3NlIGFmdGVyIGNsaWNraW5nIGluIGRvY3VtZW50IG9uIGlQYWQgU2FmYXJpXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OnRvdWNoc3RhcnQnLCBbJyRldmVudCddKSBvblRvdWNoU3RhcnQoZXZlbnQ6IGFueSkge1xuICAgIGlmICh0aGlzLm91dHNpZGVDbGljayAmJiAhZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncG9wb3Zlci1ib2R5JykpIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiBhbnkge1xuICAgIHRoaXMuX3BvcG92ZXIubGlzdGVuKHtcbiAgICAgIHRyaWdnZXJzOiB0aGlzLnRyaWdnZXJzLFxuICAgICAgb3V0c2lkZUNsaWNrOiB0aGlzLm91dHNpZGVDbGljayxcbiAgICAgIHNob3c6ICgpID0+IHRoaXMuc2hvdygpLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5fcG9wb3Zlci5kaXNwb3NlKCk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogYW55IHtcbiAgICB0aGlzLl9wb3BvdmVyLmRpc3Bvc2UoKTtcbiAgfVxufVxuIl19