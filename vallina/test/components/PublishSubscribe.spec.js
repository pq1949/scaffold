import PublishSubscribe from '../../src/components/publishsubscribe/PublishSubscribe'

describe('PublishSubscribe', () => {
  it('should be defined', () => {
    expect(PublishSubscribe).toBeDefined()
  })

  it('shold be publish success', () => {
    PublishSubscribe.subscribe('test', (topic, args) => {
      expect(args.a).toEqual(1)
    })
    PublishSubscribe.publish('test', {a: 1})
    expect(PublishSubscribe.topics['test']).toBeDefined()
  })

  it('shold not be test1', () => {
    PublishSubscribe.subscribe('test1', () => {
    })
    PublishSubscribe.publish('test1', {a: 1})
    expect(PublishSubscribe.topics['test11']).toBeUndefined()
  })

  it('shold be publish success', () => {
    expect(1).toEqual(PublishSubscribe.topicIndex)
  })
})
