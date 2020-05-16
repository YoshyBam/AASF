import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-remove-dialog',
    templateUrl: 'remove-dialog.component.html',
    styleUrls: ['remove-dialog.component.scss']
})
export class RemoveDialogComponent {
    @Input() i;
    @Output() onHide = new EventEmitter<{ close: boolean, output: string, index}>();
    
    close() { this.onHide.emit({ close: true, output: null, index: null }); }
    yes() { this.onHide.emit({ close: true, output: "true", index: this.i }); }



}