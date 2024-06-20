import {formatMessageTime} from '../formatMessageTime';
import * as dateFns from 'date-fns';
jest.mock('date-fns', () => ({
  ...jest.requireActual('date-fns'),
  isToday: jest.fn(),
}));
describe('formatMessageTime', () => {

  it('returns only time, when it is today', () => {
    (dateFns.isToday as jest.Mock).mockReturnValue(true);
    const result = formatMessageTime('2024-05-12T11:59:00.000Z');
    expect(result).toEqual('12:59');
  });

  it('returns date and time, when the time was in the past', () => {
    (dateFns.isToday as jest.Mock).mockReturnValue(false);
    const result = formatMessageTime('2015-02-02T00:00:00.000Z');
    expect(result).toEqual('02 February 2015, 00:00');
  });
});
