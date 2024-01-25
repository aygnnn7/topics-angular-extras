import { ErrorHandler } from "@angular/core";

export class CustomErrorHanlder implements ErrorHandler{
    handleError(error: any): void {
        console.log(error.message);
    }  
}