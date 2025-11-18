import { Injectable } from "@angular/core";
import { DatabaseService } from "./database.service";
import { environment } from "../../environments/environment";

const TTL = 60 * 90;
@Injectable({
    providedIn: 'root'
})
export class CachingService {
    private tableName: string = environment.SQLite.CACHE_TABLE_NAME;
    constructor(private dbService: DatabaseService) {
    }

    public async cacheRequest(url: string, verbo: string, data: any) {
        const validoHasta = (new Date().getTime()) + TTL * 1000;
        return this.dbService.insertar(
            `INSERT INTO ${this.tableName}(url, verbo, data, expires_in) VALUES(?, ?, ?, ?)`,
            [url, verbo, JSON.stringify(data), validoHasta]
        );
    }

    public async getCachedRequest(url: string, verbo: string) {
        const currentTime = new Date().getTime();

        const storedValues = await this.dbService.ejecutar(`SELECT * FROM ${this.tableName} WHERE expires_in >= ${currentTime} AND verbo = '${verbo}' AND url = '${url}' ORDER BY expires_in DESC`);
        if (!storedValues || storedValues.length === 0) {
            return null;
        } else {
            return JSON.parse(storedValues[0].data);
        }
    }

    public async limpiarCache() {
        await this.dbService.ejecutar(`DELETE FROM ${this.tableName}`);
    }

    private async cleanExpired(expiredValues: string[]) {
        await this.dbService.ejecutar(
            `DELETE FROM ${this.tableName} WHERE id IN(${expiredValues.join(',')})`
            // DELETE FROM http_cache_requests WHERE id IN(1,2,3)
        )
    }
}
