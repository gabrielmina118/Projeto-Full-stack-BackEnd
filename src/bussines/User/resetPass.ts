import dotenv from 'dotenv'
import { Transporter } from '../../services/Transporter'

dotenv.config()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default async function sendEmailToNewPass(pass:string,email:string,name:string){

    const transporter = new Transporter();

    await transporter.transporter.sendMail({
        from: `<${process.env.NODEMAILER_USER}>`,
        to: email,
        subject: `Olá ${name} , Somos da INSTALAB e estamos enviando sua nova senha, como solicitado !`,
        text: `Esta é a sua nova senha : ${pass}. Use-a com cuidade`,
        html: `<p>Esta é a sua nova senha : <strong>${pass}</strong>. Use-a com cuidade .</p>`
    })

}