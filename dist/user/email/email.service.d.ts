import { MailerService } from '@nestjs-modules/mailer';
type mailOptions = {
    subject: string;
    email: string;
    name: string;
    activationCode: string;
    template: string;
};
export declare class EmailService {
    private mailService;
    constructor(mailService: MailerService);
    sendMail({ subject, email, name, activationCode, template, }: mailOptions): Promise<void>;
}
export {};
