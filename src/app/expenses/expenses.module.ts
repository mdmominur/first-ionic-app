import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpensesPageRoutingModule } from './expenses-routing.module';

import { ExpensesPage } from './expenses.page';
import { AppHeaderModule } from '../shared/components/app-header/app-header.module';
import { SingleExpenseComponent } from './single-expense/single-expense.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpensesPageRoutingModule,
    AppHeaderModule,
  ],
  declarations: [ExpensesPage, SingleExpenseComponent],
  exports: [SingleExpenseComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExpensesModule {}
