import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';
import { Highlight } from '../../models/highlight';


@Directive({
  selector: '[appHighlighter]',
  standalone: true
})
export class HighlighterDirective implements OnInit {
  @Input() appHighlighter: Highlight[] | undefined;
  @Input() value!: string;
  private el = inject(ElementRef);
  constructor() {}
  ngOnInit(): void {
    if(this.appHighlighter) {
      this.el.nativeElement.style.lineHeight = '20px';
      this.el.nativeElement.style.padding = '5px 10px';
    }
    const highlight = this.comparer();
    if(highlight) {
      this.el.nativeElement.style.borderRadius = '5px'
      this.el.nativeElement.style.backgroundColor = highlight.backgroundColor;
      this.el.nativeElement.style.color = highlight.color;
      if(highlight.altText) {
        this.el.nativeElement.innerText = highlight.altText;
      }
    }
  }
  comparer(): Highlight | undefined {
    if(!this.appHighlighter) {
      return undefined;
    }
    const result = this.appHighlighter.find(x => (x.operation === '>' && this.value > x.value)
                                              || (x.operation === '<' && this.value < x.value)
                                              || (x.operation === '>=' && this.value >= x.value)
                                              || (x.operation === '<=' && this.value <= x.value)
                                              || (x.operation === '<>' && this.value !== x.value)
                                              || (x.operation === '=' && this.value === x.value));
    return result;
  }

}
