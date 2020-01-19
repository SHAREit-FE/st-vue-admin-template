import { dataTime, duration, formatUTC, valueToLabel, changeJsonArr } from '@/filters/index.js'
describe('Filters', () => {
  it('dataTime', () => {
    expect(dataTime(1578996519505)).toBe('2020-01-14 18:08:39'); // yyyy-mm-dd hh:mm:ss
  })
  it('duration', () => {
    expect(duration(1578996519505)).toBe('10:08:39'); // hh:mm:ss
  })
  it('formatUTC', () => {
    expect(formatUTC(1578996519505)).toBe('2020-01-14 10:08:39'); // 北京时间早UTC时间 8h
  })
  it('valueToLabel', () => {
    const status = [{
      label: '无效',
      value: 0
    }, {
      label: '有效',
      value: 1
    }];
    expect(valueToLabel(0, status)).toBe('无效');
  })
  it('changeJsonArr', () => {
    expect(changeJsonArr('')).toBe(null);
    expect(changeJsonArr('["ss"]')).toBe('ss');
    expect(changeJsonArr('["ss","mm"]')).toBe('ss , mm');
  })
})
