import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthActivateService } from "src/app/Auth/services/auth-activate.service";
import { HeadersEnum } from "src/app/models/headers.enum";
import { User } from "./user.model";

@Injectable()
export class UserService {
    private url = "https://localhost:5001/api/User";

    constructor(private http: HttpClient) { }

    public getUserces(): Observable<Array<User>> {
        const myHeaders = new HttpHeaders().set(HeadersEnum.Authorization, AuthActivateService.getSession()?.token ?? "");
        return this.http.get<Array<User>>(this.url + '/' + 'GetAll', { headers: myHeaders });
    }

    public getUser(id: number): Observable<User> {
        const myHeaders = new HttpHeaders()
            .set("Content-Type", "application/json")
            .set(HeadersEnum.Authorization, AuthActivateService.getSession()?.token ?? "");
        return this.http.get<User>(this.url + '/' + "Get" + '/' + id, { headers: myHeaders });
    }
}