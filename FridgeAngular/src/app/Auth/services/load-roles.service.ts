import { Injectable } from "@angular/core";
import { Roles } from "src/app/models/roles.enum";

@Injectable()
export class loadRolesService {
    public roles: string[] = [
        "Administrator",
        "User"
    ];

    public getRoles(): string[] {
        return this.roles;
    }

    public getRolesWithoutAdmin(): Array<string> {
        let array: Array<string> = [];
        this.roles.forEach(x => {
            if(x == Roles.Administrator)
                return;

            array.push(x)
        });

        return array;
    }
}