import { Component, HostBinding, Input, Output, EventEmitter, HostListener, ContentChildren, QueryList, ChangeDetectionStrategy, ChangeDetectorRef, } from '@angular/core';
import { state, style, trigger, transition, animate } from '@angular/animations';
import { FixedButtonCaptionDirective } from '../buttons/fixed-caption.directive';
export class CollapseComponent {
    constructor(_cdRef) {
        this._cdRef = _cdRef;
        this.isCollapsed = true;
        this.showBsCollapse = new EventEmitter();
        this.shownBsCollapse = new EventEmitter();
        this.hideBsCollapse = new EventEmitter();
        this.hiddenBsCollapse = new EventEmitter();
        this.collapsed = new EventEmitter();
        this.expanded = new EventEmitter();
        this.overflow = 'hidden';
    }
    onExpandBodyDone(event) {
        setTimeout(() => {
            if (event.toState === 'expanded') {
                this.isCollapsed = false;
                this.shownBsCollapse.emit(this);
                this.expanded.emit(this);
                this.overflow = 'visible';
                this.showCaptions();
            }
            else {
                this.isCollapsed = true;
                this.hiddenBsCollapse.emit(this);
                this.collapsed.emit(this);
            }
        }, 0);
    }
    showCaptions() {
        this.captions.forEach((caption) => caption.showCaption());
    }
    toggle() {
        this.isCollapsed ? this.show() : this.hide();
    }
    show() {
        this.expandAnimationState = 'expanded';
        this.showBsCollapse.emit(this);
        this._cdRef.markForCheck();
    }
    hide() {
        this.overflow = 'hidden';
        this.expandAnimationState = 'collapsed';
        this.hideBsCollapse.emit(this);
        this._cdRef.markForCheck();
    }
    initializeCollapseState() {
        this.isCollapsed ? this.hide() : this.show();
    }
    ngOnInit() {
        this.initializeCollapseState();
    }
}
CollapseComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[mdbCollapse]',
                exportAs: 'bs-collapse',
                template: '<ng-content></ng-content>',
                animations: [
                    trigger('expandBody', [
                        state('collapsed', style({ height: '0px' })),
                        state('expanded', style({ height: '*' })),
                        transition('expanded <=> collapsed', animate('500ms ease')),
                    ]),
                ],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
CollapseComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
CollapseComponent.propDecorators = {
    captions: [{ type: ContentChildren, args: [FixedButtonCaptionDirective,] }],
    isCollapsed: [{ type: Input }],
    showBsCollapse: [{ type: Output }],
    shownBsCollapse: [{ type: Output }],
    hideBsCollapse: [{ type: Output }],
    hiddenBsCollapse: [{ type: Output }],
    collapsed: [{ type: Output }],
    expanded: [{ type: Output }],
    expandAnimationState: [{ type: HostBinding, args: ['@expandBody',] }],
    overflow: [{ type: HostBinding, args: ['style.overflow',] }],
    onExpandBodyDone: [{ type: HostListener, args: ['@expandBody.done', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1ib290c3RyYXAtbWQvc3JjL2xpYi9mcmVlL2NvbGxhcHNlL2NvbGxhcHNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULFdBQVcsRUFDWCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEVBQ1osZUFBZSxFQUNmLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFnQmpGLE1BQU0sT0FBTyxpQkFBaUI7SUFXNUIsWUFBb0IsTUFBeUI7UUFBekIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFUcEMsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFFbEIsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2RCxvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hELG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkQscUJBQWdCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDekQsY0FBUyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xELGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUs1QixhQUFRLEdBQUcsUUFBUSxDQUFDO0lBSEgsQ0FBQztJQU1qRCxnQkFBZ0IsQ0FBQyxLQUFVO1FBQ3pCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFF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bkluaXQsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzdGF0ZSwgc3R5bGUsIHRyaWdnZXIsIHRyYW5zaXRpb24sIGFuaW1hdGUgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEZpeGVkQnV0dG9uQ2FwdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4uL2J1dHRvbnMvZml4ZWQtY2FwdGlvbi5kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1ttZGJDb2xsYXBzZV0nLFxuICBleHBvcnRBczogJ2JzLWNvbGxhcHNlJyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2V4cGFuZEJvZHknLCBbXG4gICAgICBzdGF0ZSgnY29sbGFwc2VkJywgc3R5bGUoeyBoZWlnaHQ6ICcwcHgnIH0pKSxcbiAgICAgIHN0YXRlKCdleHBhbmRlZCcsIHN0eWxlKHsgaGVpZ2h0OiAnKicgfSkpLFxuICAgICAgdHJhbnNpdGlvbignZXhwYW5kZWQgPD0+IGNvbGxhcHNlZCcsIGFuaW1hdGUoJzUwMG1zIGVhc2UnKSksXG4gICAgXSksXG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb2xsYXBzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oRml4ZWRCdXR0b25DYXB0aW9uRGlyZWN0aXZlKSBjYXB0aW9uczogUXVlcnlMaXN0PEZpeGVkQnV0dG9uQ2FwdGlvbkRpcmVjdGl2ZT47XG4gIEBJbnB1dCgpIGlzQ29sbGFwc2VkID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2hvd0JzQ29sbGFwc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc2hvd25Cc0NvbGxhcHNlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGhpZGVCc0NvbGxhcHNlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGhpZGRlbkJzQ29sbGFwc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY29sbGFwc2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGV4cGFuZGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgQEhvc3RCaW5kaW5nKCdAZXhwYW5kQm9keScpIGV4cGFuZEFuaW1hdGlvblN0YXRlOiBzdHJpbmc7XG4gIEBIb3N0QmluZGluZygnc3R5bGUub3ZlcmZsb3cnKSBvdmVyZmxvdyA9ICdoaWRkZW4nO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ0BleHBhbmRCb2R5LmRvbmUnLCBbJyRldmVudCddKVxuICBvbkV4cGFuZEJvZHlEb25lKGV2ZW50OiBhbnkpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChldmVudC50b1N0YXRlID09PSAnZXhwYW5kZWQnKSB7XG4gICAgICAgIHRoaXMuaXNDb2xsYXBzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93bkJzQ29sbGFwc2UuZW1pdCh0aGlzKTtcbiAgICAgICAgdGhpcy5leHBhbmRlZC5lbWl0KHRoaXMpO1xuICAgICAgICB0aGlzLm92ZXJmbG93ID0gJ3Zpc2libGUnO1xuICAgICAgICB0aGlzLnNob3dDYXB0aW9ucygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pc0NvbGxhcHNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuaGlkZGVuQnNDb2xsYXBzZS5lbWl0KHRoaXMpO1xuICAgICAgICB0aGlzLmNvbGxhcHNlZC5lbWl0KHRoaXMpO1xuICAgICAgfVxuICAgIH0sIDApO1xuICB9XG5cbiAgc2hvd0NhcHRpb25zKCkge1xuICAgIHRoaXMuY2FwdGlvbnMuZm9yRWFjaCgoY2FwdGlvbjogRml4ZWRCdXR0b25DYXB0aW9uRGlyZWN0aXZlKSA9PiBjYXB0aW9uLnNob3dDYXB0aW9uKCkpO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMuaXNDb2xsYXBzZWQgPyB0aGlzLnNob3coKSA6IHRoaXMuaGlkZSgpO1xuICB9XG5cbiAgc2hvdygpIHtcbiAgICB0aGlzLmV4cGFuZEFuaW1hdGlvblN0YXRlID0gJ2V4cGFuZGVkJztcblxuICAgIHRoaXMuc2hvd0JzQ29sbGFwc2UuZW1pdCh0aGlzKTtcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIHRoaXMuZXhwYW5kQW5pbWF0aW9uU3RhdGUgPSAnY29sbGFwc2VkJztcblxuICAgIHRoaXMuaGlkZUJzQ29sbGFwc2UuZW1pdCh0aGlzKTtcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGluaXRpYWxpemVDb2xsYXBzZVN0YXRlKCkge1xuICAgIHRoaXMuaXNDb2xsYXBzZWQgPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdygpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplQ29sbGFwc2VTdGF0ZSgpO1xuICB9XG59XG4iXX0=