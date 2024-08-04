"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const user_module_1 = require("./user/user.module");
const email_module_1 = require("./user/email/email.module");
const url = require("url");
const question_option_module_1 = require("./question-option/question-option.module");
const question_module_1 = require("./question/question.module");
const quiz_module_1 = require("./quiz/quiz.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    const databaseUrl = configService.get('DATABASE_URL');
                    const parsedUrl = url.parse(databaseUrl);
                    const [username, password] = parsedUrl.auth.split(':');
                    return {
                        type: 'postgres',
                        host: parsedUrl.hostname,
                        port: +parsedUrl.port,
                        username,
                        password,
                        database: parsedUrl.pathname.substr(1),
                        entities: [(0, path_1.join)(__dirname, '**', '*.entity.{js,ts}')],
                        synchronize: true,
                        migrations: [(0, path_1.join)(__dirname, '**', '*.migration.{js,ts}')],
                        ssl: {
                            rejectUnauthorized: true,
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
            user_module_1.UserModule,
            email_module_1.EmailModule,
            question_option_module_1.QuestionOptionModule,
            question_module_1.QuestionModule,
            quiz_module_1.QuizModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map