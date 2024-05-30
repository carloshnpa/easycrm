import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function POST(request: Request) {
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
    } catch (e) {
        console.error(e)
    }

}
