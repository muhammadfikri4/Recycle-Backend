import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

describe('RegisterController', () => {
  let controller: RegisterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [RegisterService],
    }).compile();

    controller = app.get<RegisterController>(RegisterController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(controller.authRegist).toBe("");
    });
  });
});
