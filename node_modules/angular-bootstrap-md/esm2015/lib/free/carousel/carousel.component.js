import { ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Inject, Input, Output, PLATFORM_ID, QueryList, Renderer2, ViewEncapsulation, ChangeDetectionStrategy, } from '@angular/core';
import { isBs3 } from '../utils/ng2-bootstrap-config';
import { SlideComponent } from './slide.component';
import { CarouselConfig } from './carousel.config';
import { isPlatformBrowser } from '@angular/common';
import { LEFT_ARROW, RIGHT_ARROW } from '../utils/keyboard-navigation';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
export var Direction;
(function (Direction) {
    Direction[Direction["UNKNOWN"] = 0] = "UNKNOWN";
    Direction[Direction["NEXT"] = 1] = "NEXT";
    Direction[Direction["PREV"] = 2] = "PREV";
})(Direction || (Direction = {}));
/**
 * Base element to create carousel
 */
export class CarouselComponent {
    constructor(config, el, platformId, cdRef, renderer) {
        this.el = el;
        this.cdRef = cdRef;
        this.renderer = renderer;
        this.SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
        this._destroy$ = new Subject();
        this.destroyed = false;
        this.animationEnd = true;
        this.isBrowser = false;
        this.isControls = true;
        this.class = '';
        this.type = '';
        this.animation = '';
        this.allowSwipe = true;
        this.activeSlideChange = new EventEmitter(false);
        this.isBrowser = isPlatformBrowser(platformId);
        Object.assign(this, config);
    }
    get slides() {
        return this._slidesList.toArray();
    }
    set activeSlide(index) {
        if (this._slidesList && index !== this._currentActiveSlide) {
            this._select(index);
        }
    }
    get activeSlide() {
        return this._currentActiveSlide;
    }
    checkNavigation() {
        if (this.type === 'carousel-multi-item') {
            return false;
        }
        return true;
    }
    checkDots() {
        if (this.type === 'carousel-thumbnails') {
            return false;
        }
        return true;
    }
    getImg(slide) {
        return slide.el.nativeElement.querySelector('img').src;
    }
    get interval() {
        return this._interval;
    }
    set interval(value) {
        this._interval = value;
        this.restartTimer();
    }
    get isBs4() {
        return !isBs3();
    }
    ngOnDestroy() {
        this.destroyed = true;
        this._destroy$.next();
        this._destroy$.complete();
    }
    ngAfterViewInit() {
        this.play();
        this._slidesList.changes
            .pipe(takeUntil(this._destroy$))
            .subscribe((slidesList) => {
            this._slidesList = slidesList;
            setTimeout(() => {
                this._select(0);
            }, 0);
        });
        if (this.activeSlideIndex) {
            setTimeout(() => {
                this._select(this.activeSlideIndex);
                this.activeSlideChange.emit({ relatedTarget: this.activeSlide });
            }, 0);
        }
        else {
            setTimeout(() => {
                this._select(0);
            }, 0);
        }
        if (this.isControls) {
            this.carouselIndicators = this.el.nativeElement.querySelectorAll('.carousel-indicators > li');
            if (this.carouselIndicators.length && this.activeSlideIndex) {
                this.renderer.addClass(this.carouselIndicators[this.activeSlideIndex], 'active');
            }
            else if (this.carouselIndicators.length) {
                this.renderer.addClass(this.carouselIndicators[0], 'active');
            }
        }
    }
    swipe(action = this.SWIPE_ACTION.RIGHT) {
        if (this.allowSwipe) {
            if (action === this.SWIPE_ACTION.RIGHT) {
                this.previousSlide();
                this.cdRef.markForCheck();
            }
            if (action === this.SWIPE_ACTION.LEFT) {
                this.nextSlide();
                this.cdRef.markForCheck();
            }
        }
    }
    nextSlide(force = false) {
        this.restartTimer();
        // Start next slide, pause actual slide
        const videoList = this.el.nativeElement.getElementsByTagName('video');
        const direction = Direction.NEXT;
        const indexEl = this.findNextSlideIndex(direction, force);
        if (videoList.length > 0) {
            // Check for video carousel
            for (let i = 0; i < videoList.length; i++) {
                if (i === indexEl) {
                    videoList[i].play();
                }
                else {
                    videoList[i].pause();
                }
            }
        }
        if (this.animation === 'slide') {
            this.pause();
            this.slideAnimation(this.findNextSlideIndex(Direction.NEXT, force), Direction.NEXT);
            this.cdRef.markForCheck();
        }
        else if (this.animation === 'fade') {
            this.pause();
            this.fadeAnimation(this.findNextSlideIndex(Direction.NEXT, force), Direction.NEXT);
            this.cdRef.markForCheck();
        }
        else {
            this.activeSlide = this.findNextSlideIndex(Direction.NEXT, force);
            this.cdRef.markForCheck();
        }
        if (!this.animation) {
            this.activeSlideChange.emit({ direction: 'Next', relatedTarget: this.activeSlide });
        }
    }
    previousSlide(force = false) {
        this.restartTimer();
        // Start previous slide, pause actual slide
        const videoList = this.el.nativeElement.getElementsByTagName('video');
        const direction = Direction.PREV;
        const indexel = this.findNextSlideIndex(direction, force);
        if (videoList.length > 0) {
            // Check for video carousel
            for (let i = 0; i < videoList.length; i++) {
                if (i === indexel) {
                    videoList[i].play();
                }
                else {
                    videoList[i].pause();
                }
            }
        }
        if (this.animation === 'slide') {
            this.pause();
            this.slideAnimation(this.findNextSlideIndex(direction, force), direction);
            this.cdRef.markForCheck();
        }
        else if (this.animation === 'fade') {
            this.pause();
            this.fadeAnimation(this.findNextSlideIndex(Direction.PREV, force), Direction.PREV);
            this.cdRef.markForCheck();
        }
        else {
            this.activeSlide = this.findNextSlideIndex(Direction.PREV, force);
            this.cdRef.markForCheck();
        }
        if (!this.animation) {
            this.activeSlideChange.emit({ direction: 'Prev', relatedTarget: this.activeSlide });
        }
    }
    fadeAnimation(goToIndex, direction) {
        const goToSlide = this.slides[goToIndex];
        if (this.animationEnd) {
            this.animationEnd = false;
            goToSlide.directionNext = true;
            if (this.isBrowser) {
                setTimeout(() => {
                    const previous = this.slides[this._currentActiveSlide].el.nativeElement;
                    this.renderer.setStyle(previous, 'opacity', '0');
                    this.renderer.setStyle(previous, 'transition', 'all 600ms');
                    this.renderer.setStyle(previous, 'display', 'block');
                    this.renderer.setStyle(goToSlide.el.nativeElement, 'display', 'block');
                    this.renderer.setStyle(goToSlide.el.nativeElement, 'opacity', '1');
                    this.renderer.setStyle(goToSlide.el.nativeElement, 'transition', 'all 600ms');
                    if (direction === 1) {
                        this.activeSlideChange.emit({ direction: 'Next', relatedTarget: this.activeSlide });
                    }
                    else if (direction === 2) {
                        this.activeSlideChange.emit({ direction: 'Prev', relatedTarget: this.activeSlide });
                    }
                    goToSlide.directionNext = false;
                    this.animationEnd = true;
                    this.activeSlide = goToIndex;
                    this.activeSlideChange.emit({ direction: 'Next', relatedTarget: this.activeSlide });
                    this.play();
                    this.cdRef.markForCheck();
                }, 0);
            }
        }
    }
    slideAnimation(goToIndex, direction) {
        const currentSlide = this.slides[this._currentActiveSlide];
        const goToSlide = this.slides[goToIndex];
        if (this.animationEnd) {
            if (direction === Direction.NEXT) {
                this.animationEnd = false;
                goToSlide.directionNext = true;
                if (this.isBrowser) {
                    setTimeout(() => {
                        goToSlide.directionLeft = true;
                        currentSlide.directionLeft = true;
                        this.cdRef.markForCheck();
                    }, 100);
                }
            }
            if (direction === Direction.PREV) {
                this.animationEnd = false;
                goToSlide.directionPrev = true;
                if (this.isBrowser) {
                    setTimeout(() => {
                        goToSlide.directionRight = true;
                        currentSlide.directionRight = true;
                        this.cdRef.markForCheck();
                    }, 100);
                }
            }
            if (this.isBrowser) {
                setTimeout(() => {
                    goToSlide.directionLeft = false;
                    goToSlide.directionNext = false;
                    currentSlide.directionLeft = false;
                    currentSlide.directionNext = false;
                    goToSlide.directionRight = false;
                    goToSlide.directionPrev = false;
                    currentSlide.directionRight = false;
                    currentSlide.directionPrev = false;
                    this.animationEnd = true;
                    this.activeSlide = goToIndex;
                    let directionName;
                    if (direction === Direction.NEXT) {
                        directionName = 'Next';
                    }
                    else if (direction === Direction.PREV) {
                        directionName = 'Prev';
                    }
                    this.activeSlideChange.emit({
                        direction: directionName,
                        relatedTarget: this.activeSlide,
                    });
                    this.play();
                    this.cdRef.markForCheck();
                }, 700);
            }
        }
    }
    selectSlide(index) {
        this.pause();
        if (this.animation === 'slide') {
            if (this.activeSlide < index) {
                this.slideAnimation(index, Direction.NEXT);
            }
            else if (this.activeSlide > index) {
                this.slideAnimation(index, Direction.PREV);
            }
        }
        else if (this.animation === 'fade') {
            if (index !== this.activeSlide) {
                this.fadeAnimation(index);
            }
        }
        else if (!this.animation) {
            setTimeout(() => {
                const direction = index < this.activeSlide ? 'Prev' : 'Next';
                this._select(index);
                this.activeSlideChange.emit({
                    direction,
                    relatedTarget: this.activeSlide,
                });
            }, 0);
        }
        this.play();
    }
    play() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.restartTimer();
            this.cdRef.markForCheck();
        }
    }
    pause() {
        if (!this.noPause) {
            this.isPlaying = false;
            this.resetTimer();
            this.cdRef.markForCheck();
        }
    }
    getCurrentSlideIndex() {
        return this.slides.findIndex((slide) => slide.active);
    }
    isLast(index) {
        return index + 1 >= this.slides.length;
    }
    findNextSlideIndex(direction, force) {
        let nextSlideIndex = 0;
        if (!force && (this.isLast(this.activeSlide) && direction !== Direction.PREV && this.noWrap)) {
            return void 0;
        }
        switch (direction) {
            case Direction.NEXT:
                nextSlideIndex = !this.isLast(this._currentActiveSlide)
                    ? this._currentActiveSlide + 1
                    : !force && this.noWrap
                        ? this._currentActiveSlide
                        : 0;
                break;
            case Direction.PREV:
                nextSlideIndex =
                    this._currentActiveSlide > 0
                        ? this._currentActiveSlide - 1
                        : !force && this.noWrap
                            ? this._currentActiveSlide
                            : this.slides.length - 1;
                break;
            default:
                throw new Error('Unknown direction');
        }
        return nextSlideIndex;
    }
    _select(index) {
        if (isNaN(index)) {
            this.pause();
            return;
        }
        const currentSlide = this.slides[this._currentActiveSlide];
        if (currentSlide) {
            currentSlide.active = false;
        }
        const nextSlide = this.slides[index];
        if (nextSlide) {
            this._currentActiveSlide = index;
            nextSlide.active = true;
            this.activeSlide = index;
        }
        this.cdRef.markForCheck();
    }
    restartTimer() {
        this.resetTimer();
        if (this.isBrowser) {
            const interval = +this.interval;
            if (!isNaN(interval) && interval > 0) {
                this.currentInterval = setInterval(() => {
                    const nInterval = +this.interval;
                    if (this.isPlaying && !isNaN(this.interval) && nInterval > 0 && this.slides.length) {
                        this.nextSlide();
                    }
                    else {
                        this.pause();
                    }
                }, interval);
            }
        }
    }
    resetTimer() {
        if (this.isBrowser) {
            if (this.currentInterval) {
                clearInterval(this.currentInterval);
                this.currentInterval = void 0;
            }
        }
    }
    hasClass(el, className) {
        if (el.classList) {
            return el.classList.contains(className);
        }
        else {
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        }
    }
    classAdd(el, className) {
        if (el.classList) {
            el.classList.add(className);
        }
        else if (!this.hasClass(el, className)) {
            el.className += ' ' + className;
        }
    }
    removeClass(el, className) {
        if (el.classList) {
            el.classList.remove(className);
        }
        else if (this.hasClass(el, className)) {
            const reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    }
    keyboardControl(event) {
        if (this.keyboard) {
            // tslint:disable-next-line: deprecation
            if (event.keyCode === RIGHT_ARROW) {
                this.nextSlide();
            }
            // tslint:disable-next-line: deprecation
            if (event.keyCode === LEFT_ARROW) {
                this.previousSlide();
            }
        }
    }
    focus() {
        this.el.nativeElement.focus();
    }
}
CarouselComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-carousel',
                template: "<div\n  tabindex=\"0\"\n  (swipeleft)=\"swipe($event.type)\"\n  (swiperight)=\"swipe($event.type)\"\n  (mouseenter)=\"pause()\"\n  (mouseleave)=\"play()\"\n  (mouseup)=\"play()\"\n  class=\"carousel {{ class }} {{ type }}\"\n>\n  <div class=\"controls-top\" *ngIf=\"slides.length > 1 && !checkNavigation() && isControls\">\n    <a\n      mdbBtn\n      floating=\"true\"\n      [class.disabled]=\"activeSlide === 0 && noWrap\"\n      (click)=\"previousSlide()\"\n      ><i class=\"fas fa-chevron-left\"></i\n    ></a>\n    <a mdbBtn floating=\"true\" (click)=\"nextSlide()\" [class.disabled]=\"isLast(activeSlide) && noWrap\"\n      ><i class=\"fas fa-chevron-right\"></i\n    ></a>\n  </div>\n  <ol class=\"carousel-indicators\" *ngIf=\"slides.length > 1 && checkDots() && isControls\">\n    <li\n      *ngFor=\"let slidez of slides; let i = index\"\n      [class.active]=\"slidez.active === true\"\n      (click)=\"selectSlide(i)\"\n    ></li>\n  </ol>\n  <ol class=\"carousel-indicators\" *ngIf=\"slides.length > 1 && !checkDots() && isControls\">\n    <li\n      *ngFor=\"let slidez of slides; let i = index\"\n      [class.active]=\"slidez.active === true\"\n      (click)=\"selectSlide(i)\"\n    >\n      <img class=\"d-block w-100 img-fluid\" src=\"{{ getImg(slidez) }}\" />\n    </li>\n  </ol>\n  <div class=\"carousel-inner\"><ng-content></ng-content></div>\n  <a\n    class=\"carousel-control-prev\"\n    [class.disabled]=\"activeSlide === 0 && noWrap\"\n    (click)=\"previousSlide()\"\n    *ngIf=\"slides.length > 1 && checkNavigation() && isControls\"\n  >\n    <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n    <span class=\"sr-only\">Previous</span>\n  </a>\n  <a\n    class=\"carousel-control-next\"\n    (click)=\"nextSlide()\"\n    [class.disabled]=\"isLast(activeSlide) && noWrap\"\n    *ngIf=\"slides.length > 1 && checkNavigation() && isControls\"\n  >\n    <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n    <span class=\"sr-only\">Next</span>\n  </a>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".carousel .carousel-control-next-icon,.carousel .carousel-control-prev-icon{width:2.25rem;height:2.25rem}.carousel .carousel-indicators li{width:.625rem;height:.625rem;border-radius:50%;cursor:pointer}.carousel-fade .carousel-item{opacity:0;transition-duration:.6s;transition-property:opacity}.carousel-fade .carousel-item-next.carousel-item-left,.carousel-fade .carousel-item-prev.carousel-item-right,.carousel-fade .carousel-item.active{opacity:1}.carousel-fade .carousel-item-left.active,.carousel-fade .carousel-item-right.active{opacity:0}.carousel-fade .carousel-item-left.active,.carousel-fade .carousel-item-next,.carousel-fade .carousel-item-prev,.carousel-fade .carousel-item-prev.active,.carousel-fade .carousel-item.active{transform:translateX(0)}@supports (transform-style:preserve-3d){.carousel-fade .carousel-item-left.active,.carousel-fade .carousel-item-next,.carousel-fade .carousel-item-prev,.carousel-fade .carousel-item-prev.active,.carousel-fade .carousel-item.active{transform:translateZ(0)}}.carousel-control-next,.carousel-control-prev,.carousel-item-next,.carousel-item-prev,.carousel-item.active{display:flex;overflow:hidden}.carousel,.carousel-multi-item,.carousel-thumbnails{outline:none}.carousel-fade .carousel-inner .carousel-item{opacity:0;transition-property:opacity}.carousel-fade .carousel-inner .active{opacity:1;transition:all .6s}.carousel-fade .carousel-inner>.carousel-item.active,.carousel-fade .carousel-inner>.carousel-item.next.left,.carousel-fade .carousel-inner>.carousel-item.prev.right{opacity:1;transition:all .6s;transform:translateZ(0)}"]
            },] }
];
CarouselComponent.ctorParameters = () => [
    { type: CarouselConfig },
    { type: ElementRef },
    { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
CarouselComponent.propDecorators = {
    _slidesList: [{ type: ContentChildren, args: [SlideComponent,] }],
    noWrap: [{ type: Input }],
    noPause: [{ type: Input }],
    isControls: [{ type: Input }],
    keyboard: [{ type: Input }],
    class: [{ type: Input }],
    type: [{ type: Input }],
    animation: [{ type: Input }],
    activeSlideIndex: [{ type: Input }],
    allowSwipe: [{ type: Input }],
    activeSlideChange: [{ type: Output }],
    activeSlide: [{ type: Input }],
    interval: [{ type: Input }],
    play: [{ type: HostListener, args: ['mouseleave',] }],
    pause: [{ type: HostListener, args: ['mouseenter',] }],
    keyboardControl: [{ type: HostListener, args: ['keyup', ['$event'],] }],
    focus: [{ type: HostListener, args: ['click',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1ib290c3RyYXAtbWQvc3JjL2xpYi9mcmVlL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLHVCQUF1QixHQUN4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE1BQU0sQ0FBTixJQUFZLFNBSVg7QUFKRCxXQUFZLFNBQVM7SUFDbkIsK0NBQU8sQ0FBQTtJQUNQLHlDQUFJLENBQUE7SUFDSix5Q0FBSSxDQUFBO0FBQ04sQ0FBQyxFQUpXLFNBQVMsS0FBVCxTQUFTLFFBSXBCO0FBRUQ7O0dBRUc7QUFRSCxNQUFNLE9BQU8saUJBQWlCO0lBOEU1QixZQUNFLE1BQXNCLEVBQ1osRUFBYyxFQUNILFVBQWtCLEVBQy9CLEtBQXdCLEVBQ3hCLFFBQW1C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QUFLO3lCQUNMLEtBQUs7Z0NBRUwsTUFBTTswQkFFTixLQUFLO3VCQStCTCxLQUFLO21CQTRRTCxZQUFZLFNBQUMsWUFBWTtvQkFRekIsWUFBWSxTQUFDLFlBQVk7OEJBa0h6QixZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO29CQWNoQyxZQUFZLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGlzQnMzIH0gZnJvbSAnLi4vdXRpbHMvbmcyLWJvb3RzdHJhcC1jb25maWcnO1xuaW1wb3J0IHsgU2xpZGVDb21wb25lbnQgfSBmcm9tICcuL3NsaWRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYXJvdXNlbENvbmZpZyB9IGZyb20gJy4vY2Fyb3VzZWwuY29uZmlnJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IExFRlRfQVJST1csIFJJR0hUX0FSUk9XIH0gZnJvbSAnLi4vdXRpbHMva2V5Ym9hcmQtbmF2aWdhdGlvbic7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBlbnVtIERpcmVjdGlvbiB7XG4gIFVOS05PV04sXG4gIE5FWFQsXG4gIFBSRVYsXG59XG5cbi8qKlxuICogQmFzZSBlbGVtZW50IHRvIGNyZWF0ZSBjYXJvdXNlbFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItY2Fyb3VzZWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2Fyb3VzZWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYXJvdXNlbC1tb2R1bGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBTV0lQRV9BQ1RJT04gPSB7IExFRlQ6ICdzd2lwZWxlZnQnLCBSSUdIVDogJ3N3aXBlcmlnaHQnIH07XG5cbiAgQENvbnRlbnRDaGlsZHJlbihTbGlkZUNvbXBvbmVudCkgX3NsaWRlc0xpc3Q6IFF1ZXJ5TGlzdDxTbGlkZUNvbXBvbmVudD47XG4gIHB1YmxpYyBnZXQgc2xpZGVzKCk6IFNsaWRlQ29tcG9uZW50W10ge1xuICAgIHJldHVybiB0aGlzLl9zbGlkZXNMaXN0LnRvQXJyYXkoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICBwcm90ZWN0ZWQgY3VycmVudEludGVydmFsOiBhbnk7XG4gIHByb3RlY3RlZCBpc1BsYXlpbmc6IGJvb2xlYW47XG4gIHByb3RlY3RlZCBkZXN0cm95ZWQgPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgYW5pbWF0aW9uRW5kID0gdHJ1ZTtcbiAgcHJvdGVjdGVkIF9jdXJyZW50QWN0aXZlU2xpZGU6IG51bWJlcjtcbiAgcHJvdGVjdGVkIGNhcm91c2VsSW5kaWNhdG9yczogYW55O1xuXG4gIGlzQnJvd3NlcjogYW55ID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBub1dyYXA6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHB1YmxpYyBub1BhdXNlOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBpc0NvbnRyb2xzID0gdHJ1ZTtcbiAgQElucHV0KCkgcHVibGljIGtleWJvYXJkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBjbGFzczogU3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHB1YmxpYyB0eXBlOiBTdHJpbmcgPSAnJztcbiAgQElucHV0KCkgcHVibGljIGFuaW1hdGlvbjogU3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIGFjdGl2ZVNsaWRlSW5kZXg6IG51bWJlcjtcbiAgQElucHV0KCkgYWxsb3dTd2lwZSA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHB1YmxpYyBhY3RpdmVTbGlkZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oZmFsc2UpO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgYWN0aXZlU2xpZGUoaW5kZXg6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9zbGlkZXNMaXN0ICYmIGluZGV4ICE9PSB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUpIHtcbiAgICAgIHRoaXMuX3NlbGVjdChpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBhY3RpdmVTbGlkZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGU7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2ludGVydmFsOiBudW1iZXI7XG5cbiAgcHVibGljIGNoZWNrTmF2aWdhdGlvbigpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSAnY2Fyb3VzZWwtbXVsdGktaXRlbScpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgY2hlY2tEb3RzKCkge1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICdjYXJvdXNlbC10aHVtYm5haWxzJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldEltZyhzbGlkZTogYW55KSB7XG4gICAgcmV0dXJuIHNsaWRlLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignaW1nJykuc3JjO1xuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIGdldCBpbnRlcnZhbCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pbnRlcnZhbDtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgaW50ZXJ2YWwodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2ludGVydmFsID0gdmFsdWU7XG4gICAgdGhpcy5yZXN0YXJ0VGltZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNCczQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFpc0JzMygpO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIGNvbmZpZzogQ2Fyb3VzZWxDb25maWcsXG4gICAgcHJvdGVjdGVkIGVsOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IHN0cmluZyxcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7XG4gICAgdGhpcy5pc0Jyb3dzZXIgPSBpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvbmZpZyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgIHRoaXMuX2Rlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMucGxheSgpO1xuICAgIHRoaXMuX3NsaWRlc0xpc3QuY2hhbmdlc1xuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKHNsaWRlc0xpc3Q6IFF1ZXJ5TGlzdDxTbGlkZUNvbXBvbmVudD4pID0+IHtcbiAgICAgICAgdGhpcy5fc2xpZGVzTGlzdCA9IHNsaWRlc0xpc3Q7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX3NlbGVjdCgwKTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9KTtcblxuICAgIGlmICh0aGlzLmFjdGl2ZVNsaWRlSW5kZXgpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl9zZWxlY3QodGhpcy5hY3RpdmVTbGlkZUluZGV4KTtcbiAgICAgICAgdGhpcy5hY3RpdmVTbGlkZUNoYW5nZS5lbWl0KHsgcmVsYXRlZFRhcmdldDogdGhpcy5hY3RpdmVTbGlkZSB9KTtcbiAgICAgIH0sIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5fc2VsZWN0KDApO1xuICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNDb250cm9scykge1xuICAgICAgdGhpcy5jYXJvdXNlbEluZGljYXRvcnMgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcm91c2VsLWluZGljYXRvcnMgPiBsaScpO1xuICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxJbmRpY2F0b3JzLmxlbmd0aCAmJiB0aGlzLmFjdGl2ZVNsaWRlSW5kZXgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmNhcm91c2VsSW5kaWNhdG9yc1t0aGlzLmFjdGl2ZVNsaWRlSW5kZXhdLCAnYWN0aXZlJyk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY2Fyb3VzZWxJbmRpY2F0b3JzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuY2Fyb3VzZWxJbmRpY2F0b3JzWzBdLCAnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3dpcGUoYWN0aW9uID0gdGhpcy5TV0lQRV9BQ1RJT04uUklHSFQpIHtcbiAgICBpZiAodGhpcy5hbGxvd1N3aXBlKSB7XG4gICAgICBpZiAoYWN0aW9uID09PSB0aGlzLlNXSVBFX0FDVElPTi5SSUdIVCkge1xuICAgICAgICB0aGlzLnByZXZpb3VzU2xpZGUoKTtcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGlvbiA9PT0gdGhpcy5TV0lQRV9BQ1RJT04uTEVGVCkge1xuICAgICAgICB0aGlzLm5leHRTbGlkZSgpO1xuICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZXh0U2xpZGUoZm9yY2U6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHRoaXMucmVzdGFydFRpbWVyKCk7XG4gICAgLy8gU3RhcnQgbmV4dCBzbGlkZSwgcGF1c2UgYWN0dWFsIHNsaWRlXG4gICAgY29uc3QgdmlkZW9MaXN0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd2aWRlbycpO1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IERpcmVjdGlvbi5ORVhUO1xuICAgIGNvbnN0IGluZGV4RWwgPSB0aGlzLmZpbmROZXh0U2xpZGVJbmRleChkaXJlY3Rpb24sIGZvcmNlKTtcbiAgICBpZiAodmlkZW9MaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIENoZWNrIGZvciB2aWRlbyBjYXJvdXNlbFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2aWRlb0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGkgPT09IGluZGV4RWwpIHtcbiAgICAgICAgICB2aWRlb0xpc3RbaV0ucGxheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZpZGVvTGlzdFtpXS5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmFuaW1hdGlvbiA9PT0gJ3NsaWRlJykge1xuICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgdGhpcy5zbGlkZUFuaW1hdGlvbih0aGlzLmZpbmROZXh0U2xpZGVJbmRleChEaXJlY3Rpb24uTkVYVCwgZm9yY2UpLCBEaXJlY3Rpb24uTkVYVCk7XG4gICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hbmltYXRpb24gPT09ICdmYWRlJykge1xuICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgdGhpcy5mYWRlQW5pbWF0aW9uKHRoaXMuZmluZE5leHRTbGlkZUluZGV4KERpcmVjdGlvbi5ORVhULCBmb3JjZSksIERpcmVjdGlvbi5ORVhUKTtcbiAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSB0aGlzLmZpbmROZXh0U2xpZGVJbmRleChEaXJlY3Rpb24uTkVYVCwgZm9yY2UpO1xuICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmFuaW1hdGlvbikge1xuICAgICAgdGhpcy5hY3RpdmVTbGlkZUNoYW5nZS5lbWl0KHsgZGlyZWN0aW9uOiAnTmV4dCcsIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuYWN0aXZlU2xpZGUgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHByZXZpb3VzU2xpZGUoZm9yY2U6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIHRoaXMucmVzdGFydFRpbWVyKCk7XG4gICAgLy8gU3RhcnQgcHJldmlvdXMgc2xpZGUsIHBhdXNlIGFjdHVhbCBzbGlkZVxuICAgIGNvbnN0IHZpZGVvTGlzdCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndmlkZW8nKTtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBEaXJlY3Rpb24uUFJFVjtcbiAgICBjb25zdCBpbmRleGVsID0gdGhpcy5maW5kTmV4dFNsaWRlSW5kZXgoZGlyZWN0aW9uLCBmb3JjZSk7XG4gICAgaWYgKHZpZGVvTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBDaGVjayBmb3IgdmlkZW8gY2Fyb3VzZWxcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmlkZW9MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpID09PSBpbmRleGVsKSB7XG4gICAgICAgICAgdmlkZW9MaXN0W2ldLnBsYXkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2aWRlb0xpc3RbaV0ucGF1c2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmFuaW1hdGlvbiA9PT0gJ3NsaWRlJykge1xuICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgdGhpcy5zbGlkZUFuaW1hdGlvbih0aGlzLmZpbmROZXh0U2xpZGVJbmRleChkaXJlY3Rpb24sIGZvcmNlKSwgZGlyZWN0aW9uKTtcbiAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFuaW1hdGlvbiA9PT0gJ2ZhZGUnKSB7XG4gICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICB0aGlzLmZhZGVBbmltYXRpb24odGhpcy5maW5kTmV4dFNsaWRlSW5kZXgoRGlyZWN0aW9uLlBSRVYsIGZvcmNlKSwgRGlyZWN0aW9uLlBSRVYpO1xuICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmVTbGlkZSA9IHRoaXMuZmluZE5leHRTbGlkZUluZGV4KERpcmVjdGlvbi5QUkVWLCBmb3JjZSk7XG4gICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuYW5pbWF0aW9uKSB7XG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlQ2hhbmdlLmVtaXQoeyBkaXJlY3Rpb246ICdQcmV2JywgcmVsYXRlZFRhcmdldDogdGhpcy5hY3RpdmVTbGlkZSB9KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZmFkZUFuaW1hdGlvbihnb1RvSW5kZXg6IG51bWJlciwgZGlyZWN0aW9uPzogYW55KSB7XG4gICAgY29uc3QgZ29Ub1NsaWRlID0gdGhpcy5zbGlkZXNbZ29Ub0luZGV4XTtcblxuICAgIGlmICh0aGlzLmFuaW1hdGlvbkVuZCkge1xuICAgICAgdGhpcy5hbmltYXRpb25FbmQgPSBmYWxzZTtcblxuICAgICAgZ29Ub1NsaWRlLmRpcmVjdGlvbk5leHQgPSB0cnVlO1xuICAgICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHByZXZpb3VzID0gdGhpcy5zbGlkZXNbdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlXS5lbC5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShwcmV2aW91cywgJ29wYWNpdHknLCAnMCcpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUocHJldmlvdXMsICd0cmFuc2l0aW9uJywgJ2FsbCA2MDBtcycpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUocHJldmlvdXMsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGdvVG9TbGlkZS5lbC5uYXRpdmVFbGVtZW50LCAnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZ29Ub1NsaWRlLmVsLm5hdGl2ZUVsZW1lbnQsICdvcGFjaXR5JywgJzEnKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGdvVG9TbGlkZS5lbC5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbicsICdhbGwgNjAwbXMnKTtcblxuICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlU2xpZGVDaGFuZ2UuZW1pdCh7IGRpcmVjdGlvbjogJ05leHQnLCByZWxhdGVkVGFyZ2V0OiB0aGlzLmFjdGl2ZVNsaWRlIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAyKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlQ2hhbmdlLmVtaXQoeyBkaXJlY3Rpb246ICdQcmV2JywgcmVsYXRlZFRhcmdldDogdGhpcy5hY3RpdmVTbGlkZSB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBnb1RvU2xpZGUuZGlyZWN0aW9uTmV4dCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRW5kID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gZ29Ub0luZGV4O1xuICAgICAgICAgIHRoaXMuYWN0aXZlU2xpZGVDaGFuZ2UuZW1pdCh7IGRpcmVjdGlvbjogJ05leHQnLCByZWxhdGVkVGFyZ2V0OiB0aGlzLmFjdGl2ZVNsaWRlIH0pO1xuICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0sIDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBzbGlkZUFuaW1hdGlvbihnb1RvSW5kZXg6IG51bWJlciwgZGlyZWN0aW9uOiBhbnkpIHtcbiAgICBjb25zdCBjdXJyZW50U2xpZGUgPSB0aGlzLnNsaWRlc1t0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGVdO1xuICAgIGNvbnN0IGdvVG9TbGlkZSA9IHRoaXMuc2xpZGVzW2dvVG9JbmRleF07XG5cbiAgICBpZiAodGhpcy5hbmltYXRpb25FbmQpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5ORVhUKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uRW5kID0gZmFsc2U7XG4gICAgICAgIGdvVG9TbGlkZS5kaXJlY3Rpb25OZXh0ID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBnb1RvU2xpZGUuZGlyZWN0aW9uTGVmdCA9IHRydWU7XG4gICAgICAgICAgICBjdXJyZW50U2xpZGUuZGlyZWN0aW9uTGVmdCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlBSRVYpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25FbmQgPSBmYWxzZTtcblxuICAgICAgICBnb1RvU2xpZGUuZGlyZWN0aW9uUHJldiA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZ29Ub1NsaWRlLmRpcmVjdGlvblJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZS5kaXJlY3Rpb25SaWdodCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGdvVG9TbGlkZS5kaXJlY3Rpb25MZWZ0ID0gZmFsc2U7XG4gICAgICAgICAgZ29Ub1NsaWRlLmRpcmVjdGlvbk5leHQgPSBmYWxzZTtcbiAgICAgICAgICBjdXJyZW50U2xpZGUuZGlyZWN0aW9uTGVmdCA9IGZhbHNlO1xuICAgICAgICAgIGN1cnJlbnRTbGlkZS5kaXJlY3Rpb25OZXh0ID0gZmFsc2U7XG4gICAgICAgICAgZ29Ub1NsaWRlLmRpcmVjdGlvblJpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgZ29Ub1NsaWRlLmRpcmVjdGlvblByZXYgPSBmYWxzZTtcbiAgICAgICAgICBjdXJyZW50U2xpZGUuZGlyZWN0aW9uUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICBjdXJyZW50U2xpZGUuZGlyZWN0aW9uUHJldiA9IGZhbHNlO1xuXG4gICAgICAgICAgdGhpcy5hbmltYXRpb25FbmQgPSB0cnVlO1xuXG4gICAgICAgICAgdGhpcy5hY3RpdmVTbGlkZSA9IGdvVG9JbmRleDtcblxuICAgICAgICAgIGxldCBkaXJlY3Rpb25OYW1lO1xuICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5ORVhUKSB7XG4gICAgICAgICAgICBkaXJlY3Rpb25OYW1lID0gJ05leHQnO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uUFJFVikge1xuICAgICAgICAgICAgZGlyZWN0aW9uTmFtZSA9ICdQcmV2JztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlQ2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgZGlyZWN0aW9uOiBkaXJlY3Rpb25OYW1lLFxuICAgICAgICAgICAgcmVsYXRlZFRhcmdldDogdGhpcy5hY3RpdmVTbGlkZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9LCA3MDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RTbGlkZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5wYXVzZSgpO1xuICAgIGlmICh0aGlzLmFuaW1hdGlvbiA9PT0gJ3NsaWRlJykge1xuICAgICAgaWYgKHRoaXMuYWN0aXZlU2xpZGUgPCBpbmRleCkge1xuICAgICAgICB0aGlzLnNsaWRlQW5pbWF0aW9uKGluZGV4LCBEaXJlY3Rpb24uTkVYVCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZlU2xpZGUgPiBpbmRleCkge1xuICAgICAgICB0aGlzLnNsaWRlQW5pbWF0aW9uKGluZGV4LCBEaXJlY3Rpb24uUFJFVik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmFuaW1hdGlvbiA9PT0gJ2ZhZGUnKSB7XG4gICAgICBpZiAoaW5kZXggIT09IHRoaXMuYWN0aXZlU2xpZGUpIHtcbiAgICAgICAgdGhpcy5mYWRlQW5pbWF0aW9uKGluZGV4KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCF0aGlzLmFuaW1hdGlvbikge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IGluZGV4IDwgdGhpcy5hY3RpdmVTbGlkZSA/ICdQcmV2JyA6ICdOZXh0JztcbiAgICAgICAgdGhpcy5fc2VsZWN0KGluZGV4KTtcbiAgICAgICAgdGhpcy5hY3RpdmVTbGlkZUNoYW5nZS5lbWl0KHtcbiAgICAgICAgICBkaXJlY3Rpb24sXG4gICAgICAgICAgcmVsYXRlZFRhcmdldDogdGhpcy5hY3RpdmVTbGlkZSxcbiAgICAgICAgfSk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gICAgdGhpcy5wbGF5KCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJykgcGxheSgpIHtcbiAgICBpZiAoIXRoaXMuaXNQbGF5aW5nKSB7XG4gICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XG4gICAgICB0aGlzLnJlc3RhcnRUaW1lcigpO1xuICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJykgcGF1c2UoKSB7XG4gICAgaWYgKCF0aGlzLm5vUGF1c2UpIHtcbiAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnJlc2V0VGltZXIoKTtcbiAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldEN1cnJlbnRTbGlkZUluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc2xpZGVzLmZpbmRJbmRleCgoc2xpZGU6IFNsaWRlQ29tcG9uZW50KSA9PiBzbGlkZS5hY3RpdmUpO1xuICB9XG5cbiAgcHVibGljIGlzTGFzdChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGluZGV4ICsgMSA+PSB0aGlzLnNsaWRlcy5sZW5ndGg7XG4gIH1cblxuICBwcml2YXRlIGZpbmROZXh0U2xpZGVJbmRleChkaXJlY3Rpb246IERpcmVjdGlvbiwgZm9yY2U6IGJvb2xlYW4pOiBhbnkge1xuICAgIGxldCBuZXh0U2xpZGVJbmRleCA9IDA7XG5cbiAgICBpZiAoIWZvcmNlICYmICh0aGlzLmlzTGFzdCh0aGlzLmFjdGl2ZVNsaWRlKSAmJiBkaXJlY3Rpb24gIT09IERpcmVjdGlvbi5QUkVWICYmIHRoaXMubm9XcmFwKSkge1xuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgY2FzZSBEaXJlY3Rpb24uTkVYVDpcbiAgICAgICAgbmV4dFNsaWRlSW5kZXggPSAhdGhpcy5pc0xhc3QodGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlKVxuICAgICAgICAgID8gdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlICsgMVxuICAgICAgICAgIDogIWZvcmNlICYmIHRoaXMubm9XcmFwXG4gICAgICAgICAgPyB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGVcbiAgICAgICAgICA6IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBEaXJlY3Rpb24uUFJFVjpcbiAgICAgICAgbmV4dFNsaWRlSW5kZXggPVxuICAgICAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSA+IDBcbiAgICAgICAgICAgID8gdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlIC0gMVxuICAgICAgICAgICAgOiAhZm9yY2UgJiYgdGhpcy5ub1dyYXBcbiAgICAgICAgICAgID8gdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlXG4gICAgICAgICAgICA6IHRoaXMuc2xpZGVzLmxlbmd0aCAtIDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGRpcmVjdGlvbicpO1xuICAgIH1cbiAgICByZXR1cm4gbmV4dFNsaWRlSW5kZXg7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3QoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpc05hTihpbmRleCkpIHtcbiAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY3VycmVudFNsaWRlID0gdGhpcy5zbGlkZXNbdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlXTtcbiAgICBpZiAoY3VycmVudFNsaWRlKSB7XG4gICAgICBjdXJyZW50U2xpZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IG5leHRTbGlkZSA9IHRoaXMuc2xpZGVzW2luZGV4XTtcbiAgICBpZiAobmV4dFNsaWRlKSB7XG4gICAgICB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUgPSBpbmRleDtcbiAgICAgIG5leHRTbGlkZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgdGhpcy5hY3RpdmVTbGlkZSA9IGluZGV4O1xuICAgIH1cbiAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXN0YXJ0VGltZXIoKTogYW55IHtcbiAgICB0aGlzLnJlc2V0VGltZXIoKTtcbiAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gK3RoaXMuaW50ZXJ2YWw7XG4gICAgICBpZiAoIWlzTmFOKGludGVydmFsKSAmJiBpbnRlcnZhbCA+IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgbkludGVydmFsID0gK3RoaXMuaW50ZXJ2YWw7XG4gICAgICAgICAgaWYgKHRoaXMuaXNQbGF5aW5nICYmICFpc05hTih0aGlzLmludGVydmFsKSAmJiBuSW50ZXJ2YWwgPiAwICYmIHRoaXMuc2xpZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0U2xpZGUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgaW50ZXJ2YWwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRUaW1lcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRJbnRlcnZhbCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuY3VycmVudEludGVydmFsKTtcbiAgICAgICAgdGhpcy5jdXJyZW50SW50ZXJ2YWwgPSB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGhhc0NsYXNzKGVsOiBhbnksIGNsYXNzTmFtZTogYW55KSB7XG4gICAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gISFlbC5jbGFzc05hbWUubWF0Y2gobmV3IFJlZ0V4cCgnKFxcXFxzfF4pJyArIGNsYXNzTmFtZSArICcoXFxcXHN8JCknKSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGNsYXNzQWRkKGVsOiBhbnksIGNsYXNzTmFtZTogYW55KSB7XG4gICAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuaGFzQ2xhc3MoZWwsIGNsYXNzTmFtZSkpIHtcbiAgICAgIGVsLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHJlbW92ZUNsYXNzKGVsOiBhbnksIGNsYXNzTmFtZTogYW55KSB7XG4gICAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5oYXNDbGFzcyhlbCwgY2xhc3NOYW1lKSkge1xuICAgICAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cCgnKFxcXFxzfF4pJyArIGNsYXNzTmFtZSArICcoXFxcXHN8JCknKTtcbiAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKHJlZywgJyAnKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXl1cCcsIFsnJGV2ZW50J10pIGtleWJvYXJkQ29udHJvbChldmVudDogYW55KSB7XG4gICAgaWYgKHRoaXMua2V5Ym9hcmQpIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBSSUdIVF9BUlJPVykge1xuICAgICAgICB0aGlzLm5leHRTbGlkZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gTEVGVF9BUlJPVykge1xuICAgICAgICB0aGlzLnByZXZpb3VzU2xpZGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpIGZvY3VzKCkge1xuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG59XG4iXX0=