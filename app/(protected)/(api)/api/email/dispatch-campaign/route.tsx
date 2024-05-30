import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    const req = await request.json()
    const {campaignId, emails, html, subject} = req
    try {

        await resend.emails.send({
            from: 'Campaign <contato@carlosabreu.com.br>',
            to: emails,
            subject: subject,
            html: html,
            tags: [
                {
                    name: 'campaignId',
                    value: campaignId,
                }
            ]
        });
        return Response.json("ok");
    } catch (e) {
        return Response.json({e}, {status: 500});
    }

}
