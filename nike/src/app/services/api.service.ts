import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options= {
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }


  //api call to login
  login(email:any,pswd:any){
    const body = {
      email,
      pswd
    }

     return this.http.post('http://localhost:3000/login',body)
  }


      // api call to register

      register(email:any,pswd:any,uname:any){
        const body = {
          email,
          pswd,
          uname
        }
    
         return this.http.post('http://localhost:3000/register',body)
      }

          //function to append token in the request headers

    appendToken(){
      const token = localStorage.getItem("token")
      let headers = new HttpHeaders()

      if(token){
        headers = headers.append('x-access-token',token)
        options.headers = headers
      }
      return options
    }
  
}
