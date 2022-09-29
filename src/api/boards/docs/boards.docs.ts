export class BoardsAPIDocs {
  static createBoardOperation() {
    return { summary: '게시글 생성' };
  }

  static UnauthorizedResponse() {
    return {
      description: 'Error: Unauthorized',
      schema: {
        example: {
          success: false,
          timestamp: '2022-09-29T04:29:36.880Z',
          message: '유효하지 않은 토큰',
          data: {},
        },
      },
    };
  }

  static createBoardCreatedResponse() {
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

  static updateBoardOperation() {
    return { summary: 'Board Update', description: '게시글 수정' };
  }
}
