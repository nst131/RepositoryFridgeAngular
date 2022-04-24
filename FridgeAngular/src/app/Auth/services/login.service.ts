import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { LoginModel } from "../models/login.model";

@Injectable()
export class loginService {
    private pathLogin: string = "https://localhost:5002/api/Auth/Login"

    constructor(private http: HttpClient) { }

    public tryLogin(loginModel: LoginModel): Observable<any> {
        const myheaders = new HttpHeaders().set('content-type', 'application/json');
        const body = JSON.stringify(loginModel);
        return this.http.post(this.pathLogin, body, { headers: myheaders }).pipe(map((data: any) => {
            let user = {
                token: data.token,
                email: data.email,
                role: data.role
            }
            sessionStorage.setItem('UserSession', JSON.stringify(user));
            return of({
                error: false,
                response: data.response
            })
        }),
            catchError((err) => {
                let message;
                let errors = err.error.errors;

                if (errors) {
                    for (var i in errors) {
                        if (errors.hasOwnProperty(i) && typeof (i) !== 'function') {
                            message = errors[i][0].split('Path')[0];
                            break;
                        }
                    }
                }
                else {
                    message = "Не правильный Login или Password";
                }

                return of({
                    error: true,
                    messageError: message
                });
            }))
    };
}