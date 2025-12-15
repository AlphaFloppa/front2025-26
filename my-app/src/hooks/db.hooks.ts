import { tablesDB } from "../lib/appwrite";
import { ID, Query } from "appwrite";
import type { Presentation } from "../Store/Model/presentation";

const DATABASE_ID = "69406e3400342b3c267e"; 
const TABLE_ID = "presentation"; 

const useDB = () => { 
    const create = async (presentation: Presentation, userId: string) => {
        try {
            const { $id: id } = await tablesDB.createRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: ID.unique(),
                data: {
                    presentation: JSON.stringify(presentation),
                    presentationId: ID.unique(),
                    userId,
                    $createdAt: Date.now().toString(),
                    $updatedAt: Date.now().toString()
                }
            });
            return id;
        } catch (err) {
            console.log(err)
        }
    }

    const update = async (presentation: Presentation, id: string) => {
        await tablesDB.updateRow(
            {
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: id,
                data: {
                    presentation: JSON.stringify(presentation)
                }
            }
        )
    }

    const remove = async (id: string) => {
        try {
            await tablesDB.deleteRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: id
            });
        } catch (err) {
            console.log(err)
        }
    }

    const get = async (id: string) => {
        try {
            const { presentation: presentationJSON } = await tablesDB.getRow(
                {
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID,
                    rowId: id
                }
            );

            return JSON.parse(presentationJSON)
        } catch (err) {
            console.log(err)
        }
    }

    const getAll = async () => { 
        const response = await tablesDB.listRows(
            {
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                queries: [
                    Query.limit(5),
                    Query.offset(0)
                ],
                total: false
            }
        );

        return response.rows.map(
            record => ({ 
                id: record.$id,
                presentation: JSON.parse(record.presentation)
            })
        )
    }

    return {
        create,
        get,
        update,
        remove,
        getAll
    }
}

export {
    useDB
}