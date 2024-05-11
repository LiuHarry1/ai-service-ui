import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ai_similar_email_finder_host} from "../app-config";
import {EmailPopupComponent} from "../email-popup/email-popup.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Table} from "primeng/table";


@Component({
  selector: 'app-user-query-email-dashboard',
  templateUrl: './user-query-email-dashboard.component.html',
  styleUrls: ['./user-query-email-dashboard.component.css']
})
export class UserQueryEmailDashboardComponent implements OnInit {
  userQueryData: any[] = [];
  detailsData: any[] = [];
  selectedRow: any;
  isLoading: boolean = false;
  inputData: any = {};
    selected_email_id: string;
  showDetails: boolean = false; // Flag to control details table visibility
    labelDialog: boolean =false;
    searchValue: string = ''
    category_names: any[] = [
        { label: 'Announcement', value: 'Announcement' },
        { label: 'EP', value: 'EP' },
        { label: 'Alert', value: 'Alert' },
        { label: 'EC', value: 'EC' },
        { label: 'Payment', value: 'Payment' },
        { label: 'Settlement', value: 'Settlement' },
        { label: 'UI', value: 'UI' },
        { label: 'Feeds', value: 'Feeds' },
        { label: 'Env', value: 'Env' },
        { label: 'Reengineering', value: 'Reengineering' },
    ];
    selected_category_name: string = ""
    fromDate: Date = new Date();
    minDate: Date = new Date();
    maxDate: Date = new Date();
    toDate: Date = new Date();
    @ViewChild('dt') table: Table | undefined;

  constructor(private http: HttpClient,  public dialog: MatDialog) { }

  ngOnInit(): void {

      this.minDate.setDate(this.minDate.getDate()-45)
      this.fromDate.setDate(this.fromDate.getDate()-5)
      this.loadData();
  }



  loadData() {
    this.http.post<any>(ai_similar_email_finder_host+'/get_user_query_emails', { from_date: this.fromDate, to_date: this.toDate }).subscribe((result) => {
      this.userQueryData = result;
    });
  }

  rowClick(row: any) {
    console.info("clicked row:"+ row)
    this.selectedRow = row;
    this.showDetails = true; // Show details table
    this.http.post<any>(ai_similar_email_finder_host+'/get_user_emails_by_category', { category_name: row.category_name, from_date: this.fromDate, to_date: this.toDate }).subscribe((details) => {
      this.detailsData = details;
    });
  }


  openEmailPopup(email: any): void {

    this.inputData['pk_email_id'] = `${email['pk_email_id']}`
    console.info("inputdata", this.inputData)
    this.isLoading = true;
    // this.http.post<any>(host+`/get_email`, this.inputData)
    this.http.post<any>(ai_similar_email_finder_host+`/get_html_email_v2`, this.inputData)
        .subscribe(data => {
          console.info("invoking search method", data)
          email['whole_email_chain']= data.wholeEmailchain;
          console.info("invoking search method", email)
          // Handle the prediction result as needed
          this.isLoading = false;
          const dialogRef = this.dialog.open(EmailPopupComponent, {
            width: '600px',
            data: email
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('The email popup was closed');
            // Add logic here if needed after closing the popup
          });

        }, error => {
          console.error('Error occurred:', error);
          this.isLoading = false;
        });


  }

    labelData(email: any, category_name: any) {
        this.selected_email_id = `${email['pk_email_id']}`
        this.selected_category_name = category_name
        this.labelDialog = true
        console.log("labeling email id:" + this.inputData['pk_email_id'] + ", category name :"+ this.inputData['category_name'])
    }

    save(){
        console.log("saving email_id :"+this.selected_email_id+" as " + this.selected_category_name)

        this.http.post<any>(ai_similar_email_finder_host+'/label_email', { pk_email_id: this.selected_email_id,  category_name:this.selected_category_name }).subscribe((result) => {
            console.log("The result of saving labeled data : "+result);
        }, error => {
            console.error('Error occurred:', error);

        });
        this.labelDialog= false

    }

    hideDialog(){
        this.labelDialog= false
        console.log("hideDialog().....")
    }

    onBlurMethod($event: Event) {
        console.log("onBlurMethod().....")
        this.loadData();
    }

    applyFilterGlobal($event: any, stringVal: any) {
       let searchValue =  ($event.target as HTMLInputElement).value
       console.log("applyFilterGlobal..." + stringVal + ".."+searchValue)
        this.table!.filterGlobal(searchValue, stringVal);
    }
}
