import {createClient} from "@/utils/supabase/server";

export default async function GET() {
    const supabase = createClient()
    const sales = supabase
        .from('sales')
        .select('*, clients(*), products(*)')
        .order('created_at', {
            ascending: false
        }).limit(3)


}
