import {Resend} from 'resend';
import EmailContactTemplate from "@/components/app/email/email-contact-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    const req = await request.json()
    console.log(req)
    const content = req.content
    const senderInfo = {
        name: req.sender.name,
        email: req.sender.email,
        avatarUrl: req.sender.avatarUrl,
        company: req.sender.company
    }
    try {
        // @ts-ignore
        const {data, error} = await resend.emails.send({
            from: `${senderInfo.name} <contato@carlosabreu.com.br>`,
            to: [req.email],
            subject: req.subject,
            html: EmailContactTemplate({
                companyName: senderInfo.company,
                content: content,
                avatarUrl: senderInfo.avatarUrl,
                fullName: senderInfo.name,
                senderEmail: senderInfo.email,
                currentDate: "",
            }),
        });

        if (error) {
            return Response.json({error}, {status: 500});
        }

        return Response.json(data);
    } catch (error) {
        console.error(error)
        return Response.json({error}, {status: 500});
    }
}
