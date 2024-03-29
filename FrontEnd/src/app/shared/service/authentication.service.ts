import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscriber, Subscription, Observable, of } from 'rxjs';
import { USE_VALUE } from '@angular/core/src/di/injector';


import { Employee } from '../models/Employee';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '@angular/compiler';
import { ApiUrl } from './ApiUrls';
import { Credentials } from '../models/Credentials';

@Injectable()
export class AuthenticationService {
    private JWT: string;


    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<Employee> {
        const bodyDict = {
            'username': username,
            'password': password,
        }

        return this.http.post<any>(ApiUrl.serverUrl + ApiUrl.login , JSON.stringify(bodyDict))
            .pipe(map(token => {
                // login successful if there's a jwt token in the response
                if (token) {  
                    // Decode the token
                    const helper = new JwtHelperService();
                    const decodedToken = helper.decodeToken(token);
                    
                    var user = new Employee();
                    user.Token=token;
                    user.Username=decodedToken.sub;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                   // console.log("Login was successful: ", JSON.stringify(user));
                    //console.log(token);
                    return user;
                }
            
                return null;
            }));
    }

    register(username: string, password: string, firstName: string, lastName: string, email: string, cnp: string, salary: string):any{
        var credentials= new Credentials();
        credentials.username=username;
        credentials.password=password;
        const body={ 
            'credentials':credentials, 
            'firstName':firstName,
            'lastName': lastName,
            'email':email,
            'cnp':cnp,
            'salary':salary,
        }
        console.log(body);
        // return this.http.post<Employee>(ApiUrl.serverUrl+ApiUrl.signUp,JSON.stringify(body))
        //     .pipe(map(response=>{
        //         console.log(response);
        //         if(response){
        //             var user = new Employee();
        //             user.Username=response.Username;
        //             //this.login(username,password);
        //             return user;
        //         }
        //         return null;
        //     }));
        var user=new Employee();
      

            return new Promise((resolve, reject) => {
                fetch(ApiUrl.serverUrl+ApiUrl.signUp,
                    {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json',
                        }, body: JSON.stringify(body)
                    })
                    .then(response=> {
                        console.log("response is: ",response)
                        return response.json();
                    })
                    .then(response=> { 
                           
                            user.Username=response.Username;
                            //this.login(username,password);         
                            resolve(user);
        
                    }).catch(error=>{
                        console.log(error);
                    });
                    

            });
        


        
        
    }

    logout() {
        localStorage.removeItem('currentUser');
    }



}
