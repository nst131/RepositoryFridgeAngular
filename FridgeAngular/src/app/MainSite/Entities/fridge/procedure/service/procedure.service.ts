import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthActivateService } from "src/app/Auth/services/auth-activate.service";
import { HeadersEnum } from "src/app/models/headers.enum";
import { ProductIntoFridgeWhereQuantityZero } from "../models/ProductIntoFridgeWhereQuantityZero.model";

@Injectable()
export class ProcedureService {
    private url = "https://localhost:5001/api/Product";

    constructor(private http: HttpClient) { }

    public SearchProductsInFridgeWhereZero(): Observable<ProductIntoFridgeWhereQuantityZero> {
        const myHeaders = new HttpHeaders()
        .set(HeadersEnum.Authorization, AuthActivateService.getSession()?.token ?? "");
        return this.http.get<ProductIntoFridgeWhereQuantityZero>(this.url + '/' + 'SearchProductsInFridgeWhereZero', { headers: myHeaders });
    }
}