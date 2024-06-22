import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-single-expense',
  templateUrl: './single-expense.component.html',
  styles: []
})
export class SingleExpenseComponent {
  @ViewChild('childComponentTemplate') childComponentTemplate: TemplateRef<any>;
  @Input() singleExpense: any;
  @Output() handleSubExpense = new EventEmitter();
  isSubOpen = false;
  @Input() treeLevel = 1;
  paddingLeft = `0px`;
  isActionSheetOpen: boolean = false;
  actionSheetButtons = [
    {
      text: 'Add Sub Expense',
      data: {
        action: 'sub-expense',
      },
    },
    {
      text: 'Update',
      data: {
        action: 'update',
      },
    },
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ]

  ngOnInit(){
    this.paddingLeft = `${(this.treeLevel-1)*10}px`;
  }
  toggleSubExpense(){
    if (!!this.singleExpense?.sub && this.singleExpense?.sub?.length) {
      this.isSubOpen = !this.isSubOpen;
    }
  }

  handleMenuOptions(){
    this.isActionSheetOpen = true;
  }

  async closeMenuOptions(e:any){
    this.isActionSheetOpen = false;
    switch (e?.detail?.data?.action) {
      
      case "sub-expense":
          this.handleSubExpense.emit({...this.singleExpense, type: 'sub-expense'});
        break;
      case "update":
          this.handleSubExpense.emit({...this.singleExpense, type: 'update'});
        break;
      case "delete":
          this.handleSubExpense.emit({...this.singleExpense, type: 'delete'});
        break;
    
      default:
        break;
    }
  }

handleSubExpenseFromChild(e:any){
  this.handleSubExpense.emit(e);
}

  

}