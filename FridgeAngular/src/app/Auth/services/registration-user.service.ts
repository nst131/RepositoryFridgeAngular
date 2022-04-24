import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, of, catchError } from "rxjs";
import { RegistrationUserModel } from "../models/registrationUser.model";

@Injectable()
export class RegistrationUserService {
    private pathRegistrationUser: string = "https://localhost:5002/api/Auth/Registration"

    constructor(private http: HttpClient) { }

    public tryRegistrationUser(registraoinModel: RegistrationUserModel): Observable<any> {
        const myheaders = new HttpHeaders().set('content-type', 'application/json');
        const body = JSON.stringify(registraoinModel);
        return this.http.post(this.pathRegistrationUser, body, { headers: myheaders }).pipe(map((data: any) => {
            let user = {
                token: data.token,
                email: data.email,
                role: data.role
            }
            sessionStorage.setItem('UserSession', JSON.stringify(user));
            return of({
                error: false,
                response: data.response
            });
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