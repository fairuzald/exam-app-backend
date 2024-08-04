export declare class CreateQuestionOptionDto {
    alphabet: string;
    optionText?: string;
    points: number;
    questionId: string;
}
declare const UpdateQuestionOptionDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateQuestionOptionDto>>;
export declare class UpdateQuestionOptionDto extends UpdateQuestionOptionDto_base {
}
export {};
