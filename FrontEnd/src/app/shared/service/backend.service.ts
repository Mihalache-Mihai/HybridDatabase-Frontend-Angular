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

getMedicineMongoByID(medicineID:number){
  return this.http.get<any>(ApiUrl.serverUrl+ApiUrl.medicineMongoUrl+"byID/"+medicineID.toString())
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

updateMedicine(id:number,name:string, stock:number, companyName:string){
  var company=new Company();
  company.companyName=companyName;
  const bodyDict = {
    'name': name,
    'company':company,
    'stock':stock,
}
  return this.http.put<any>(ApiUrl.serverUrl+ ApiUrl.medicineUrl+id, JSON.stringify(bodyDict))
      .pipe(map(response=>{
          if(response){
            console.log(response);
            return response;
          }
          return null;
      }))
}

deleteMedicine(id:number){
  return this.http.delete<any>(ApiUrl.serverUrl+ApiUrl.medicineUrl+id)
      .pipe(map(response=>{
        if(response){
          console.log(response);
          return response;
        }
        return null;
      }))
}

//prescriptions
addPrescription(series:string, locality:string, county:string,CNP:string, name:string, residence:string, diagnosis:string, medicines:string){

  const bodyDict = {
    'series':series,
    'locality': locality,
    'county':county,
    'CNP':CNP,
    'name':name,
    'residence':residence,
    'diagnosis':diagnosis,
    'medicines':medicines,
}
  return this.http.post<any>(ApiUrl.serverUrl+ ApiUrl.prescriptionUrl, JSON.stringify(bodyDict))
      .pipe(map(response=>{
          if(response){
            console.log(response);
            return response;
          }
      }))
}

updatePrescription( series:string, locality:string, county:string,CNP:string, name:string, residence:string, diagnosis:string, medicines:string){

  const bodyDict = {
    'series':series,
    'locality': locality,
    'county':county,
    'CNP':CNP,
    'name':name,
    'residence':residence,
    'diagnosis':diagnosis,
    'medicines':medicines,
}
  return this.http.put<any>(ApiUrl.serverUrl+ ApiUrl.prescriptionUrl+series, JSON.stringify(bodyDict))
      .pipe(map(response=>{
          if(response){
            console.log(response);
            return response;
          }
      }))
}


deletePrescription(series:string){
  return this.http.delete<any>(ApiUrl.serverUrl+ApiUrl.prescriptionUrl+series)
      .pipe(map(response=>{
        if(response){
          console.log(response);
          return response;
        }
        return null;
      }))
}

getPrescriptions(value:string){
  return this.http.get<any>(ApiUrl.serverUrl+ApiUrl.prescriptionUrl+value)
        .pipe(map(response=>{
          if(response){
            return response;
          }
          return null;
        }))
}

getPrescriptionBySeries(series:string){
  return this.http.get<any>(ApiUrl.serverUrl+ApiUrl.prescriptionUrl+"bySeries/"+series)
        .pipe(map(response=>{
          if(response){
            console.log(response);
            return response;
          }
          return null;
        }))
}

///companies
addCompany(cui:string,companyName:string){

  const bodyDict = {
    'cui': cui,
    'companyName':companyName,
}
  return this.http.post<any>(ApiUrl.serverUrl+ ApiUrl.companyUrl, JSON.stringify(bodyDict))
      .pipe(map(response=>{
          if(response){
            console.log(response);
            return response;
          }
      }))
}

updateCompany(id:number,cui:string,companyName:string){
  const bodyDict = {
    'cui': cui,
    'companyName':companyName,
}
  return this.http.put<any>(ApiUrl.serverUrl+ ApiUrl.companyUrl+"byID/"+id, JSON.stringify(bodyDict))
      .pipe(map(response=>{
          if(response){
            console.log(response);
            return response;
          }
          return null;
      }))
}

deleteCompany(id:number){
  return this.http.delete<any>(ApiUrl.serverUrl+ApiUrl.companyUrl+id)
      .pipe(map(response=>{
        if(response){
          console.log(response);
          return response;
        }
        return null;
      }))
}


getCompaniesForCompanyModule(value:string){
  return this.http.get<any>(ApiUrl.serverUrl+ApiUrl.companyUrl+value)
      .pipe(map(response=>{
          if(response){
              return response;
          }
          return null;
      }))
}

getCompanyByID(companyID:number){
  return this.http.get<any>(ApiUrl.serverUrl+ApiUrl.companyUrl+"byID/"+companyID.toString())
        .pipe(map(response=>{
          if(response){
            console.log(response);
            return response;
          }
          return null;
        }))
}

//queries

  executeCompanyQuery(){
    return this.http.get<any>(ApiUrl.serverUrl+ApiUrl.medicineUrl+"findAllBy/"+ApiUrl.CUI.toString())
        .pipe(map(response=>{
          if(response){
            console.log(response);
            return response;
          }
          return null;
        }))
  }

  executeEmployeeQuery(){
    return this.http.get<any>(ApiUrl.serverUrl+ApiUrl.employeeUrl+"findBy/"+ApiUrl.username.toString())
    .pipe(map(response=>{
      if(response){
        console.log(response);
        return response;
      }
      return null;
    }))
  }

  executeMedicineMongoQuery(){
    return this.http.get<any>(ApiUrl.serverUrl+ApiUrl.medicineMongoUrl+ApiUrl.medicineMongoName+ApiUrl.medicineMongoStock.toString())
        .pipe(map(response=>{
          if(response){
            console.log(response);
            return response;
          }
          return null;
        }))
  }

  executePrescriptionQuery(){
    //by name and stock
    return this.http.get<any>(ApiUrl.serverUrl+ApiUrl.prescriptionUrl+ApiUrl.prescriptionName+ApiUrl.prescriptionCounty)
        .pipe(map(response=>{
          if(response){
            console.log(response);
            return response;
          }
          return null;
        }))

    //only by county 
        // return this.http.get<any>(ApiUrl.serverUrl+ApiUrl.prescriptionUrl+"byName/"+ApiUrl.prescriptionName.toString())
        // .pipe(map(response=>{
        //   if(response){
        //     console.log(response);
        //     return response;
        //   }
        //   return null;
        // }))
  }


  add100kPrescriptions(){
    return this.http.get<any>(ApiUrl.serverUrl+ApiUrl.prescriptionUrl+ApiUrl.insert100k)
        .pipe(map(response=>{
          if(response){
            console.log(response);
            return response;
          }
          return null;
        }))

  }

  insert7k(){
    return this.http.get<any>(ApiUrl.serverUrl+ApiUrl.companyUrl+ApiUrl.insert7k)
        .pipe(map(response=>{
          if(response){
            console.log(response);
            return response;
          }
          return null;
        }))

  }
}
