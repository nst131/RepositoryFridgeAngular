import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthActivateService } from "src/app/Auth/services/auth-activate.service";
import { HeadersEnum } from "src/app/models/headers.enum";
import { FridgeModel } from "../models/fridge-model.model";

@Injectable()
export class FridgeModelService {
    private url = "https://localhost:5001/api/FridgeModel";

    constructor(private http: HttpClient) { }

    public getFridgeModelces(): Observable<Array<FridgeModel>> {
        const myHeaders = new HttpHeaders().set(HeadersEnum.Authorization, AuthActivateService.getSession()?.token ?? "");
        return this.http.get<Array<FridgeModel>>(this.url + '/' + 'GetAll', { headers: myHeaders });
    }

    public getFridgeModel(id: number): Observable<FridgeModel> {
        const myHeaders = new HttpHeaders()
            .set("Content-Type", "application/json")
            .set(HeadersEnum.Authorization, AuthActivateService.getSession()?.token ?? "");
        return this.http.get<FridgeModel>(this.url + '/' + "Get" + '/' + id, { headers: myHeaders });
    }
}