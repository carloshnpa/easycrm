import {createClient} from "@/utils/supabase/server";

export async function POST(request: Request) {
    const req = await request.json()
    // const nome = String(req.nome)
    // const capacidade = String(req.capacidade)
    // const idGerador = String(req.id_gerador)
    // const idDistribuidora = String(req.id_distribuidora)
    // const idFonteGeracao = req.id_fonte_geracao

    const supabase = createClient()

    // const plant = {
    //     nome,
    //     capacidade,
    //     id_gerador: idGerador,
    //     id_distribuidora: idDistribuidora,
    //     id_fonte_geracao: idFonteGeracao,
    // }
    //
    // const {data, error} = await supabase.from('usina').insert([plant]).select()
    //
    // if (error) {
    //     return NextResponse.json(
    //         {message: error},
    //         {status: 401, statusText: error?.message},
    //     )
    // }
    //
    // return NextResponse.json(
    //     {data, message: 'Projeto/Usina cadastrado com sucesso.'},
    //     {status: 200},
    // )
}
