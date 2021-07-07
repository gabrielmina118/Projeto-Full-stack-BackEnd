import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

export class Transporter {
    public transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        ignoreTLS: false,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        },
        tls: { ciphers: "SSLv3" }
    })
}
/*
import { Request, Response } from "express";
import dotenv from 'dotenv'
import connection from "../connection";
import { hash } from "../services/hashManager";
import { transporter } from "../services/Transporter";

dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

export default async function PassReset(
    req: Request, res: Response
): Promise<void> {
    try {
        const email = req.body.email as string;

        const [user] = await connection("usuariosistema").where({ email });

        if (!user) {
            res.statusCode = 400;
            throw new Error("Email não cadastrado!!")
        }


        const characters = "abcdefABCDEF12345!?/[]{}"
        let newPass = "";
        for (let i = 0; i < 5; i++) {
            const index = Math.floor(Math.random() * (characters.length - 1))
            newPass += characters[index]
        }

        const newHash = await hash(newPass);


        await connection("usuariosistema")
            .update({ pass: newHash })
            .where({ email })

        const info = await transporter.sendMail({
            from: `<${process.env.NODEMAILER_USER}>`,
            to: email,
            subject: "Estamos retornando sua nova senha",
            text: `Sua nova senha é ${newPass}`,
            html: `<p>Esta funcionando essa bagaça . Ass: Gabriel Mina Silva</p>`
        })
        console.log({
            newPass,
            newHash,
            info
        });

        res.send("Enviado com sucesso")

    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}
*/