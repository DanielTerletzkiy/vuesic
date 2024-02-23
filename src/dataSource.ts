import {DataSource} from "typeorm";
//@ts-ignore
import initSqlJs from "sql.js";
import localforage from "localforage";
// @ts-ignore
import wasm from "sql.js/dist/sql-wasm.wasm?url";
import {SavedArtist} from "./entities/SavedArtist.entity";

export let AppDataSource: DataSource;
export async function initDB() {
    (window as any).localforage = localforage;

    const SQL = await initSqlJs({
        locateFile: () => wasm,
    });
    AppDataSource = new DataSource({
        type: "sqljs",
        driver: SQL,
        autoSave: true,
        entities: [SavedArtist],
        location: "vuesic_db",
        logging: ["query", "schema"],
        useLocalForage: true,
        synchronize: true,
    });
    try {
        await AppDataSource.initialize();
    } catch (e) {
        console.error(e);
    }
}
