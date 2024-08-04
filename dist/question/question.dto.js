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
exports.UpdateQuestionDto = exports.CreateQuestionDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
class CreateQuestionDto {
}
exports.CreateQuestionDto = CreateQuestionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The text of the question',
        example: 'What is the capital of France?',
    }),
    (0, class_validator_1.IsString)({ message: 'Question must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Question is required' }),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "questionText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The type of the question',
        enum: [
            'multiple-choice',
            'true-false',
            'short-answer',
            'essay',
            'checkbox',
        ],
    }),
    (0, class_validator_1.IsEnum)(['multiple-choice', 'true-false', 'short-answer', 'essay', 'checkbox'], { message: 'Invalid question type' }),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "questionType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The maximum points that can be awarded for this question',
        example: 10,
    }),
    (0, class_validator_1.IsInt)({ message: 'Max points must be an integer' }),
    (0, class_validator_1.Min)(0, { message: 'Max points must be greater than or equal to 0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateQuestionDto.prototype, "maxPoints", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Explanation of the correct answer',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Explanation must be a string' }),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "explanation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The correct answer to the question',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Correct answer must be a string' }),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "correctAnswer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the quiz that this question belongs to',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Quiz ID is required' }),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "quizId", void 0);
class UpdateQuestionDto extends (0, mapped_types_1.PartialType)(CreateQuestionDto) {
}
exports.UpdateQuestionDto = UpdateQuestionDto;
//# sourceMappingURL=question.dto.js.map