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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
const question_dto_1 = require("./question.dto");
const swagger_1 = require("@nestjs/swagger");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    async create(createQuestionDto, response) {
        try {
            const res = await this.questionService.create(createQuestionDto);
            return response.status(201).json(res);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(400).json({ message: error.message });
        }
    }
    async findAll(response) {
        try {
            const res = await this.questionService.findAll();
            return response.status(200).json(res);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(400).json({ message: error.message });
        }
    }
    async findOne(id, response) {
        try {
            const res = await this.questionService.findOne(id);
            return response.status(200).json(res);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(400).json({ message: error.message });
        }
    }
    async update(id, updateQuestionDto, response) {
        try {
            const res = await this.questionService.update(id, updateQuestionDto);
            return response.status(200).json(res);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(400).json({ message: error.message });
        }
    }
    async remove(id, response) {
        try {
            const result = await this.questionService.remove(id);
            return response.status(200).json(result);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(400).json({ message: error.message });
        }
    }
};
exports.QuestionController = QuestionController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new question' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Question created successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [question_dto_1.CreateQuestionDto, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all questions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved all questions.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found.' }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single question by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved the question.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a question by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Question updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question not found.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, question_dto_1.UpdateQuestionDto, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a question by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Question deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question not found.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "remove", null);
exports.QuestionController = QuestionController = __decorate([
    (0, swagger_1.ApiTags)('questions'),
    (0, common_1.Controller)('question'),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
//# sourceMappingURL=question.controller.js.map