import { NavbarService } from './navbar.service';
import { Component, ContentChildren, ElementRef, QueryList, EventEmitter, Output, Renderer2, } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
export class LinksComponent {
    constructor(_navbarService, renderer) {
        this._navbarService = _navbarService;
        this.renderer = renderer;
        this.linkClick = new EventEmitter();
    }
    ngAfterContentInit() {
        setTimeout(() => {
            this.links.forEach((link) => {
                this.renderer.listen(link.nativeElement, 'click', () => {
                    this._navbarService.setNavbarLinkClicks();
                });
            });
        }, 0);
    }
}
LinksComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'links',
                template: `
    <ng-content></ng-content>
  `
            },] }
];
LinksComponent.ctorParameters = () => [
    { type: NavbarService },
    { type: Renderer2 }
];
LinksComponent.propDecorators = {
    links: [{ type: ContentChildren, args: [RouterLinkWithHref, { read: ElementRef, descendants: true },] }],
    linkClick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1ib290c3RyYXAtbWQvc3JjL2xpYi9mcmVlL25hdmJhcnMvbGlua3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBRUwsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBU3JELE1BQU0sT0FBTyxjQUFjO0lBTXpCLFlBQW9CLGNBQTZCLEVBQVUsUUFBbUI7UUFBMUQsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBRnBFLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO0lBRW1DLENBQUM7SUFFbEYsa0JBQWtCO1FBQ2hCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQTZCLEVBQUUsRUFBRTtnQkFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFO29CQUNyRCxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQzVDLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDOzs7WUF2QkYsU0FBUyxTQUFDO2dCQUNULDhDQUE4QztnQkFDOUMsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLFFBQVEsRUFBRTs7R0FFVDthQUNGOzs7WUFuQlEsYUFBYTtZQVNwQixTQUFTOzs7b0JBWVIsZUFBZSxTQUFDLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO3dCQUczRSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmF2YmFyU2VydmljZSB9IGZyb20gJy4vbmF2YmFyLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIFF1ZXJ5TGlzdCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJMaW5rV2l0aEhyZWYgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ2xpbmtzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIExpbmtzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oUm91dGVyTGlua1dpdGhIcmVmLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gIGxpbmtzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgQE91dHB1dCgpIGxpbmtDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX25hdmJhclNlcnZpY2U6IE5hdmJhclNlcnZpY2UsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmxpbmtzLmZvckVhY2goKGxpbms6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGxpbmsubmF0aXZlRWxlbWVudCwgJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX25hdmJhclNlcnZpY2Uuc2V0TmF2YmFyTGlua0NsaWNrcygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sIDApO1xuICB9XG59XG4iXX0=