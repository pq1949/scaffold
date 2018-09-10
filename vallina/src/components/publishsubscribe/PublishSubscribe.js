export default class PublishSubscribe {
  // 发布消息
  static publish (topic, args) {
    if (!PublishSubscribe.topics[topic]) {
      return
    }
    let subs = PublishSubscribe.topics[topic]
    for (let i = 0, iLen = subs.length; i < iLen; i++) {
      subs[i].func(topic, args)
    }
  }

  static subscribe (topic, func) {
    PublishSubscribe.topics[topic] = PublishSubscribe.topics[topic] ? PublishSubscribe.topics[topic] : []
    let token = (++PublishSubscribe.topicIndex).toString()
    PublishSubscribe.topics[topic].push({
      token: token,
      func: func
    })
    return token
  }

  static reset () {
    PublishSubscribe.queues = {}
    PublishSubscribe.topics = {}
    PublishSubscribe.topicIndex = -1
  }
}

PublishSubscribe.queues = {}
PublishSubscribe.topics = {}
PublishSubscribe.topicIndex = -1

// 添加新任务事件
PublishSubscribe.OnNewTodoEvent = Symbol.for('On New Todo Event')
