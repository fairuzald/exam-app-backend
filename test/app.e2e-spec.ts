import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Quiz and Question Modules (e2e)', () => {
  let app: INestApplication;
  let quizId: string;
  let questionId: string;

  const testUserId = '48791516-4bb7-4791-89aa-2e92c3868d76'; // Constant for testing

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // Create, Read, Update, Delete (CRUD) operations for Quiz entities
  it('should create a new quiz', async () => {
    const createQuizDto = {
      title: 'Sample Quiz',
      description: 'This is a sample quiz',
      duration: 30,
      isPublished: true,
      difficulty: 'easy',
      instruction: 'Follow the instructions',
      isRandomized: false,
      createdById: testUserId,
    };

    const response = await request(app.getHttpServer())
      .post('/quiz')
      .send(createQuizDto)
      .expect(201);

    quizId = response.body.data.id;

    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.title).toBe(createQuizDto.title);
  });

  it('should get all quizzes', async () => {
    const response = await request(app.getHttpServer())
      .get('/quiz')
      .expect(200);

    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should get a single quiz by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/quiz/${quizId}`)
      .expect(200);

    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.id).toBe(quizId);
  });

  it('should update a quiz', async () => {
    const updateQuizDto = {
      title: 'Updated Quiz Title',
    };

    const response = await request(app.getHttpServer())
      .put(`/quiz/${quizId}`)
      .send(updateQuizDto)
      .expect(200);

    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.title).toBe(updateQuizDto.title);
  });

  // Create, Read, Update, Delete (CRUD) operations for Question and QuestionOption entities
  it('should create a question', async () => {
    const createQuestionDto = {
      questionText: 'What is the capital of Australia?',
      questionType: 'multiple-choice',
      maxPoints: 5,
      explanation: 'The capital of Australia is Canberra.',
      correctAnswer: 'Canberra',
      quizId,
    };

    const response = await request(app.getHttpServer())
      .post('/question')
      .send(createQuestionDto)
      .expect(201);

    questionId = response.body.data.id;

    expect(response.body.data).toHaveProperty('id');
  });

  it('should create a question option', async () => {
    const createQuestionOptionDto = {
      alphabet: 'A',
      optionText: 'Canberra',
      points: 5,
      questionId,
    };

    await request(app.getHttpServer())
      .post('/question-options')
      .send(createQuestionOptionDto)
      .expect(201);
  });

  it('should get all questions', async () => {
    const response = await request(app.getHttpServer())
      .get('/question')
      .expect(200);

    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('should get a single question by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/question/${questionId}`)
      .expect(200);

    expect(response.body.data).toHaveProperty('id', questionId);
  });

  it('should update a question', async () => {
    const updateQuestionDto = {
      questionText: 'What is the capital of Germany?',
      questionType: 'multiple-choice',
      maxPoints: 5,
      explanation: 'The capital of Germany is Berlin.',
      correctAnswer: 'Berlin',
    };

    const response = await request(app.getHttpServer())
      .put(`/question/${questionId}`)
      .send(updateQuestionDto)
      .expect(200);

    expect(response.body.data).toHaveProperty('id', questionId);
    expect(response.body.data.questionText).toBe(
      updateQuestionDto.questionText,
    );
  });

  it('should delete a question', async () => {
    await request(app.getHttpServer())
      .delete(`/question/${questionId}`)
      .expect(200);
  });

  // Abnormal test cases
  it('should create a question with invalid data', async () => {
    const invalidQuestionDto = {
      question: '',
      questionType: 'invalid-type',
      maxPoints: -1,
    };

    const response = await request(app.getHttpServer())
      .post('/question')
      .send(invalidQuestionDto)
      .expect(400);

    expect(response.body.message).toBeDefined();
  });

  it('should create a question option with invalid data', async () => {
    const invalidQuestionOptionDto = {
      alphabet: '123',
      optionText: '',
      points: -1,
      questionId: 'invalid-uuid',
    };

    const response = await request(app.getHttpServer())
      .post('/question-options')
      .send(invalidQuestionOptionDto)
      .expect(400);

    expect(response.body.message).toBeDefined();
  });

  it('should get a non-existent question id', async () => {
    await request(app.getHttpServer())
      .get('/question/52d8f614-0129-4c06-9e96-9099d80dc932')
      .expect(404);
  });

  it('should get an invalid UUID question id', async () => {
    await request(app.getHttpServer())
      .get('/question/invalid-uuid')
      .expect(400);
  });

  it('should get a non-existent question option id', async () => {
    await request(app.getHttpServer())
      .get('/question-options/52d8f614-0129-4c06-9e96-9099d80dc932')
      .expect(404);
  });

  it('should get an invalid UUID question option id', async () => {
    await request(app.getHttpServer())
      .get('/question-options/invalid-uuid')
      .expect(400);
  });

  it('should update a non-existent question id', async () => {
    const updateQuestionDto = {
      questionText: 'What is the capital of Germany?',
      questionType: 'multiple-choice',
      maxPoints: 5,
      explanation: 'The capital of Germany is Berlin.',
      correctAnswer: 'Berlin',
    };

    await request(app.getHttpServer())
      .put('/question/52d8f614-0129-4c06-9e96-9099d80dc932')
      .send(updateQuestionDto)
      .expect(404);
  });

  it('should update a non-existent question option id', async () => {
    const updateQuestionOptionDto = {
      alphabet: 'A',
      optionText: 'Berlin',
      points: 5,
      questionId,
    };

    await request(app.getHttpServer())
      .put('/question-options/52d8f614-0129-4c06-9e96-9099d80dc932')
      .send(updateQuestionOptionDto)
      .expect(404);
  });

  it('should delete a non-existent question id', async () => {
    await request(app.getHttpServer())
      .delete('/question/52d8f614-0129-4c06-9e96-9099d80dc932')
      .expect(404);
  });

  it('should delete an invalid UUID question id', async () => {
    await request(app.getHttpServer())
      .delete('/question/invalid-uuid')
      .expect(400);
  });

  it('should delete a non-existent question option id', async () => {
    await request(app.getHttpServer())
      .delete('/question-options/52d8f614-0129-4c06-9e96-9099d80dc932')
      .expect(404);
  });

  it('should delete an invalid UUID question option id', async () => {
    await request(app.getHttpServer())
      .delete('/question-options/invalid-uuid')
      .expect(400);
  });

  it('should delete a quiz', async () => {
    await request(app.getHttpServer()).delete(`/quiz/${quizId}`).expect(200);

    // Verify deletion
    await request(app.getHttpServer()).get(`/quiz/${quizId}`).expect(404);
  });
});
