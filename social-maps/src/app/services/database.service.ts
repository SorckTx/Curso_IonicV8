import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";
import { CapacitorSQLite } from "@capacitor-community/sqlite";
import DatabaseStructure from "./database-structure.json";
import { Preferences } from "@capacitor/preferences";

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    public dbReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public dbName: string | undefined;
    constructor() {
        this.setupDatabase();
    }

    private async setupDatabase() {
        this.dbName = environment.SQLite.DB_NAME;
        const currentDbVersion = await Preferences.get({ key: environment.SQLite.DB_VERSION_KEY });
        await CapacitorSQLite.createConnection({ database: this.dbName });
        if (!currentDbVersion.value) {
            const jsonstring = JSON.stringify(DatabaseStructure);
            const jsonValid = await CapacitorSQLite.isJsonValid({ jsonstring });
            if (jsonValid) {
                await CapacitorSQLite.importFromJson({ jsonstring });
                await Preferences.set({ key: environment.SQLite.DB_VERSION_KEY, value: DatabaseStructure.version.toString() });
                await CapacitorSQLite.open({ database: this.dbName });
            }
        } else {
            await CapacitorSQLite.open({ database: this.dbName });
        }
        this.dbReady.next(true);
    }

    public async ejecutar(consulta: string) {
        const respuesta = await CapacitorSQLite.query({ database: this.dbName, statement: consulta, values: [] });
        return respuesta.values;
    }

    public async insertar(estructura: string, values: any[]) {
        const respuesta = await CapacitorSQLite.query({
            database: this.dbName,
            statement: estructura,
            values,
        });
        return respuesta.values;
    }

    public async exportarDB() {
        return await CapacitorSQLite.exportToJson({
            jsonexportmode: 'full',
            database: this.dbName,
            encrypted: false,
        });
    }
}
