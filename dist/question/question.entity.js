"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const typeorm_1 = require("typeorm");
const question_option_entity_1 = require("../question-option/question-option.entity");
const quiz_entity_1 = require("../quiz/quiz.entity");
let Question = class Question {
};
exports.Question = Question;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Question.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Question.prototype, "questionText", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: [
            'multiple-choice',
            'true-false',
            'short-answer',
            'essay',
            'checkbox',
        ],
    }),
    __metadata("design:type", String)
], Question.prototype, "questionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Question.prototype, "maxPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "explanation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "correctAnswer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Question.prototype, "quizId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => question_option_entity_1.QuestionOption, (option) => option.question),
    __metadata("design:type", Array)
], Question.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_entity_1.Quiz, (quiz) => quiz.questions, {
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", quiz_entity_1.Quiz)
], Question.prototype, "quiz", void 0);
exports.Question = Question = __decorate([
    (0, typeorm_1.Entity)()
], Question);
//# sourceMappingURL=question.entity.js.map