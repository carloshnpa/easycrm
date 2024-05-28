import {Database as DB} from "@/lib/database.types"

declare global {

    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_SUPABASE_URL: string
            NEXT_PUBLIC_SUPABASE_ANON_KEY: string
        }
    }

    type Database = DB
}
