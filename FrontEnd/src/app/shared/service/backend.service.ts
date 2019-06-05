import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from './ApiUrls';
import { map } from 'rxjs/operators';
import { Company } from '../models/Company';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  getMedicines(value:string){
    return this.http.get<any>(ApiUrl.serverUrl+ApiUrl.medicineUrl+value)
        .pipe(map(response=>{
            if(response){
                return response;
            }
            return null;
        }))
}

getMedicinesMongo(value:string){
    return this.http.get<any>(ApiUrl.serverUrl+ApiUrl.medicineMongoUrl+value)
        .pipe(map(response=>{
            if(response){
                return response;
            }
            return null;
        }))
}

getCompanies(){
  return this.http.get<any>(ApiUrl.serverUrl+ApiUrl.companyUrl)
        .pipe(map(response=>{
          if(response){
            return response;
          }
          return null;
        }))
}

getMedicineByID(medicineID:number){
  return this.http.get<any>(ApiUrl.serverUrl+ApiUrl.medicineUrl+"byID/"+medicineID.toString())
        .pipe(map(response=>{
          if(response){
            console.log(response);
            return response;
          }
          return null;
        }))
}

addMedicine(name:string, stock:number, companyName:string){
  var company=new Company();
  company.companyName=companyName;
  const bodyDict = {
    'name': name,
    //'prospect': prospect,
    'company':company,
    'stock':stock,
}
  return this.http.post<any>(ApiUrl.serverUrl+ ApiUrl.medicineUrl, JSON.stringify(bodyDict))
      .pipe(map(response=>{
          if(response){
            console.log(response);
            return response;
          }
      }))
}
}
