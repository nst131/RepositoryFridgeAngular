import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthActivateService } from "src/app/Auth/services/auth-activate.service";
import { HeadersEnum } from "src/app/models/headers.enum";
import { AddProductIntoFridge } from "../models/add-product-into-fridge.model";
import { GetAllProductIntoFridge } from "../models/get-all-product-into-fridge.model";
import { GetProductIntoFridge } from "../models/get-product-into-fridge.model";
import { UpdateProductIntoFridge } from "../models/update-product-into-fridge.model";

@Injectable()
export class ProductsIntoFridgeService {
    private url = "https://localhost:5001/api/Product";

    constructor(private http: HttpClient) { }

    public getAllProductsIntoFridge(fridgeId: number): Observable<Array<GetAllProductIntoFridge>> {
        const myHeaders = new HttpHeaders()
        .set(HeadersEnum.Authorization, AuthActivateService.getSession()?.token ?? "");
        return this.http.get<Array<GetAllProductIntoFridge>>(this.url + '/' + 'GetAllProductsIntoFridge' + '/' + fridgeId, { headers: myHeaders });
    }

    public getProductIntoFridge(id: number): Observable<GetProductIntoFridge> {
        const myHeaders = new HttpHeaders()
            .set("Content-Type", "application/json")
            .set(HeadersEnum.Authorization, AuthActivateService.getSession()?.token ?? "");
        return this.http.get<GetProductIntoFridge>(this.url + '/' + "GetProductIntoFridge" + '/' + id, { headers: myHeaders });
    }

    public updateProductIntoFridge(model: UpdateProductIntoFridge): Observable<any> {
        const myHeaders = new HttpHeaders()
            .set("Content-Type", "application/json")
            .set(HeadersEnum.Authorization, AuthActivateService.getSession()?.token ?? "");
        const body = JSON.stringify(model);
        return this.http.put<any>(this.url + '/' + 'UpdateProductIntoFridgeById', body, { headers: myHeaders });
    }

    public AddProductIntoFridge(model: AddProductIntoFridge): Observable<any> {
        const myHeaders = new HttpHeaders()
            .set("Content-Type", "application/json")
            .set(HeadersEnum.Authorization, AuthActivateService.getSession()?.token ?? "");
        const body = JSON.stringify(model);
        return this.http.post<any>(this.url + '/' + 'AddProductIntoFridge', body, { headers: myHeaders });
    }

    public deleteProductIntoFridge(id: number): Observable<any> {
        const myHeaders = new HttpHeaders()
            .set("Content-Type", "application/json")
            .set(HeadersEnum.Authorization, AuthActivateService.getSession()?.token ?? "");
        return this.http.delete<any>(this.url + '/' + 'DeleteProductIntoFridgeById' + '/' + id, { headers: myHeaders });
    }
}