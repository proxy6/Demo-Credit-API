export const KnexQueryBuilder =  (overload = {}) =>  ({
    select: jest.fn().mockReturnThis(),
	insert: jest.fn(),
	where: jest.fn().mockReturnThis(),
    first: jest.fn().mockReturnThis(),

    ...overload
});