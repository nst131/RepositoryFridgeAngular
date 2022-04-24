import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthActivateService } from "src/app/Auth/services/auth-activate.service";
import { HeadersEnum } from "src/app/models/headers.enum";
import { CreateFridge } from "../models/create-fridge.model";
import { Fridge } from "../models/fridge.model";
import { UpdateFridge } from "../models/update-fridge.model";

@Injectable()
export class FridgeService {
    private url = "https://localhost:5001/api/Fridge";

    constructor(private http: HttpClient) { }

    public getFridgeces(): Observable<Array<Fridge>> {
        const myHeaders = new HttpHeaders().set(HeadersEnum.Authorization, AuthActivateService.getSession()?.token ?? "");
        return this.http.get<Array<Fridge>>(this.url + '/' + 'GetAll', { headers: myHeaders });
    }

    public getFridge(id: number): Observable<Fridge> {
        const myHeaders = new HttpHeaders()
            .set("Content-Type", "application/json")
            .set(HeadersEnum.Authorization, AuthActivateService.getSession()?.token ?? "");
        return this.http.get<Fridge>(this.url + '/' + "Get" + '/' + id, { headers: myHeaders });
    }

    public updateFridge(model: UpdateFridge): Observable<any> {
        const myHeaders = new HttpHeaders()
            .set("Content-Type", "application/json")
            .set(HeadersEnum.Authorization, AuthActivateService.getSession()?.token ?? "");
        const body = JSON.stringify(model);
        return this.http.put<any>(this.url + '/' + 'Update', body, { headers: myHeaders });
    }

    public createFridge(model: CreateFridge): Observable<any> {
        const myHeaders = new HttpHeaders()
            .set("Content-Type", "application/json")
            .set(HeadersEnum.Authorization, AuthActivateService.getSession()?.token ?? "");
        const body = JSON.stringify(model);
        return this.http.post<any>(this.url + '/' + 'Create', body, { headers: myHeaders });
    }

    public deleteFridge(id: number): Observable<any> {
        const myHeaders = new HttpHeaders()
            .set("Content-Type", "application/json")
            .set(HeadersEnum.Authorization, AuthActivateService.getSession()?.token ?? "");
        return this.http.delete<any>(this.url + '/' + 'Delete' + '/' + id, { headers: myHeaders });
    }
}