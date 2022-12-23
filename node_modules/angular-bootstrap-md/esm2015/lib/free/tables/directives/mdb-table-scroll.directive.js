import { Directive, ElementRef, Renderer2, Input } from '@angular/core';
export class MdbTableScrollDirective {
    constructor(renderer, el) {
        this.renderer = renderer;
        this.el = el;
        this.scrollY = false;
        this.maxHeight = null;
        this.scrollX = false;
        this.maxWidth = null;
    }
    wrapTableWithVerticalScrollingWrapper(tableWrapper) {
        this.renderer.setStyle(tableWrapper, 'max-height', this.maxHeight + 'px');
        this.renderer.setStyle(tableWrapper, 'overflow-y', 'auto');
        this.renderer.setStyle(tableWrapper, 'display', 'block');
    }
    wrapTableWithHorizontalScrollingWrapper(tableWrapper) {
        this.renderer.setStyle(tableWrapper, 'max-width', this.maxWidth + 'px');
        this.renderer.setStyle(tableWrapper, 'overflow-x', 'auto');
        this.renderer.setStyle(tableWrapper, 'display', 'block');
    }
    wrapTableWithHorizontalAndVerticalScrollingWrapper(tableWrapper) {
        this.renderer.setStyle(tableWrapper, 'max-height', this.maxHeight + 'px');
        this.renderer.setStyle(tableWrapper, 'max-width', this.maxWidth + 'px');
        this.renderer.setStyle(tableWrapper, 'overflow-x', 'auto');
        this.renderer.setStyle(tableWrapper, 'display', 'block');
    }
    ngOnInit() {
        const parent = this.el.nativeElement.parentNode;
        const tableWrapper = this.renderer.createElement('div');
        if (this.scrollY && this.scrollX && this.maxHeight && this.maxWidth) {
            this.wrapTableWithHorizontalAndVerticalScrollingWrapper(tableWrapper);
        }
        if (this.scrollY && this.maxHeight) {
            this.wrapTableWithVerticalScrollingWrapper(tableWrapper);
        }
        if (this.scrollX && this.maxWidth) {
            this.wrapTableWithHorizontalScrollingWrapper(tableWrapper);
        }
        this.renderer.insertBefore(parent, tableWrapper, this.el.nativeElement);
        this.renderer.removeChild(parent, this.el.nativeElement);
        this.renderer.appendChild(tableWrapper, this.el.nativeElement);
    }
}
MdbTableScrollDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mdbTableScroll]',
            },] }
];
MdbTableScrollDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
MdbTableScrollDirective.propDecorators = {
    scrollY: [{ type: Input }],
    maxHeight: [{ type: Input }],
    scrollX: [{ type: Input }],
    maxWidth: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLXRhYmxlLXNjcm9sbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWJvb3RzdHJhcC1tZC9zcmMvbGliL2ZyZWUvdGFibGVzL2RpcmVjdGl2ZXMvbWRiLXRhYmxlLXNjcm9sbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUtoRixNQUFNLE9BQU8sdUJBQXVCO0lBT2xDLFlBQW9CLFFBQW1CLEVBQVUsRUFBYztRQUEzQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQU50RCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGNBQVMsR0FBUSxJQUFJLENBQUM7UUFFdEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixhQUFRLEdBQVEsSUFBSSxDQUFDO0lBRW9DLENBQUM7SUFFbkUscUNBQXFDLENBQUMsWUFBd0I7UUFDNUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsdUNBQXVDLENBQUMsWUFBd0I7UUFDOUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsa0RBQWtELENBQUMsWUFBd0I7UUFDekUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7UUFDaEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEQsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ25FLElBQUksQ0FBQyxrREFBa0QsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN2RTtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUMxRDtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pDLElBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUM1RDtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNqRSxDQUFDOzs7WUFsREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7YUFDN0I7OztZQUorQixTQUFTO1lBQXJCLFVBQVU7OztzQkFNM0IsS0FBSzt3QkFDTCxLQUFLO3NCQUVMLEtBQUs7dUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZGJUYWJsZVNjcm9sbF0nLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJUYWJsZVNjcm9sbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHNjcm9sbFkgPSBmYWxzZTtcbiAgQElucHV0KCkgbWF4SGVpZ2h0OiBhbnkgPSBudWxsO1xuXG4gIEBJbnB1dCgpIHNjcm9sbFggPSBmYWxzZTtcbiAgQElucHV0KCkgbWF4V2lkdGg6IGFueSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gIHdyYXBUYWJsZVdpdGhWZXJ0aWNhbFNjcm9sbGluZ1dyYXBwZXIodGFibGVXcmFwcGVyOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0YWJsZVdyYXBwZXIsICdtYXgtaGVpZ2h0JywgdGhpcy5tYXhIZWlnaHQgKyAncHgnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRhYmxlV3JhcHBlciwgJ292ZXJmbG93LXknLCAnYXV0bycpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGFibGVXcmFwcGVyLCAnZGlzcGxheScsICdibG9jaycpO1xuICB9XG5cbiAgd3JhcFRhYmxlV2l0aEhvcml6b250YWxTY3JvbGxpbmdXcmFwcGVyKHRhYmxlV3JhcHBlcjogRWxlbWVudFJlZikge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGFibGVXcmFwcGVyLCAnbWF4LXdpZHRoJywgdGhpcy5tYXhXaWR0aCArICdweCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGFibGVXcmFwcGVyLCAnb3ZlcmZsb3cteCcsICdhdXRvJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0YWJsZVdyYXBwZXIsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gIH1cblxuICB3cmFwVGFibGVXaXRoSG9yaXpvbnRhbEFuZFZlcnRpY2FsU2Nyb2xsaW5nV3JhcHBlcih0YWJsZVdyYXBwZXI6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRhYmxlV3JhcHBlciwgJ21heC1oZWlnaHQnLCB0aGlzLm1heEhlaWdodCArICdweCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGFibGVXcmFwcGVyLCAnbWF4LXdpZHRoJywgdGhpcy5tYXhXaWR0aCArICdweCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGFibGVXcmFwcGVyLCAnb3ZlcmZsb3cteCcsICdhdXRvJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0YWJsZVdyYXBwZXIsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICBjb25zdCB0YWJsZVdyYXBwZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgaWYgKHRoaXMuc2Nyb2xsWSAmJiB0aGlzLnNjcm9sbFggJiYgdGhpcy5tYXhIZWlnaHQgJiYgdGhpcy5tYXhXaWR0aCkge1xuICAgICAgdGhpcy53cmFwVGFibGVXaXRoSG9yaXpvbnRhbEFuZFZlcnRpY2FsU2Nyb2xsaW5nV3JhcHBlcih0YWJsZVdyYXBwZXIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNjcm9sbFkgJiYgdGhpcy5tYXhIZWlnaHQpIHtcbiAgICAgIHRoaXMud3JhcFRhYmxlV2l0aFZlcnRpY2FsU2Nyb2xsaW5nV3JhcHBlcih0YWJsZVdyYXBwZXIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNjcm9sbFggJiYgdGhpcy5tYXhXaWR0aCkge1xuICAgICAgdGhpcy53cmFwVGFibGVXaXRoSG9yaXpvbnRhbFNjcm9sbGluZ1dyYXBwZXIodGFibGVXcmFwcGVyKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLmluc2VydEJlZm9yZShwYXJlbnQsIHRhYmxlV3JhcHBlciwgdGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHBhcmVudCwgdGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRhYmxlV3JhcHBlciwgdGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgfVxufVxuIl19