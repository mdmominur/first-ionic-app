import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ExpenseService } from '../services/expense.service';
import { AuthService } from '../services/auth.service';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage  {
  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;
  defaultExpanseDetails = {id: null, parentId: null, label: "", expectedAmount: null, doneAmount: null, dateTime: "", haveChild: false, user_email: this.authService?.userDetails?.email, isUpdating: false}
  expanseDetails = {...this.defaultExpanseDetails}
  allData:any = [];
  totalExpense:any = null;
  alertMessagesDefault = {isOpen: false, message: ""};
  alertMessages = {...this.alertMessagesDefault};
  selectedMonth = this.getCurrentDateTime();
  timeSelector = {open: false, date: this.getCurrentDateTime()};
  isModalOpen: boolean = false;
  addExpenseList = [
    {label: '', time: this.getCurrentDateTime(), doneAmount: null, expectedAmount: null}
  ];
  defaultAddExpenseSelectDate = {open: false, selectedExpense: {time: this.getCurrentDateTime()}};
  addExpenseSelectDate = {...this.defaultAddExpenseSelectDate};

  defaultAddMultipleExpense = {open: false, parent: {id: null}};
  addMultipleExpense = {...this.defaultAddMultipleExpense};

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.handleAlertClose();
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.handleDeleteExpense(this.expanseDetails);
      },
    },
  ];

  constructor(
    private expanseService: ExpenseService,
    private authService: AuthService,
    private generalServices: GeneralService
  ) {
    this.getExpenseData();
  }
  


  getExpenseData(){
    const dateObj = new Date(this.selectedMonth);
    // Extract the month and date
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear().toString();
    
    this.generalServices.setGlobalLoading(true);
    this.expanseService.getExpenses({month, year}).subscribe({
      next: (res:any) => {
        this.allData = res?.allData;
        this.totalExpense = res?.expenseDetails;
        this.generalServices.setGlobalLoading(false);
      },
      error: (err) => {
        this.generalServices.setGlobalLoading(false);
        this.generalServices.setGlobalToast({open: true, color: 'danger', message: err?.error?.message});
      }
    })
  }

  handleAddExpanceModalOpen(){
    this.expanseDetails.dateTime = this.getCurrentDateTime();
    this.isModalOpen = true;
  }

  handleSubExpenseAdd(data:any){    
    switch (data.type) {
      case 'sub-expense':
        // this.expanseDetails.parentId = data.id;
        // this.handleAddExpanceModalOpen();
        this.handleOpenMultipleExpense(data);
        break;
        case 'delete':
        this.expanseDetails.id = data.id;
        this.handleAlertOpen();
        break;
        case 'update':
          this.expanseDetails = {...this.expanseDetails, 
            parentId: data.parent_id,
            label: data.label,
            expectedAmount: data.expected,
            doneAmount: data.done,
            haveChild: data.haveChild,
            dateTime: this.getCurrentDateTime(data.created_at),
            isUpdating: true,
            id: data.id
          };
          this.isModalOpen = true;
          break;
      
        default:
          break;
    }
   
  }



  cancel() {
    this.isModalOpen = false;
    this.expanseDetails = {...this.defaultExpanseDetails};
  }

  confirm() {
    if(!this.expanseDetails.dateTime || 
      typeof this.expanseDetails.doneAmount !== "number" || 
      typeof this.expanseDetails.expectedAmount !== "number" || 
      !this.expanseDetails.label || 
      !this.expanseDetails.user_email
    ){
        this.generalServices.setGlobalToast({open: true, color: 'danger', message: 'All fields are required.'});
        return;
    }

    this.generalServices.setGlobalLoading(true);
    if (this.expanseDetails.isUpdating) {
      this.expanseService.updateExpense( this.expanseDetails, this.expanseDetails.id).subscribe({
        next: (res) => {
          this.generalServices.setGlobalLoading(false);
          this.isModalOpen = false;
          this.generalServices.setGlobalToast({open: true, color: 'success', message: 'Expanse successfully updated'});
          this.expanseDetails = {...this.defaultExpanseDetails};
          this.getExpenseData();
        },
        error: (err) => {
          this.generalServices.setGlobalLoading(false);
          this.generalServices.setGlobalToast({open: true, color: 'danger', message: err?.error?.message});
        }
  
  
      }); 
    } else {
      this.expanseService.createExpense(this.expanseDetails).subscribe({
        next: (res) => {
          this.generalServices.setGlobalLoading(false);
          this.isModalOpen = false;
          this.generalServices.setGlobalToast({open: true, color: 'success', message: 'Expanse successfully added'});
          this.expanseDetails = {...this.defaultExpanseDetails};
          this.getExpenseData();
        },
        error: (err) => {
          this.generalServices.setGlobalLoading(false);
          this.generalServices.setGlobalToast({open: true, color: 'danger', message: err?.error?.message});
        }
      });
      
    }
    
  }

  getCurrentDateTime(customDate:any = false, isDateOnly:boolean = false): string {
    let now = new Date();
    if(customDate){
      now = new Date(customDate);
    }
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    if(isDateOnly){
      return `${day}/${month}/${year}`;
    }
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  handleDeleteExpense(data:any){
    this.generalServices.setGlobalLoading(true);
    this.alertMessages = this.alertMessagesDefault;
    this.expanseService.deleteExpense(data.id).subscribe({
      next: (res) => {
        this.generalServices.setGlobalLoading(false);
        this.isModalOpen = false;
        this.generalServices.setGlobalToast({open: true, color: 'success', message: 'Expanse successfully deleted'});
        this.expanseDetails = {...this.defaultExpanseDetails};
        this.getExpenseData();
      },
      error: (err) => {
        this.generalServices.setGlobalLoading(false);
        this.generalServices.setGlobalToast({open: true, color: 'danger', message: err?.error?.message});
      }
    }); 
  }

  handleAlertOpen(){
    this.alertMessages = {isOpen: true, message: "Are you sure ? If you delete the expense, all the subexpenses will also be deleted."};
  }
  handleAlertClose(){
    this.alertMessages = {...this.alertMessagesDefault};
  }

  handleTimeSelectorOpen(){
    this.timeSelector = {...this.timeSelector, open: true}
  }

  handleSaveSelectedMonth(){
    this.selectedMonth = this.timeSelector.date;
    this.timeSelector = {...this.timeSelector, open: false}
    this.getExpenseData();
  }
  handleCloseSelectedMonth(){
    this.timeSelector = {open: false, date: this.getCurrentDateTime(this.selectedMonth)}
    
  }

  formatTimestamp(timestamp:any) {
    // Create a Date object from the timestamp
    const dateObj = new Date(timestamp);
    // Format the date
    const formattedDate = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    return formattedDate;
  }

  addMoreExpense(){
    this.addExpenseList.push({label: '', time: this.getCurrentDateTime(), doneAmount: null, expectedAmount: null});
  }
  removeAddExpense(expense:any){
    if (this.addExpenseList.length === 1) {
      this.generalServices.setGlobalToast({open: true, message: 'At least one expense is required.', color: 'danger'});
      return;
    }
    this.addExpenseList = this.addExpenseList.filter(exp => exp !== expense)
  }

  closeAddexpenseDateSelector(){
    this.addExpenseSelectDate = this.defaultAddExpenseSelectDate;
  }
  
  openAddexpenseDateSelector(expense:any){
    this.addExpenseSelectDate = {open: true, selectedExpense: expense};
  }

  handleSaveAddSelectedExpenseDate(){
    const newList= this.addExpenseList.map(item => {
      if(item === this.addExpenseSelectDate.selectedExpense){
        return {...item, time: this.addExpenseSelectDate.selectedExpense.time};
      }
      return item;
    });
    this.addExpenseList  = newList;
    this.closeAddexpenseDateSelector();
  }

  handleOpenMultipleExpense(parent:any = null){
    this.addMultipleExpense = {open: true, parent: parent}
  }
  handleCloseMultipleExpense(){
    this.addMultipleExpense = {...this.defaultAddMultipleExpense};
  }

  handleSaveMultipleExpense(){
    this.generalServices.setGlobalLoading(true);
    const label:any = [];
    const expectedAmount:any = [];
    const doneAmount:any = [];
    const dateTime:any = [];
    let foundError = false;
    this.addExpenseList.forEach(element => {
      label.push(element.label);
      expectedAmount.push(element.expectedAmount);
      doneAmount.push(element.doneAmount);
      dateTime.push(element.time);
      if(element.label === "" || element.expectedAmount === null || element.doneAmount === null){
        foundError = true;
      }

    });

    if(foundError){
      this.generalServices.setGlobalToast({open: true, color: 'danger', message: 'All fields are required.'});
      this.generalServices.setGlobalLoading(false);
      console.log({label: label, expectedAmount: expectedAmount, doneAmount: doneAmount, dateTime: dateTime, parentId: this.addMultipleExpense?.parent?.id});
      
      return;
    }

    const expenses = {label: label, expectedAmount: expectedAmount, doneAmount: doneAmount, dateTime: dateTime, parentId: this.addMultipleExpense?.parent?.id};

    this.expanseService.createExpenses(expenses).subscribe({
      next: (res) => {
        this.generalServices.setGlobalLoading(false);
        this.handleCloseMultipleExpense();
        this.generalServices.setGlobalToast({open: true, color: 'success', message: 'Expanses successfully added'});
        this.addExpenseList = [
          {label: '', time: this.getCurrentDateTime(), doneAmount: null, expectedAmount: null}
        ];
        this.getExpenseData();
      },
      error: (err) => {
        this.generalServices.setGlobalLoading(false);
        this.generalServices.setGlobalToast({open: true, color: 'danger', message: err?.error?.message});
      }
    });


  }
  


}
