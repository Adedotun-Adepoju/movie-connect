import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
const path = require('path');
const handlebars = require('express-handlebars');
const hbs = require('nodemailer-express-handlebars');

const viewPath = path.join(__dirname, './views/templates/');
const layoutPath = path.resolve(__dirname, './views/layouts/main');
const partialsPath = path.resolve(__dirname, './views/partials');
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MailService {
  constructor(){
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // your Gmail email address
        pass: process.env.EMAIL_PASSWORD, // your Gmail email password or App Password
      },
      authMethod: 'PLAIN'
    })

    const viewEngine = handlebars.create({
      partialsDir: [partialsPath],
      extname: '.hbs',
      defaultLayout: layoutPath,
    });

    const hbsOptions = {
        viewEngine,
        viewPath,
        extName: '.hbs',
    };

    this.transporter.use('compile', hbs(hbsOptions));
  }

  private transporter: nodemailer.Transporter;

  async sendMail(payload) {
    const { recipient, subject, template, data } = payload;
    const mailOptions = {
        from: `noreply@${process.env.EMAIL_DOMAIN}`,
        to: recipient,
        subject: subject,
        template: template,
        context: data,
        year: new Date().getFullYear()
    };

    const send = await this.transporter.sendMail(mailOptions);
  }
}
