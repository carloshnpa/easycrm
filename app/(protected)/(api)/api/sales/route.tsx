import {createClient} from "@/utils/supabase/server";
import {Tables} from "@/lib/database.types";

export async function GET(request: Request) {
    const supabase = createClient()
    const sales = await supabase.from('sales').select()
    if (sales.error) return Response.json({error: sales.error}, {status: 500});
    if (sales.data) {
        return Response.json({sales: sales.data as Tables<'sales'>[]})
    }
}
