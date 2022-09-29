export class UserAPIDocs {
  static signUpOperation() {
    return {
      summary: '회원가입 API',
      description: 'hashLuv서비스에 회원가입을 합니다.',
    };
  }

  static signUpCreatedResponse() {
    return {
      description: '계정 생성 완료',
      schema: {
        example: {
          success: true,
          timestamp: '2022-09-05T02:15:34.587Z',
          message: 'Created',
        },
      },
    };
  }

  static signUpConflictResponse() {
    return {
      description: '이미 가입한 이메일',
      schema: {
        example: {
          success: false,
          timestamp: '2022-09-29T03:20:32.506Z',
          message: 'Conflict',
          data: '이미 가입한 이메일입니다. 다른 계정으로 회원가입 해주세요.',
        },
      },
    };
  }

  static loginOperation() {
    return {
      summary: '로그인 API',
      description: 'hashLuv서비스에 로그인을 합니다.',
    };
  }

  static loginUnauthorizedResponse() {
    return {
      description: '이메일 또는 비밀번호 가 틀린 경우.',
      status: 401,
      schema: {
        example: {
          success: false,
          timestamp: '2022-09-05T02:33:46.590Z',
          message: 'Unauthorized',
          data: '비밀번호가 틀립니다.',
        },
      },
    };
  }

  static loginResponse() {
    return {
      description: '로그인 성공 응답값입니다.',
      status: 200,
      schema: {
        example: {
          success: true,
          timestamp: '2022-09-05T02:34:13.081Z',
          message: 'OK',
          data: {
            access_token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuyepeyEseyasCIsInN1YiI6MSwiaWF0IjoxNjY0NDIxNzAwLCJleHAiOjE2NjQ1MDYzMDB9.VGRmd2K3A_MbU5efsGFW4NpOsgSKLL80MevjBCk4pRE',
          },
        },
      },
    };
  }
}
